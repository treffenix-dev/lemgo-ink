"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Menu } from "lucide-react";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/20">

      {/* Desktop sidebar — always visible, in normal flow */}
      <div className="hidden lg:block shrink-0">
        <Sidebar role="owner" />
      </div>

      {/* Mobile sidebar — only in DOM when open, fully removed otherwise */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/70 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar role="owner" onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Main content — always full width on mobile */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        {children}
      </main>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-5 left-4 z-30 lg:hidden flex items-center gap-2 bg-blue-600 text-white rounded-full px-4 py-2.5 text-sm font-semibold shadow-lg shadow-blue-500/30 active:scale-95 transition-transform"
      >
        <Menu className="w-4 h-4" />
        Menü
      </button>
    </div>
  );
}
