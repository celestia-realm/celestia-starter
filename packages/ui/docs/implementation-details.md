# Implementation Details & Import Reference

This document provides technical implementation details for `@celestia-project/ui`, including import conventions, component module mappings, sub-component exports, underlying primitives, and prop APIs.

---

## Import Conventions

The `@celestia-project/ui` library supports both **barrel imports** and **deep imports**.

### 1. Styles & CSS Variables

Import the global stylesheet once in your top-level application file (`app/layout.tsx` or `pages/_app.tsx`):

```tsx
import "@celestia-project/ui/globals.css"
```

This stylesheet injects Tailwind CSS v4, `tw-animate-css`, shadcn base styles, and oklch theme variables (light + dark mode).

### 2. Barrel Imports (Recommended for Most Apps)

Barrel imports pull directly from `@celestia-project/ui`. All components are tree-shakeable in modern bundlers (Next.js, Vite).

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  cn
} from "@celestia-project/ui"
```

> **Note on Toast Collisions:** Both Base UI Toast and Sonner provide toaster components. In the root barrel export:
> - Base UI `Toast` / `Toaster` is exported as `Toast` / `Toaster`.
> - Sonner `Toaster` is exported as `SonnerToaster`.

### 3. Deep Imports

For strict bundle-size optimizations or non-bundler environments, import directly from the component module paths:

```tsx
import { Button } from "@celestia-project/ui/components/button"
import { Card, CardHeader, CardTitle, CardContent } from "@celestia-project/ui/components/card"
import { Dialog, DialogContent, DialogTrigger } from "@celestia-project/ui/components/dialog"
import { useIsMobile } from "@celestia-project/ui/hooks/use-mobile"
import { cn } from "@celestia-project/ui/lib/utils"
```

### 4. Utilities & Hooks

| Export Name | Import Specifier | Description |
|-------------|------------------|-------------|
| `cn` | `@celestia-project/ui/lib/utils` or barrel | `clsx` + `tailwind-merge` class name helper |
| `useIsMobile` | `@celestia-project/ui/hooks/use-mobile` or barrel | Custom React hook returning boolean for `< 768px` viewport |
| `SonnerToaster` | `@celestia-project/ui` (barrel) | Re-exported Sonner `Toaster` |
| `toast` | `@celestia-project/ui/components/sonner` | Sonner toast trigger function |

---

## Complete Component Mapping Reference

Below is the complete mapping of all 63 component modules in `packages/ui/src/components/`, listing their deep import specifiers, exported sub-components, and underlying base primitives.

### Layout & Structure

| Module | Deep Import | Exported Sub-Components | Base Primitive |
|--------|-------------|-------------------------|----------------|
| `aspect-ratio` | `@celestia-project/ui/components/aspect-ratio` | `AspectRatio` | Radix AspectRatio |
| `card` | `@celestia-project/ui/components/card` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` | Custom HTML |
| `resizable` | `@celestia-project/ui/components/resizable` | `Resizable`, `ResizablePanel`, `ResizablePanelGroup`, `ResizableHandle` | `react-resizable-panels` |
| `separator` | `@celestia-project/ui/components/separator` | `Separator` | Base UI `Separator` |
| `sidebar` | `@celestia-project/ui/components/sidebar` | `SidebarProvider`, `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarGroupContent`, `SidebarFooter`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuAction`, `SidebarMenuSub`, `SidebarMenuSubItem`, `SidebarMenuSubButton`, `SidebarMenuBadge`, `SidebarMenuSkeleton`, `SidebarRail`, `SidebarTrigger`, `SidebarInset`, `SidebarInput`, `useSidebar` | Custom + Base UI Tooltip & Sheet |

---

### Typography & Display

| Module | Deep Import | Exported Sub-Components | Base Primitive |
|--------|-------------|-------------------------|----------------|
| `alert` | `@celestia-project/ui/components/alert` | `Alert`, `AlertTitle`, `AlertDescription` | Custom HTML |
| `badge` | `@celestia-project/ui/components/badge` | `Badge`, `badgeVariants` | Custom HTML / CVA |
| `breadcrumb` | `@celestia-project/ui/components/breadcrumb` | `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis` | Custom HTML |
| `empty` | `@celestia-project/ui/components/empty` | `Empty`, `EmptyHeader`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`, `EmptyActions`, `EmptyMedia` | Custom HTML |
| `item` | `@celestia-project/ui/components/item` | `Item`, `ItemGroup`, `ItemHeader`, `ItemFooter`, `ItemTitle`, `ItemDescription`, `ItemMedia`, `ItemActions`, `ItemContent` | Base UI `useRender` |
| `kbd` | `@celestia-project/ui/components/kbd` | `Kbd` | Custom HTML |
| `marker` | `@celestia-project/ui/components/marker` | `Marker` | Custom HTML |
| `message` | `@celestia-project/ui/components/message` | `Message`, `MessageBubble` | Custom HTML |
| `skeleton` | `@celestia-project/ui/components/skeleton` | `Skeleton` | Custom HTML |
| `table` | `@celestia-project/ui/components/table` | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` | Custom HTML |

---

### Forms & Inputs

| Module | Deep Import | Exported Sub-Components | Base Primitive |
|--------|-------------|-------------------------|----------------|
| `button` | `@celestia-project/ui/components/button` | `Button`, `buttonVariants` | Base UI `useRender` |
| `button-group` | `@celestia-project/ui/components/button-group` | `ButtonGroup`, `ButtonGroupText` | Custom HTML |
| `checkbox` | `@celestia-project/ui/components/checkbox` | `Checkbox` | Base UI `Checkbox` |
| `combobox` | `@celestia-project/ui/components/combobox` | `Combobox`, `ComboboxInput`, `ComboboxContent`, `ComboboxList`, `ComboboxItem`, `ComboboxEmpty`, `ComboboxGroup`, `ComboboxLabel` | Base UI `Combobox` |
| `field` | `@celestia-project/ui/components/field` | `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldLegend`, `FieldSeparator` | Base UI `Field` |
| `input` | `@celestia-project/ui/components/input` | `Input` | Custom HTML |
| `input-group` | `@celestia-project/ui/components/input-group` | `InputGroup`, `InputGroupAddon`, `InputGroupInput` | Custom HTML |
| `input-otp` | `@celestia-project/ui/components/input-otp` | `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator` | `input-otp` |
| `label` | `@celestia-project/ui/components/label` | `Label` | Custom HTML |
| `native-select` | `@celestia-project/ui/components/native-select` | `NativeSelect`, `NativeSelectOptGroup`, `NativeSelectOption` | Custom HTML |
| `radio-group` | `@celestia-project/ui/components/radio-group` | `RadioGroup`, `RadioGroupItem` | Base UI `RadioGroup` |
| `select` | `@celestia-project/ui/components/select` | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator` | Base UI `Select` |
| `slider` | `@celestia-project/ui/components/slider` | `Slider` | Base UI `Slider` |
| `switch` | `@celestia-project/ui/components/switch` | `Switch` | Base UI `Switch` |
| `textarea` | `@celestia-project/ui/components/textarea` | `Textarea` | Custom HTML |
| `toggle` | `@celestia-project/ui/components/toggle` | `Toggle`, `toggleVariants` | Base UI `Toggle` |
| `toggle-group` | `@celestia-project/ui/components/toggle-group` | `ToggleGroup`, `ToggleGroupItem` | Base UI `ToggleGroup` |

