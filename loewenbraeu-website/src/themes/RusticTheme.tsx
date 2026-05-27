"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const MENU = [
  { name: "Ćevapčići (10 Stück)", desc: "Ajvar · Zwiebeln · Fladenbrot", price: "12,90" },
  { name: "Mixed Grill Platte",   desc: "Ćevapčići · Pljeskavica · Spieß", price: "18,90" },
  { name: "Rumpsteak 250g",        desc: "Kräuterbutter · Pommes · Salat",  price: "22,90" },
  { name: "T-Bone Steak 400g",     desc: "Holzkohle · Beilagen nach Wahl", price: "28,90" },
  { name: "Wiener Schnitzel",      desc: "Vom Kalb · Pommes · Preiselbeeren", price: "16,90" },
  { name: "Pljeskavica",           desc: "Balkan-Burger · Ajvar · Zwiebeln", price: "13,50" },
];

function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.5 + 0.2,
    }));
    let raf: number;
    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(218,150,42,${p.alpha})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.y < 0) { p.y = canvas!.height; p.x = Math.random() * canvas!.width; }
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />;
}

function AnimatedNumber({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0; const dur = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{val}</span>;
}

export default function RusticTheme() {
  return (
    <div style={{ background:"rgb(15 10 6)", color:"rgb(240 228 210)", fontFamily:"var(--font-cormorant), Georgia, serif", overflowX:"hidden" }}>

      {/* NAV — warm amber bar */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 5%", height:72, background:"rgba(15,10,6,0.95)", backdropFilter:"blur(12px)", borderBottom:"2px solid rgba(218,150,42,0.25)", borderRadius:"0 0 12px 12px" }}>
        <div style={{ display:"flex", flexDirection:"column", lineHeight:1 }}>
          <span style={{ fontSize:"1.1rem", fontWeight:500, letterSpacing:"0.06em" }}>Löwenbräu</span>
          <span style={{ fontFamily:"var(--font-inter)", fontSize:"0.55rem", letterSpacing:"0.28em", textTransform:"uppercase", color:"rgb(218 150 42)" }}>Lemgo · Seit 1970</span>
        </div>
        <div style={{ display:"flex", gap:24 }}>
          {["Karte","Tisch","Kontakt"].map(l => (
            <a key={l} href="#" style={{ fontFamily:"var(--font-inter)", fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgb(140 100 70)", textDecoration:"none", padding:"6px 12px", borderRadius:6 }}>{l}</a>
          ))}
          <a href="#reservierung" style={{ fontFamily:"var(--font-inter)", fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase", background:"rgb(196 124 28)", color:"rgb(15 10 6)", padding:"8px 20px", borderRadius:8, textDecoration:"none", fontWeight:600 }}>Reservieren</a>
        </div>
      </nav>

      {/* HERO — split screen */}
      <section style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr", paddingTop:72 }}>
        {/* Left: Image */}
        <motion.div initial={{ opacity:0, scale:1.05 }} animate={{ opacity:1, scale:1 }} transition={{ duration:1.4, ease:[0.22,1,0.36,1] }}
          style={{ position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"url(https://img02.restaurantguru.com/c2d3-Restaurant-Munchner-Lowenbrau-food.jpg)", backgroundSize:"cover", backgroundPosition:"center", filter:"brightness(0.65) saturate(0.8) sepia(0.2)" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, transparent 60%, rgb(15 10 6))" }} />
          <FloatingParticles />
          {/* Overlay badge */}
          <div style={{ position:"absolute", bottom:48, left:40, background:"rgba(15,10,6,0.85)", border:"1px solid rgba(218,150,42,0.3)", borderRadius:12, padding:"20px 28px", backdropFilter:"blur(8px)" }}>
            <div style={{ fontFamily:"var(--font-inter)", fontSize:"0.55rem", letterSpacing:"0.32em", textTransform:"uppercase", color:"rgb(218 150 42)", marginBottom:8 }}>Google Bewertung</div>
            <div style={{ fontSize:"2.2rem", fontWeight:500, lineHeight:1 }}>4,8 ★</div>
            <div style={{ fontFamily:"var(--font-inter)", fontSize:"0.6rem", color:"rgb(140 100 70)", marginTop:4 }}>347 Bewertungen</div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:"80px 8% 80px 6%" }}>
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.3 }}
            style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
            <div style={{ width:40, height:2, background:"rgb(218 150 42)", borderRadius:1 }} />
            <span style={{ fontFamily:"var(--font-inter)", fontSize:"0.6rem", letterSpacing:"0.32em", textTransform:"uppercase", color:"rgb(218 150 42)" }}>Seit über 50 Jahren</span>
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:0.4, ease:[0.22,1,0.36,1] }}
            style={{ fontSize:"clamp(3rem,7vw,6.5rem)", fontWeight:500, lineHeight:0.95, letterSpacing:"0.02em", marginBottom:20 }}>
            Münchener<br />
            <span style={{ color:"rgb(218 150 42)", fontStyle:"italic" }}>Löwenbräu</span>
          </motion.h1>

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
            style={{ fontSize:"1.1rem", fontWeight:300, color:"rgb(140 100 70)", lineHeight:1.7, maxWidth:380, marginBottom:48 }}>
            Hausgemachte Balkan-Spezialitäten und klassische deutsche Küche — seit mehr als 50 Jahren in Lemgo.
          </motion.p>

          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9 }} style={{ display:"flex", gap:16 }}>
            <a href="#reservierung" style={{ background:"rgb(196 124 28)", color:"rgb(15 10 6)", fontFamily:"var(--font-inter)", fontSize:"0.7rem", letterSpacing:"0.2em", textTransform:"uppercase", padding:"16px 36px", borderRadius:10, textDecoration:"none", fontWeight:600 }}>Tisch reservieren</a>
            <a href="#karte" style={{ border:"1px solid rgba(218,150,42,0.35)", color:"rgb(218 150 42)", fontFamily:"var(--font-inter)", fontSize:"0.7rem", letterSpacing:"0.2em", textTransform:"uppercase", padding:"16px 28px", borderRadius:10, textDecoration:"none" }}>Speisekarte</a>
          </motion.div>

          {/* Stats */}
          <div style={{ display:"flex", gap:40, marginTop:64, paddingTop:40, borderTop:"1px solid rgba(60,32,16,0.8)" }}>
            {[[50,"Jahre"],[347,"Gäste täglich"],["Mo+Di","Ruhetag"]].map(([n,l]) => (
              <div key={String(l)}>
                <div style={{ fontSize:"2rem", fontWeight:500, color:"rgb(218 150 42)", lineHeight:1 }}>
                  {typeof n === "number" ? <><AnimatedNumber target={n} />+</> : n}
                </div>
                <div style={{ fontFamily:"var(--font-inter)", fontSize:"0.58rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgb(140 100 70)", marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU — card grid */}
      <section id="karte" style={{ padding:"100px 5%", background:"rgb(26 16 8)" }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:64 }}>
          <div style={{ width:48, height:2, background:"rgb(218 150 42)", borderRadius:1, margin:"0 auto 20px" }} />
          <h2 style={{ fontSize:"clamp(2rem,5vw,4rem)", fontWeight:500, letterSpacing:"0.03em" }}>Unsere Spezialitäten</h2>
        </motion.div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:20, maxWidth:1100, margin:"0 auto" }}>
          {MENU.map((item, i) => (
            <motion.div key={item.name}
              initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.6, delay:i*0.08 }}
              whileHover={{ y:-6, boxShadow:"0 12px 40px rgba(196,124,28,0.25)" }}
              style={{ background:"rgb(38 22 12)", border:"1px solid rgba(60,32,16,0.8)", borderRadius:14, padding:"28px 24px", cursor:"pointer", transition:"box-shadow 0.3s ease" }}>
              <div style={{ fontSize:"1.15rem", fontWeight:500, marginBottom:8 }}>{item.name}</div>
              <div style={{ fontFamily:"var(--font-inter)", fontSize:"0.72rem", color:"rgb(140 100 70)", marginBottom:20, lineHeight:1.5 }}>{item.desc}</div>
              <div style={{ fontSize:"1.5rem", fontWeight:300, color:"rgb(218 150 42)" }}>{item.price} <span style={{ fontSize:"0.9rem" }}>€</span></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* RESERVATION */}
      <section id="reservierung" style={{ padding:"100px 5%", maxWidth:700, margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <div style={{ width:48, height:2, background:"rgb(218 150 42)", borderRadius:1, marginBottom:20 }} />
          <h2 style={{ fontSize:"clamp(2rem,5vw,4rem)", fontWeight:500, marginBottom:12 }}>Tisch reservieren</h2>
          <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.8rem", color:"rgb(140 100 70)", lineHeight:1.7, marginBottom:40 }}>Reservierungen werden innerhalb von 30 Minuten telefonisch bestätigt.</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            {["Name","Telefon","Datum","Personen"].map(f => (
              <input key={f} placeholder={f} style={{ background:"rgb(26 16 8)", border:"1px solid rgba(60,32,16,0.8)", borderRadius:10, padding:"14px 16px", color:"rgb(240 228 210)", fontFamily:"var(--font-cormorant)", fontSize:"1rem", outline:"none" }} />
            ))}
          </div>
          <button style={{ marginTop:24, background:"rgb(196 124 28)", color:"rgb(15 10 6)", fontFamily:"var(--font-inter)", fontSize:"0.7rem", letterSpacing:"0.2em", textTransform:"uppercase", padding:"16px 48px", borderRadius:10, border:"none", cursor:"pointer", fontWeight:600, width:"100%" }}>
            Verbindlich reservieren →
          </button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"rgb(26 16 8)", borderTop:"1px solid rgba(60,32,16,0.8)", padding:"40px 5%", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:"1.1rem", fontWeight:500, letterSpacing:"0.06em" }}>Münchener Löwenbräu</span>
        <div style={{ textAlign:"right" }}>
          <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.65rem", color:"rgb(140 100 70)", marginBottom:4 }}>Mittelstraße 144 · 32657 Lemgo</p>
          <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.65rem", color:"rgb(140 100 70)" }}>05261 4267 · Mi–So: 11:30–22:30</p>
        </div>
      </footer>
    </div>
  );
}
