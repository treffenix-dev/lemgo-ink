"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";

// Change this to your desired owner password
const OWNER_PASSWORD = "admin2024";
const SESSION_KEY = "owner_auth";

function OwnerLogin({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === OWNER_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setError(true);
      setPw("");
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-xs">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-background text-lg font-bold">W</span>
          </div>
          <h1 className="text-xl font-bold">Owner-Bereich</h1>
          <p className="text-muted-foreground text-sm mt-1">Passwort eingeben</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            autoFocus
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            placeholder="Passwort"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-foreground/20"
          />
          {error && (
            <p className="text-sm text-red-600 text-center">Falsches Passwort.</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-foreground text-background text-sm font-semibold rounded-xl hover:bg-foreground/90 transition-colors"
          >
            Einloggen
          </button>
        </form>
      </div>
    </div>
  );
}

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === "1");
  }, []);

  // Still checking
  if (authed === null) return null;

  if (!authed) {
    return <OwnerLogin onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <Sidebar role="owner" />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
