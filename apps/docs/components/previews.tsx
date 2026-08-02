'use client';

import { useState } from 'react';
import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import {
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubTrigger,
  MenuTrigger,
} from '@workspace/ui/components/menu';

function PreviewShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-4 flex flex-wrap items-center justify-center gap-3 rounded-lg border border-fd-border bg-fd-card p-8">
      {children}
    </div>
  );
}

export function ButtonPreview() {
  return (
    <PreviewShell>
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button disabled>Disabled</Button>
    </PreviewShell>
  );
}

export function CardPreview() {
  return (
    <PreviewShell>
      <Card className="w-72">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
          <CardAction>
            <Button variant="ghost" size="icon-xs" aria-label="More options">
              ⋯
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Label htmlFor="project-name">Name</Label>
            <Input id="project-name" placeholder="my-project" />
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </PreviewShell>
  );
}

export function InputPreview() {
  return (
    <PreviewShell>
      <div className="flex w-64 flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
        <Label htmlFor="disabled">Disabled</Label>
        <Input id="disabled" disabled placeholder="Unavailable" />
      </div>
    </PreviewShell>
  );
}

export function LabelPreview() {
  return (
    <PreviewShell>
      <div className="flex items-center gap-2">
        <input id="terms" type="checkbox" className="size-3.5 accent-[var(--primary)]" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </PreviewShell>
  );
}

export function MenuPreview() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [panel, setPanel] = useState('top');

  return (
    <PreviewShell>
      <Menu>
        <MenuTrigger render={<Button variant="outline" />}>Open Menu</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={8} align="start">
            <MenuPopup>
              <MenuGroup>
                <MenuGroupLabel>Actions</MenuGroupLabel>
                <MenuItem>
                  New Tab
                  <MenuShortcut>⌘T</MenuShortcut>
                </MenuItem>
                <MenuItem>
                  New Window
                  <MenuShortcut>⌘N</MenuShortcut>
                </MenuItem>
                <MenuSub>
                  <MenuSubTrigger>Share</MenuSubTrigger>
                  <MenuPortal>
                    <MenuPositioner sideOffset={4}>
                      <MenuPopup>
                        <MenuItem>Copy Link</MenuItem>
                        <MenuItem>Email</MenuItem>
                        <MenuItem>Message</MenuItem>
                      </MenuPopup>
                    </MenuPositioner>
                  </MenuPortal>
                </MenuSub>
              </MenuGroup>
              <MenuSeparator />
              <MenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
                Status Bar
              </MenuCheckboxItem>
              <MenuSeparator />
              <MenuRadioGroup value={panel} onValueChange={setPanel}>
                <MenuRadioItem value="top">Panel Top</MenuRadioItem>
                <MenuRadioItem value="bottom">Panel Bottom</MenuRadioItem>
                <MenuRadioItem value="right">Panel Right</MenuRadioItem>
              </MenuRadioGroup>
              <MenuSeparator />
              <MenuItem variant="destructive">
                Delete
                <MenuShortcut>⌘⌫</MenuShortcut>
              </MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    </PreviewShell>
  );
}
