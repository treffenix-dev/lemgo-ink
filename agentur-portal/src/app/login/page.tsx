"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const OWNER_PASSWORD = "admin2024";
const KUNDE_PASSWORD = "kunde2024";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"owner" | "kunde" | null>(null);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const correct =
      (role === "owner" && pw === OWNER_PASSWORD) ||
      (role === "kunde" && pw === KUNDE_PASSWORD);
    if (correct) {
      sessionStorage.setItem(role === "owner" ? "owner_auth" : "customer_auth", "1");
      router.push(role === "owner" ? "/owner" : "/portal");
    } else {
      setError(true);
      setPw("");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: "#07070d" }}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-12">
        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
          <span className="text-[#07070d] text-sm font-bold">W</span>
        </div>
        <span className="font-semibold text-white text-lg">WebAgentur</span>
      </Link>

      {!role ? (
        /* ── Rollenauswahl ─────────────────────────────────────────────── */
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-white text-center mb-2">Willkommen zurück</h1>
          <p className="text-white/40 text-sm text-center mb-10">Wähle deinen Zugang</p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { r: "owner" as const, emoji: "🔑", label: "Owner", sub: "Admin-Bereich" },
              { r: "kunde" as const, emoji: "👤", label: "Kunde", sub: "Kundenportal" },
            ].map(({ r, emoji, label, sub }) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.09] bg-white/[0.03] p-8 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.08] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  {emoji}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white text-sm">{label}</p>
                  <p className="text-white/35 text-xs mt-0.5">{sub}</p>
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-white/20 mt-8">
            Noch kein Konto?{" "}
            <Link href="/pakete" className="text-white/45 hover:text-white/70 transition-colors">
              Paket wählen →
            </Link>
          </p>
        </div>
      ) : (
        /* ── Passwort-Eingabe ───────────────────────────────────────────── */
        <div className="w-full max-w-sm">
          <button
            onClick={() => { setRole(null); setPw(""); setError(false); }}
            className="flex items-center gap-2 text-white/35 hover:text-white/65 text-sm mb-8 transition-colors"
          >
            ← Zurück
          </button>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/[0.08] flex items-center justify-center text-xl">
              {role === "owner" ? "🔑" : "👤"}
            </div>
            <div>
              <p className="font-semibold text-white">{role === "owner" ? "Owner-Zugang" : "Kunden-Zugang"}</p>
              <p className="text-white/35 text-xs">{role === "owner" ? "Admin-Bereich" : "Kundenportal"}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="password"
              autoFocus
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              placeholder="Passwort"
              className="w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none border transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)",
              }}
            />
            {error && <p className="text-sm text-red-400 text-center">Falsches Passwort.</p>}
            <button
              type="submit"
              disabled={loading || pw.length === 0}
              className="w-full py-3.5 bg-white text-[#07070d] text-sm font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? "..." : "Einloggen"}
            </button>
          </form>

          <div className="mt-5 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] text-center">
            <p className="text-xs text-white/30">
              Demo-Passwort:{" "}
              <span className="text-white/55 font-mono">{role === "owner" ? "admin2024" : "kunde2024"}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