---

### Overlays & Popups

| Module | Deep Import | Exported Sub-Components | Base Primitive |
|--------|-------------|-------------------------|----------------|
| `alert-dialog` | `@celestia-project/ui/components/alert-dialog` | `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`, `AlertDialogClose` | Base UI `AlertDialog` |
| `context-menu` | `@celestia-project/ui/components/context-menu` | `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuSub`, `ContextMenuSubTrigger`, `ContextMenuSubContent` | Base UI `ContextMenu` |
| `dialog` | `@celestia-project/ui/components/dialog` | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose` | Base UI `Dialog` |
| `drawer` | `@celestia-project/ui/components/drawer` | `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`, `DrawerClose` | `vaul` / Base UI |
| `dropdown-menu` | `@celestia-project/ui/components/dropdown-menu` | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent` | Base UI `DropdownMenu` |
| `hover-card` | `@celestia-project/ui/components/hover-card` | `HoverCard`, `HoverCardTrigger`, `HoverCardContent` | Base UI `HoverCard` |
| `popover` | `@celestia-project/ui/components/popover` | `Popover`, `PopoverTrigger`, `PopoverContent` | Base UI `Popover` |
| `sheet` | `@celestia-project/ui/components/sheet` | `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`, `SheetClose` | Base UI `Dialog` |
| `tooltip` | `@celestia-project/ui/components/tooltip` | `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent` | Base UI `Tooltip` |

---

### Navigation

| Module | Deep Import | Exported Sub-Components | Base Primitive |
|--------|-------------|-------------------------|----------------|
| `menu` | `@celestia-project/ui/components/menu` | `Menu`, `MenuTrigger`, `MenuContent`, `MenuItem`, `MenuGroup`, `MenuSeparator`, `MenuCheckboxItem`, `MenuRadioItem` | Base UI `Menu` |
| `menubar` | `@celestia-project/ui/components/menubar` | `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`, `MenubarSeparator`, `MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent` | Base UI `Menubar` |
| `navigation-menu` | `@celestia-project/ui/components/navigation-menu` | `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink` | Radix NavigationMenu |
| `pagination` | `@celestia-project/ui/components/pagination` | `Pagination`, `PaginationContent`, `PaginationLink`, `PaginationItem`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis` | Custom HTML |
| `tabs` | `@celestia-project/ui/components/tabs` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | Base UI `Tabs` |

---

### Data, Media & AI Primitives

| Module | Deep Import | Exported Sub-Components | Base Primitive |
|--------|-------------|-------------------------|----------------|
| `attachment` | `@celestia-project/ui/components/attachment` | `Attachment`, `AttachmentGroup`, `AttachmentMedia`, `AttachmentContent`, `AttachmentTitle`, `AttachmentDescription`, `AttachmentActions`, `AttachmentAction`, `AttachmentTrigger` | Custom HTML |
| `avatar` | `@celestia-project/ui/components/avatar` | `Avatar`, `AvatarImage`, `AvatarFallback` | Base UI `Avatar` |
| `bubble` | `@celestia-project/ui/components/bubble` | `Bubble` | Custom HTML |
| `calendar` | `@celestia-project/ui/components/calendar` | `Calendar` | `react-day-picker` |
| `carousel` | `@celestia-project/ui/components/carousel` | `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` | `embla-carousel-react` |
| `chart` | `@celestia-project/ui/components/chart` | `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `ChartStyle` | Recharts wrapper |
| `message-scroller` | `@celestia-project/ui/components/message-scroller` | `MessageScroller` | Custom scroll engine |
| `progress` | `@celestia-project/ui/components/progress` | `Progress` | Base UI `Progress` |
| `scroll-area` | `@celestia-project/ui/components/scroll-area` | `ScrollArea`, `ScrollBar` | Radix ScrollArea |

