"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const MENU_COLS = [
  { title: "Balkan", items: [["Ćevapčići 10 Stück","12,90"],["Mixed Grill","18,90"],["Pljeskavica","13,50"],["Balkan-Teller f. 2","32,00"]] },
  { title: "Steaks & Grill", items: [["Rumpsteak 250g","22,90"],["T-Bone 400g","28,90"],["Hähnchen-Spieß","14,90"],["Entrecôte 300g","–"]] },
  { title: "Schnitzel", items: [["Wiener Schnitzel","16,90"],["Jägerschnitzel","15,90"],["Zigeunerschnitzel","15,90"],["Kinderschnitzel","8,50"]] },
];

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let startTime = 0;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / 2000, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function LightTheme() {
  const m = useIsMobile();

  return (
    <div style={{ background:"rgb(250 249 247)", color:"rgb(28 24 20)", fontFamily:"var(--font-inter), sans-serif", overflowX:"hidden" }}>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, background:"rgba(250,249,247,0.97)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgb(220 215 205)", display:"flex", justifyContent:"space-between", alignItems:"center", padding: m ? "0 4%" : "0 5%", height:64 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:"rgb(160 110 20)", marginTop:2 }} />
          <span style={{ fontSize: m ? "0.75rem" : "0.9rem", fontWeight:600, letterSpacing:"0.01em" }}>Münchener Löwenbräu</span>
        </div>
        {m ? (
          <a href="#reservierung" style={{ fontSize:"0.62rem", fontWeight:600, padding:"8px 14px", background:"rgb(28 24 20)", color:"rgb(250 249 247)", borderRadius:6, textDecoration:"none" }}>Reservieren</a>
        ) : (
          <div style={{ display:"flex", gap:4 }}>
            {["Speisekarte","Über uns","Kontakt"].map(l => (
              <a key={l} href="#" style={{ fontSize:"0.7rem", fontWeight:500, padding:"6px 14px", borderRadius:6, color:"rgb(120 112 100)", textDecoration:"none" }}>{l}</a>
            ))}
            <a href="#reservierung" style={{ fontSize:"0.7rem", fontWeight:600, padding:"8px 18px", background:"rgb(28 24 20)", color:"rgb(250 249 247)", borderRadius:6, textDecoration:"none" }}>Reservieren</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ minHeight:"100vh", paddingTop:64, display:"flex", flexDirection:"column", justifyContent:"center", padding: m ? "64px 5% 60px" : "64px 5% 80px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", width:"100%" }}>
          <motion.div initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
            style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgb(244 242 238)", border:"1px solid rgb(220 215 205)", borderRadius:100, padding:"6px 16px", marginBottom: m ? 28 : 48 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"rgb(160 110 20)" }} />
            <span style={{ fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgb(120 112 100)" }}>Seit 1970 in Lemgo</span>
          </motion.div>

          <div style={{ overflow:"hidden", marginBottom:8 }}>
            <motion.h1 initial={{ y:100 }} animate={{ y:0 }} transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}
              style={{ fontSize:"clamp(3.2rem,12vw,11rem)", fontWeight:700, lineHeight:0.88, letterSpacing:"-0.03em", margin:0, color:"rgb(28 24 20)" }}>
              Münchener
            </motion.h1>
          </div>
          <div style={{ overflow:"hidden", marginBottom: m ? 28 : 48 }}>
            <motion.h1 initial={{ y:100 }} animate={{ y:0 }} transition={{ duration:0.9, delay:0.08, ease:[0.22,1,0.36,1] }}
              style={{ fontSize:"clamp(3.2rem,12vw,11rem)", fontWeight:300, lineHeight:0.88, letterSpacing:"-0.03em", margin:0, color:"rgb(160 110 20)", fontStyle:"italic", fontFamily:"var(--font-cormorant)" }}>
              Löwenbräu
            </motion.h1>
          </div>

          <div style={{ display:"grid", gridTemplateColumns: m ? "1fr" : "1fr auto", alignItems:"end", gap: m ? 24 : 40 }}>
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
              style={{ fontSize: m ? "0.9rem" : "1.05rem", lineHeight:1.65, color:"rgb(120 112 100)", maxWidth:480, fontWeight:300 }}>
              Hausgemachte Balkan-Spezialitäten und Deutsche Küche. Mittelstraße 144, Lemgo — geöffnet Mittwoch bis Sonntag.
            </motion.p>
            <motion.div initial={{ opacity:0, x: m ? 0 : 20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.6 }}
              style={{ display:"flex", gap:12, flexShrink:0, flexWrap:"wrap" }}>
              <a href="#reservierung" style={{ background:"rgb(28 24 20)", color:"rgb(250 249 247)", fontSize:"0.72rem", fontWeight:600, padding: m ? "12px 20px" : "14px 28px", borderRadius:6, textDecoration:"none" }}>Tisch reservieren</a>
              <a href="#speisekarte" style={{ border:"1px solid rgb(220 215 205)", color:"rgb(28 24 20)", fontSize:"0.72rem", fontWeight:500, padding: m ? "12px 16px" : "14px 24px", borderRadius:6, textDecoration:"none" }}>Speisekarte</a>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8 }}
            style={{ display:"flex", gap:0, marginTop: m ? 40 : 80, borderTop:"1px solid rgb(220 215 205)", borderBottom:"1px solid rgb(220 215 205)" }}>
            {[{n:4.8,s:"",l:"Google Rating"},{n:347,s:"",l:"Bewertungen"},{n:50,s:"+",l:"Jahre Erfahrung"}].map((s,i) => (
              <div key={s.l} style={{ flex:1, padding: m ? "18px 0" : "28px 0", borderRight: i<2 ? "1px solid rgb(220 215 205)" : "none", paddingLeft: i>0 ? (m ? 16 : 32) : 0 }}>
                <div style={{ fontSize: m ? "1.8rem" : "2.8rem", fontWeight:700, letterSpacing:"-0.03em", lineHeight:1 }}>
                  {i===0 ? "4,8" : <Counter end={s.n} suffix={s.s} />}
                </div>
                <div style={{ fontSize: m ? "0.5rem" : "0.65rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:"rgb(120 112 100)", marginTop:5 }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MENU */}
      <section id="speisekarte" style={{ padding: m ? "60px 5%" : "100px 5%", background:"rgb(244 242 238)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ marginBottom: m ? 40 : 64 }}>
            <h2 style={{ fontSize:"clamp(1.8rem,5vw,3.5rem)", fontWeight:700, letterSpacing:"-0.02em", marginBottom:12 }}>Speisekarte</h2>
            <p style={{ fontSize:"0.85rem", color:"rgb(120 112 100)", fontWeight:300 }}>Alle Preise inkl. MwSt. · Nur Barzahlung vor Ort</p>
          </motion.div>

          <div style={{ display:"grid", gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)", gap: m ? 8 : 2 }}>
            {MENU_COLS.map((col, ci) => (
              <motion.div key={col.title} initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:ci*0.1 }}
                style={{ background:"rgb(250 249 247)", padding: m ? "24px 20px" : "36px 32px" }}>
                <h3 style={{ fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgb(160 110 20)", marginBottom: m ? 16 : 28, paddingBottom: m ? 10 : 16, borderBottom:"1px solid rgb(220 215 205)" }}>{col.title}</h3>
                {col.items.map(([name, price]) => (
                  <div key={name} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom: m ? 12 : 16 }}>
                    <span style={{ fontSize: m ? "0.88rem" : "0.92rem", fontFamily:"var(--font-cormorant)", fontWeight:400, letterSpacing:"0.02em" }}>{name}</span>
                    <span style={{ fontSize: m ? "0.8rem" : "0.85rem", fontWeight:600, color: price === "–" ? "rgb(180 175 165)" : "rgb(28 24 20)", letterSpacing:"0.05em", flexShrink:0, marginLeft:12 }}>{price !== "–" ? `${price} €` : "–"}</span>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVATION */}
      <section id="reservierung" style={{ padding: m ? "60px 5%" : "100px 5%" }}>
        <div style={{ maxWidth:600, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <h2 style={{ fontSize:"clamp(1.8rem,5vw,3.5rem)", fontWeight:700, letterSpacing:"-0.02em", marginBottom:12 }}>Reservierung</h2>
            <p style={{ fontSize:"0.85rem", color:"rgb(120 112 100)", marginBottom: m ? 24 : 40, fontWeight:300 }}>Wir bestätigen telefonisch innerhalb von 30 Minuten.</p>
            <div style={{ display:"grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: m ? 10 : 12, marginBottom:12 }}>
              {["Name","Telefonnummer","Datum","Anzahl Personen"].map(f => (
                <input key={f} placeholder={f} style={{ border:"1px solid rgb(220 215 205)", borderRadius:6, padding:"12px 16px", fontSize:"0.88rem", outline:"none", fontFamily:"var(--font-inter)", background:"transparent", color:"rgb(28 24 20)" }} />
              ))}
            </div>
            <button style={{ width:"100%", background:"rgb(28 24 20)", color:"rgb(250 249 247)", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", padding:"16px", borderRadius:6, border:"none", cursor:"pointer" }}>
              Tisch reservieren →
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"rgb(28 24 20)", color:"rgb(250 249 247)", padding: m ? "32px 5%" : "48px 5%", display:"flex", flexDirection: m ? "column" : "row", justifyContent:"space-between", alignItems: m ? "flex-start" : "center", gap: m ? 16 : 0 }}>
        <div>
          <div style={{ fontSize:"1rem", fontWeight:700, marginBottom:4 }}>Münchener Löwenbräu</div>
          <div style={{ fontSize:"0.7rem", color:"rgba(250,249,247,0.45)", fontWeight:300 }}>Mittelstraße 144 · 32657 Lemgo</div>
        </div>
        <div style={{ textAlign: m ? "left" : "right", fontSize:"0.7rem", color:"rgba(250,249,247,0.45)", fontWeight:300, lineHeight:1.8 }}>
          <div>05261 4267</div>
          <div>Mi–So: 11:30–14:00 & 17:00–22:30</div>
          <div>Mo + Di: Ruhetag</div>
        </div>
      </footer>
    </div>
  );
}
