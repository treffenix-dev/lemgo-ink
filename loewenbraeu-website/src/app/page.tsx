"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const THEMES = [
  { id: "default", name: "Dark Luxury", tagline: "Navy · Gold · Editorial", colors: { bg: "#06080F", surface: "#0C1020", gold: "#D4A840", cream: "#EDE9DF", muted: "#5A6580", border: "#1A2240" } },
  { id: "rustic", name: "Rustikales Bayern", tagline: "Holz · Amber · Gemütlich", colors: { bg: "#0F0A06", surface: "#1A1008", gold: "#DA962A", cream: "#F0E4D2", muted: "#8C6446", border: "#3C2010" } },
  { id: "light", name: "Modern Hell", tagline: "Clean · Zeitlos · Frisch", colors: { bg: "#FAF9F7", surface: "#F0EEE9", gold: "#A06E14", cream: "#1E1C1A", muted: "#787064", border: "#DCD7CD" } },
  { id: "abendrot", name: "Abendrot", tagline: "Rot · Kupfer · Intim", colors: { bg: "#140A0C", surface: "#220E12", gold: "#DC6450", cream: "#FAF0E1", muted: "#A07858", border: "#50181E" } },
] as const;

type ThemeColors = { bg: string; surface: string; gold: string; cream: string; muted: string; border: string };

function MiniPreview({ colors }: { colors: ThemeColors }) {
  const { bg, surface, gold, cream, muted, border } = colors;
  return (
    <div style={{ background: bg, borderRadius: 10, overflow: "hidden", width: "100%", aspectRatio: "3/4", fontFamily: "Georgia, serif", userSelect: "none" }}>
      <div style={{ background: surface, borderBottom: `1px solid ${gold}22`, padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: cream, fontSize: 6, letterSpacing: "0.28em", opacity: 0.9 }}>LÖWENBRÄU · LEMGO</span>
        <div style={{ display: "flex", gap: 7 }}>{["—","—","—"].map((d, i) => <span key={i} style={{ color: muted, fontSize: 5 }}>{d}</span>)}</div>
      </div>
      <div style={{ padding: "16px 14px", textAlign: "center" }}>
        <div style={{ width: 18, height: 1, background: gold, margin: "0 auto 10px" }} />
        <div style={{ color: muted, fontSize: 5, letterSpacing: "0.32em", textTransform: "uppercase", marginBottom: 5 }}>Seit über 50 Jahren</div>
        <div style={{ color: cream, fontSize: 17, letterSpacing: "0.04em", lineHeight: 1, fontWeight: 300 }}>Münchener</div>
        <div style={{ color: gold, fontSize: 21, letterSpacing: "0.06em", fontStyle: "italic", lineHeight: 1.1, marginBottom: 10 }}>Löwenbräu</div>
        <div style={{ color: muted, fontSize: 5, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 12 }}>Balkan &amp; Deutsche Küche</div>
        <div style={{ display: "inline-block", border: `1px solid ${cream}35`, color: cream, fontSize: 5, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 10px" }}>Tisch reservieren</div>
        <div style={{ marginTop: 14, paddingTop: 10, borderTop: `1px solid ${gold}18`, display: "flex", justifyContent: "center", gap: 14 }}>
          {[["4,8★","Bewertung"],["347","Reviews"],["50+","Jahre"]].map(([n, l], i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ color: gold, fontSize: 9 }}>{n}</div>
              <div style={{ color: muted, fontSize: 4, letterSpacing: "0.15em", marginTop: 1, textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${border}`, background: surface + "99", padding: "8px 14px" }}>
        {[["Ćevapčići","12,90 €"],["Rumpsteak 250g","22,90 €"],["Wiener Schnitzel","16,90 €"]].map(([item, price], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: i < 2 ? `1px solid ${gold}12` : "none" }}>
            <span style={{ color: cream, fontSize: 5.5, opacity: 0.8 }}>{item}</span>
            <span style={{ color: gold, fontSize: 5.5 }}>{price}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: "8px 14px", borderTop: `1px solid ${border}` }}>
        <div style={{ color: muted, fontSize: 4.5, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 5 }}>Reservierung</div>
        <div style={{ display: "flex", gap: 4 }}>
          {["Name","Datum","Gäste"].map((p, i) => (
            <div key={i} style={{ flex: 1, height: 10, background: surface, border: `1px solid ${border}`, borderRadius: 2, display: "flex", alignItems: "center", paddingLeft: 3 }}>
              <span style={{ color: muted, fontSize: 4, opacity: 0.6 }}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SelectPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ background: "#07060C", color: "#EDE9DF" }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-14">
        <div className="flex items-center justify-center gap-4 mb-5">
          <span className="block h-px w-10" style={{ background: "#D4A840" }} />
          <span style={{ fontSize: "0.58rem", letterSpacing: "0.4em", color: "#D4A840", textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>Website-Präsentation</span>
          <span className="block h-px w-10" style={{ background: "#D4A840" }} />
        </div>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(1.9rem, 4vw, 2.9rem)", letterSpacing: "0.08em", lineHeight: 1.1 }}>Münchener Löwenbräu</h1>
        <p style={{ marginTop: 10, fontSize: "0.7rem", letterSpacing: "0.22em", color: "#5A6580", textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>Wähle eine Design-Variante</p>
      </motion.div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-5xl">
        {THEMES.map((theme, i) => (
          <motion.button key={theme.id} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }} onClick={() => router.push(`/view?theme=${theme.id}`)} className="group text-left">
            <div className="mb-4 group-hover:-translate-y-1.5" style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${theme.colors.gold}28`, boxShadow: "0 8px 32px rgba(0,0,0,0.55)", transition: "transform 0.3s ease" }}>
              <MiniPreview colors={theme.colors} />
            </div>
            <div className="px-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: theme.colors.gold }} />
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 400, color: "#EDE9DF", letterSpacing: "0.04em" }}>{theme.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: "0.6rem", letterSpacing: "0.14em", color: "#5A6580", textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>{theme.tagline}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ fontSize: "0.68rem", color: theme.colors.gold }}>→</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} style={{ marginTop: 52, fontSize: "0.58rem", letterSpacing: "0.18em", color: "#3A3845", textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>Entwurf · Noch kein eigener Webauftritt</motion.p>
    </div>
  );
}
