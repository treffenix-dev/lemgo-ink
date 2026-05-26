"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FolderKanban, CheckSquare, Upload, MessageSquare,
  FileText, CreditCard, ThumbsUp, HeadphonesIcon, LogOut, X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SidebarProps {
  role: "customer" | "owner";
  onClose?: () => void;
}

const customerNav = [
  { label: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { label: "Projektstatus", href: "/portal/projekt", icon: FolderKanban },
  { label: "Aufgaben", href: "/portal/aufgaben", icon: CheckSquare },
  { label: "Dateien", href: "/portal/dateien", icon: Upload },
  { label: "Tickets", href: "/portal/tickets", icon: MessageSquare },
  { label: "Rechnungen", href: "/portal/rechnungen", icon: FileText },
  { label: "Zahlungen", href: "/portal/zahlungen", icon: CreditCard },
  { label: "Freigaben", href: "/portal/freigaben", icon: ThumbsUp },
  { label: "Support", href: "/portal/support", icon: HeadphonesIcon },
];

const ownerNav = [
  { label: "Übersicht", href: "/owner", icon: LayoutDashboard, section: null },
  { label: "Leads", href: "/owner/leads", icon: MessageSquare, section: "Vertrieb" },
  { label: "Kunden", href: "/owner/kunden", icon: HeadphonesIcon, section: "Vertrieb" },
  { label: "Rechnungen", href: "/owner/rechnungen", icon: FileText, section: "Finanzen" },
  { label: "Abnahmeprotokoll", href: "/owner/rechnungen/abnahme", icon: ThumbsUp, section: "Finanzen" },
  { label: "Angebote", href: "/owner/angebote", icon: FileText, section: "Finanzen" },
  { label: "Einnahmen", href: "/owner/einnahmen", icon: CreditCard, section: "Finanzen" },
  { label: "Ausgaben", href: "/owner/ausgaben", icon: CreditCard, section: "Finanzen" },
  { label: "Kilometer", href: "/owner/kilometer", icon: FolderKanban, section: "Finanzen" },
  { label: "Aufgaben", href: "/owner/aufgaben", icon: CheckSquare, section: "Arbeit" },
  { label: "Timer", href: "/owner/timer", icon: CheckSquare, section: "Arbeit" },
  { label: "Notizen", href: "/owner/notizen", icon: FolderKanban, section: "Arbeit" },
  { label: "Dokumente", href: "/owner/dokumente", icon: Upload, section: "Dokumente" },
  { label: "Einstellungen", href: "/owner/einstellungen", icon: LayoutDashboard, section: "System" },
  { label: "Tickets", href: "/owner/tickets", icon: MessageSquare, section: "System" },
];

export function Sidebar({ role, onClose }: SidebarProps) {
  const pathname = usePathname();
  const nav = role === "customer" ? customerNav : ownerNav;

  const sections = role === "owner"
    ? Array.from(new Set(ownerNav.map((i) => i.section)))
    : [null];

  return (
    <aside className="w-60 shrink-0 h-screen bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-border">
        <Link href="/" className="flex items-center gap-2" onClick={onClose}>
          <div className="w-7 h-7 bg-foreground rounded-md flex items-center justify-center">
            <span className="text-background text-xs font-bold">W</span>
          </div>
          <span className="font-semibold text-sm text-foreground">WebAgentur</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-muted-foreground hover:text-foreground p-1">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {role === "owner" ? (
          sections.map((section) => {
            const items = ownerNav.filter((i) => i.section === section);
            return (
              <div key={section ?? "main"} className="mb-4">
                {section && (
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-1.5">
                    {section}
                  </p>
                )}
                {items.map((item) => (
                  <NavItem key={item.href} item={item} active={pathname === item.href} onClick={onClose} />
                ))}
              </div>
            );
          })
        ) : (
          nav.map((item) => (
            <NavItem key={item.href} item={item} active={pathname === item.href} onClick={onClose} />
          ))
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3">
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Abmelden
          </button>
        </form>
      </div>
    </aside>
  );
}

function NavItem({
  item,
  active,
  onClick,
}: {
  item: { label: string; href: string; icon: React.ComponentType<{ className?: string }> };
  active: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5",
        active
          ? "bg-foreground text-background font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {item.label}
    </Link>
  );
}
