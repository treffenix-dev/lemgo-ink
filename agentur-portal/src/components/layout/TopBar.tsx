"use client";

import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/SidebarContext";

interface TopBarProps {
  title?: string;
  actions?: React.ReactNode;
}

export function TopBar({ title, actions }: TopBarProps) {
  const { openSidebar } = useSidebar();

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={openSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Menü öffnen"
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
        {title && <h1 className="font-semibold text-foreground text-sm sm:text-base">{title}</h1>}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        <Button variant="ghost" size="icon-sm">
          <Bell className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
