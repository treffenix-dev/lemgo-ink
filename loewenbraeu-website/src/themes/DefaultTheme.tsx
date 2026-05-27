"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reservation } from "@/components/Reservation";
import { Contact } from "@/components/Contact";
import { useIsMobile } from "@/hooks/useIsMobile";

const MENU = [
  { cat: "Balkan",   items: [["Ćevapčići (10 Stück)", "12,90"], ["Mixed Grill Platte", "18,90"], ["Pljeskavica", "13,50"], ["Balkan-Teller für 2", "32,00"]] },
  { cat: "Steaks",   items: [["Rumpsteak 250g", "22,90"], ["T-Bone 400g", "28,90"], ["Grillspieß Hähnchen", "14,90"]] },
  { cat: "Schnitzel",items: [["Wiener Schnitzel", "16,90"], ["Jägerschnitzel", "15,90"], ["Zigeunerschnitzel", "15,90"]] },
];

const WORDS = ["Münchener", "Löwenbräu"];

export default function DefaultTheme() {
  const m = useIsMobile();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div style={{ background: "rgb(6 8 15)", color: "rgb(237 233 223)", fontFamily: "var(--font-cormorant), Georgia, serif", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: m ? "0 4%" : "0 5%", height: 68, borderBottom: "1px solid rgba(184,137,31,0.12)", background: "rgba(6,8,15,0.9)", backdropFilter: "blur(12px)" }}>
        <span style={{ fontSize: m ? "0.75rem" : "0.95rem", letterSpacing: "0.2em", fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>LÖWENBRÄU · LEMGO</span>
        {m ? (
          <a href="#reservierung" style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid rgba(237,233,223,0.3)", padding: "8px 16px", color: "rgb(237 233 223)", textDecoration: "none" }}>Reservieren</a>
        ) : (
          <div style={{ display: "flex", gap: 32 }}>
            {["Speisekarte","Reservierung","Kontakt"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgb(90 101 128)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://img02.restaurantguru.com/c2d3-Restaurant-Munchner-Lowenbrau-food.jpg)", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.12) saturate(0.3)", transform: "scale(1.1)" }} />
        <div style={{ position: "absolute", inset: 0, background: m ? "linear-gradient(to bottom, rgb(6 8 15) 0%, rgba(6,8,15,0.7) 50%, rgb(6,8,15) 100%)" : "linear-gradient(to right, rgb(6 8 15) 40%, transparent)" }} />

        <motion.div style={{ y, opacity, position: "relative", zIndex: 10, padding: m ? "0 6%" : "0 5%", maxWidth: 700, width: "100%" }}>
          <motion.p initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration:1 }}
            style={{ fontFamily:"var(--font-inter)", fontSize: m ? "0.5rem" : "0.6rem", letterSpacing:"0.4em", textTransform:"uppercase", color:"rgb(184 137 31)", marginBottom: m ? 20 : 32 }}>
            ── Seit über 50 Jahren in Lemgo
          </motion.p>

          {WORDS.map((word, i) => (
            <div key={word} style={{ overflow: "hidden" }}>
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: "clamp(3.2rem, 12vw, 9.5rem)", fontWeight: 300, lineHeight: 0.95, letterSpacing: "0.02em", margin: 0, color: i === 1 ? "rgb(212 168 64)" : "rgb(237 233 223)", fontStyle: i === 1 ? "italic" : "normal" }}
              >
                {word}
              </motion.h1>
            </div>
          ))}

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
            style={{ fontFamily:"var(--font-inter)", fontSize: m ? "0.6rem" : "0.75rem", letterSpacing:"0.28em", textTransform:"uppercase", color:"rgb(90 101 128)", marginTop: m ? 16 : 24, marginBottom: m ? 32 : 48 }}>
            Balkan & Deutsche Küche
          </motion.p>

          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.85 }}
            style={{ display:"flex", gap: m ? 12 : 24, flexWrap: "wrap" }}>
            <a href="#reservierung" style={{ fontFamily:"var(--font-inter)", fontSize: m ? "0.6rem" : "0.68rem", letterSpacing:"0.2em", textTransform:"uppercase", border:"1px solid rgba(237,233,223,0.3)", padding: m ? "12px 24px" : "14px 36px", color:"rgb(237 233 223)", textDecoration:"none" }}>
              Tisch reservieren
            </a>
            <a href="#speisekarte" style={{ fontFamily:"var(--font-inter)", fontSize: m ? "0.6rem" : "0.68rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgb(90 101 128)", textDecoration:"none", display:"flex", alignItems:"center", gap:8 }}>
              Speisekarte →
            </a>
          </motion.div>
        </motion.div>

        {/* Stats — unten, auf Mobile horizontal zentriert */}
        {!m && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }}
            style={{ position:"absolute", bottom:48, right:"5%", display:"flex", gap:32, zIndex:10 }}>
            {[["4,8★","Google"],["347","Reviews"],["50+","Jahre"]].map(([n,l]) => (
              <div key={l} style={{ textAlign:"right" }}>
                <div style={{ fontSize:"2rem", fontWeight:300, color:"rgb(212 168 64)", lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:"var(--font-inter)", fontSize:"0.55rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgb(90 101 128)", marginTop:4 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        )}
        {m && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }}
            style={{ position:"absolute", bottom:32, left:0, right:0, display:"flex", justifyContent:"center", gap:24, zIndex:10 }}>
            {[["4,8★","Google"],["347","Bew."],["50+","Jahre"]].map(([n,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:"1.4rem", fontWeight:300, color:"rgb(212 168 64)", lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:"var(--font-inter)", fontSize:"0.5rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"rgb(90 101 128)", marginTop:3 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        )}
      </section>

      {/* MENU */}
      <section id="speisekarte" style={{ padding: m ? "60px 5%" : "120px 5%", maxWidth:900, margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
          <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.58rem", letterSpacing:"0.4em", textTransform:"uppercase", color:"rgb(184 137 31)", marginBottom:16 }}>Speisekarte</p>
          <h2 style={{ fontSize:"clamp(2rem,6vw,5rem)", fontWeight:300, letterSpacing:"0.04em", marginBottom: m ? 40 : 64, lineHeight:1 }}>Unsere Gerichte</h2>
        </motion.div>

        {MENU.map((cat, ci) => (
          <motion.div key={cat.cat} initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:ci*0.1 }} style={{ marginBottom: m ? 36 : 56 }}>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:20 }}>
              <span style={{ width:24, height:1, background:"rgb(184 137 31)", display:"block" }} />
              <span style={{ fontFamily:"var(--font-inter)", fontSize:"0.6rem", letterSpacing:"0.32em", textTransform:"uppercase", color:"rgb(184 137 31)" }}>{cat.cat}</span>
            </div>
            {cat.items.map(([name, price]) => (
              <div key={name} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", padding: m ? "12px 0" : "14px 0", borderBottom:"1px solid rgba(26,34,64,0.8)" }}>
                <span style={{ fontSize: m ? "0.95rem" : "1.1rem", fontWeight:300, letterSpacing:"0.03em" }}>{name}</span>
                <span style={{ fontFamily:"var(--font-inter)", fontSize: m ? "0.8rem" : "0.85rem", color:"rgb(212 168 64)", letterSpacing:"0.08em", flexShrink:0, marginLeft:12 }}>{price} €</span>
              </div>
            ))}
          </motion.div>
        ))}
      </section>

      <div style={{ padding: m ? "0 5%" : "0 5%", borderTop:"1px solid rgba(26,34,64,0.8)" }}>
        <Reservation />
        <Contact />
      </div>

      <footer style={{ padding: m ? "28px 5%" : "32px 5%", borderTop:"1px solid rgba(26,34,64,0.8)", display:"flex", flexDirection: m ? "column" : "row", justifyContent:"space-between", alignItems: m ? "flex-start" : "center", gap: m ? 8 : 0 }}>
        <span style={{ fontSize:"1rem", fontWeight:300, letterSpacing:"0.16em" }}>Münchener Löwenbräu</span>
        <span style={{ fontFamily:"var(--font-inter)", fontSize:"0.62rem", color:"rgb(90 101 128)", letterSpacing:"0.1em" }}>Mittelstraße 144 · 32657 Lemgo · 05261 4267</span>
      </footer>
    </div>
  );
}
