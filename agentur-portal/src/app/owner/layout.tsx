"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile, drawer when open */}
      <div className={`
        fixed inset-y-0 left-0 z-50 lg:static lg:z-auto lg:translate-x-0
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <Sidebar role="owner" onClose={() => setSidebarOpen(false)} />
      </div>

      <main className="flex-1 overflow-x-hidden min-w-0">
        {/* Pass toggle fn via context alternative: clone with prop */}
        {children}
        {/* Mobile menu button — fixed bottom right */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-5 left-4 z-30 lg:hidden flex items-center gap-2 bg-blue-600 text-white rounded-full px-4 py-2.5 text-sm font-medium shadow-lg shadow-blue-500/30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Menü
        </button>
      </main>
    </div>
  );
}