---

### Feedback & Utilities

| Module | Deep Import | Exported Sub-Components | Base Primitive |
|--------|-------------|-------------------------|----------------|
| `accordion` | `@celestia-project/ui/components/accordion` | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | Base UI `Accordion` |
| `collapsible` | `@celestia-project/ui/components/collapsible` | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` | Base UI `Collapsible` |
| `command` | `@celestia-project/ui/components/command` | `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator` | `cmdk` |
| `direction` | `@celestia-project/ui/components/direction` | `DirectionProvider`, `useDirection` | Radix Direction |
| `sonner` | `@celestia-project/ui/components/sonner` | `Toaster`, `toast` | `sonner` |
| `spinner` | `@celestia-project/ui/components/spinner` | `Spinner` | Phosphor Icon |
| `toast` | `@celestia-project/ui/components/toast` | `ToastProvider`, `ToastPortal`, `ToastViewport`, `Toast`, `ToastContent`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`, `toast` | Base UI `Toast` |

---

## Key Component Props Reference

### 1. Button (`button.tsx`)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "outline" \| "ghost" \| "destructive" \| "link"` | `"default"` | Visual style variant |
| `size` | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` | `"default"` | Sizing option |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | `undefined` | Base UI polymorphic render prop |
| `className` | `string` | `undefined` | Custom CSS class overrides |

### 2. Card (`card.tsx`)

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `Card` | `size?: "default" \| "sm"` | Card container with border, radius, and shadow |
| `CardHeader` | `className?: string` | Header wrapper for title and description |
| `CardTitle` | `className?: string` | Card title heading |
| `CardDescription` | `className?: string` | Subtitle / description copy |
| `CardContent` | `className?: string` | Card body container |
| `CardFooter` | `className?: string` | Bottom action bar |

### 3. Sidebar (`sidebar.tsx`)

| Component | Prop | Type | Default | Description |
|-----------|------|------|---------|-------------|
| `SidebarProvider` | `defaultOpen` | `boolean` | `true` | Initial state of sidebar |
| `SidebarProvider` | `open` | `boolean` | `undefined` | Controlled state |
| `SidebarProvider` | `onOpenChange` | `(open: boolean) => void` | `undefined` | Toggle handler |
| `Sidebar` | `side` | `"left" \| "right"` | `"left"` | Dock side |
| `Sidebar` | `variant` | `"sidebar" \| "floating" \| "inset"` | `"sidebar"` | Layout style |
| `Sidebar` | `collapsible` | `"offcanvas" \| "icon" \| "none"` | `"offcanvas"` | Collapse strategy |
| `SidebarMenuButton` | `isActive` | `boolean` | `false` | Highlights active menu item |
| `SidebarMenuButton` | `tooltip` | `string \| TooltipContentProps` | `undefined` | Auto-tooltip on collapse |

### 4. Dialog & Sheet (`dialog.tsx`, `sheet.tsx`)

| Component | Prop | Type | Default | Description |
|-----------|------|------|---------|-------------|
| `Dialog` / `Sheet` | `open` | `boolean` | `undefined` | Controlled open state |
| `Dialog` / `Sheet` | `onOpenChange` | `(open: boolean) => void` | `undefined` | State change callback |
| `SheetContent` | `side` | `"top" \| "bottom" \| "left" \| "right"` | `"right"` | Sheet slide-in position |

### 5. Attachment (`attachment.tsx`)

| Component | Prop | Type | Default | Description |
|-----------|------|------|---------|-------------|
| `Attachment` | `state` | `"idle" \| "uploading" \| "processing" \| "error" \| "done"` | `"done"` | Upload state indicator |
| `Attachment` | `size` | `"default" \| "sm" \| "xs"` | `"default"` | Attachment sizing |
| `Attachment` | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction |
| `AttachmentMedia` | `variant` | `"icon" \| "image"` | `"icon"` | Media thumbnail display |
