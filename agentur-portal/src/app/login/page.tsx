"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ACCOUNTS = [
  { email: "admin@webagentur.de", password: "admin2024", role: "owner",    target: "/owner",  label: "Agentur-Login" },
  { email: "demo@webagentur.de",  password: "kunde2024", role: "customer", target: "/portal", label: "Kunden-Demo"   },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  function login(e: string, p: string, target: string, role: string) {
    sessionStorage.setItem(role === "owner" ? "owner_auth" : "customer_auth", "1");
    router.push(target);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const account = ACCOUNTS.find(
      (a) => a.email === email.trim().toLowerCase() && a.password === password
    );
    if (account) {
      login(account.email, account.password, account.target, account.role);
    } else {
      setError("E-Mail oder Passwort falsch.");
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: "#07070d" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-12">
        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
          <span className="text-[#07070d] text-sm font-bold">W</span>
        </div>
        <span className="font-semibold text-white text-lg">WebAgentur</span>
      </Link>

      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white mb-1">Anmelden</h1>
        <p className="text-white/40 text-sm mb-8">Willkommen zurück</p>

        {/* Quick-login demo buttons */}
        <div className="flex gap-2 mb-6">
          {ACCOUNTS.map((a) => (
            <button
              key={a.role}
              type="button"
              onClick={() => login(a.email, a.password, a.target, a.role)}
              className="flex-1 py-2 px-3 rounded-xl border text-xs font-medium transition-all duration-200"
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.5)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)");
                (e.currentTarget.style.color = "rgba(255,255,255,0.85)");
                (e.currentTarget.style.background = "rgba(255,255,255,0.07)");
              }}
              onMouseLeave={(e) => {
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)");
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)");
                (e.currentTarget.style.background = "rgba(255,255,255,0.04)");
              }}
            >
              {a.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-white/45 font-medium">E-Mail</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="deine@email.de"
              className="w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none border transition-colors placeholder:text-white/20"
              style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.28)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-white/45 font-medium">Passwort</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none border transition-colors placeholder:text-white/20"
              style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.28)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-1 py-3.5 bg-white text-[#07070d] text-sm font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? "Wird angemeldet…" : "Einloggen"}
          </button>
        </form>

        <p className="text-center text-xs text-white/20 mt-8">
          Noch kein Konto?{" "}
          <Link href="/pakete" className="text-white/45 hover:text-white/70 transition-colors">
            Paket wählen →
          </Link>
        </p>
      </div>
    </div>
  );
}
