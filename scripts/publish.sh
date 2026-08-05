#!/usr/bin/env bash
# ============================================================
#  publish.sh — Publish @celestia-project packages to npm
# ============================================================
set -euo pipefail

# ── colours ─────────────────────────────────────────────────
BOLD=$(tput bold 2>/dev/null || echo "")
RED=$(tput setaf 1 2>/dev/null || echo "")
GREEN=$(tput setaf 2 2>/dev/null || echo "")
YELLOW=$(tput setaf 3 2>/dev/null || echo "")
CYAN=$(tput setaf 6 2>/dev/null || echo "")
RESET=$(tput sgr0 2>/dev/null || echo "")

info()    { echo "${CYAN}${BOLD}[INFO]${RESET}  $*"; }
success() { echo "${GREEN}${BOLD}[OK]${RESET}    $*"; }
warn()    { echo "${YELLOW}${BOLD}[WARN]${RESET}  $*"; }
error()   { echo "${RED}${BOLD}[ERROR]${RESET} $*" >&2; exit 1; }

# ── packages to publish ─────────────────────────────────────
PACKAGES=(
  "packages/ui"       # @celestia-project/ui
  "packages/cli"      # @celestia-project/create
)

# ── 1. check npm auth ────────────────────────────────────────
info "Checking npm authentication..."
NPM_USER=$(npm whoami --registry https://registry.npmjs.org 2>/dev/null || true)
if [[ -z "$NPM_USER" ]]; then
  error "Not logged in to npm. Run: npm login --registry https://registry.npmjs.org"
fi
success "Logged in as: ${BOLD}$NPM_USER${RESET}"

# ── 2. check org membership ─────────────────────────────────
info "Verifying access to @celestia-project org..."
ORG_MEMBERS=$(npm org ls celestia-project 2>/dev/null || true)
if [[ -z "$ORG_MEMBERS" ]]; then
  warn "Could not verify org membership (you may still have access). Continuing..."
else
  success "Org membership confirmed."
fi

# ── 3. ensure git is clean ───────────────────────────────────
if [[ "${SKIP_GIT_CHECK:-}" != "1" ]]; then
  if ! git diff --quiet || ! git diff --cached --quiet; then
    error "Working tree is dirty. Commit or stash your changes before publishing."
  fi
  success "Git working tree is clean."
fi

# ── 4. optional dry-run flag ─────────────────────────────────
DRY_RUN=""
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN="--dry-run"
  warn "DRY RUN — nothing will actually be published."
fi

# ── 5. install & build all packages ─────────────────────────
info "Installing dependencies..."
pnpm install --frozen-lockfile

info "Building packages..."
pnpm --filter '@celestia-project/ui' build

# ── 6. publish each package ──────────────────────────────────
echo ""
for PKG_DIR in "${PACKAGES[@]}"; do
  PKG_NAME=$(node -p "require('./${PKG_DIR}/package.json').name")
  PKG_VER=$(node -p "require('./${PKG_DIR}/package.json').version")

  echo "${BOLD}─────────────────────────────────────────${RESET}"
  info "Publishing ${CYAN}${PKG_NAME}${RESET} @ ${PKG_VER}"

  # Check if this exact version is already published
  PUBLISHED_VER=$(npm view "${PKG_NAME}@${PKG_VER}" version --registry https://registry.npmjs.org 2>/dev/null || true)
  if [[ "$PUBLISHED_VER" == "$PKG_VER" ]]; then
    warn "${PKG_NAME}@${PKG_VER} is already published — skipping."
    continue
  fi

  pnpm publish \
    --filter "${PKG_NAME}" \
    --access public \
    --no-git-checks \
    $DRY_RUN

  success "Published ${PKG_NAME}@${PKG_VER}"
done

echo ""
echo "${BOLD}─────────────────────────────────────────${RESET}"
if [[ -n "$DRY_RUN" ]]; then
  warn "Dry run complete. Run without --dry-run to actually publish."
else
  success "All packages published! 🎉"
  echo ""
  echo "  ${CYAN}@celestia-project/ui${RESET}     → https://www.npmjs.com/package/@celestia-project/ui"
  echo "  ${CYAN}@celestia-project/create${RESET} → https://www.npmjs.com/package/@celestia-project/create"
fi
