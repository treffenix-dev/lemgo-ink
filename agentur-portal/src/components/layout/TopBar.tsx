"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  title?: string;
  actions?: React.ReactNode;
}

export function TopBar({ title, actions }: TopBarProps) {
  return (
    <header className="h-14 md:h-16 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3 min-w-0">
        {title && <h1 className="font-semibold text-foreground text-sm md:text-base truncate">{title}</h1>}
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        {actions}
        <Button variant="ghost" size="icon-sm">
          <Bell className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
