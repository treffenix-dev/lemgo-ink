"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const MENU = [
  ["Ćevapčići 10 Stück", "Ajvar · Zwiebeln · Fladenbrot", "12,90"],
  ["Mixed Grill Platte",  "Ćevapčići · Pljeskavica · Spieß", "18,90"],
  ["Rumpsteak 250g",      "Kräuterbutter · Pommes · Salat",  "22,90"],
  ["T-Bone Steak 400g",   "Holzkohlegrill · Beilagen",        "28,90"],
  ["Wiener Schnitzel",    "Vom Kalb · Pommes · Preiselbeeren","16,90"],
  ["Balkan-Teller für 2", "Das Beste beider Welten",          "32,00"],
];

function GlowOrb({ style }: { style: React.CSSProperties }) {
  return (
    <div style={{
      position: "absolute",
      borderRadius: "50%",
      filter: "blur(80px)",
      pointerEvents: "none",
      opacity: 0.35,
      ...style,
    }} />
  );
}

function RedParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.2,
      dy: -Math.random() * 0.3 - 0.05,
      alpha: Math.random() * 0.6 + 0.15,
      pulse: Math.random() * Math.PI * 2,
    }));
    let raf: number;
    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach(p => {
        p.pulse += 0.02;
        const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,80,60,${a})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.y < -5) { p.y = canvas!.height + 5; p.x = Math.random() * canvas!.width; }
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }} />;
}

export default function AbendrotTheme() {
  const m = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.97]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <div ref={containerRef} style={{ background:"rgb(20 10 12)", color:"rgb(250 238 232)", fontFamily:"var(--font-cormorant), Georgia, serif", overflowX:"hidden", position:"relative" }}>
      <RedParticles />

      {/* Ambient orbs */}
      <GlowOrb style={{ width:600, height:600, background:"rgb(196 72 60)", top:-200, right:-100 }} />
      <GlowOrb style={{ width:400, height:400, background:"rgb(140 40 30)", bottom:"30%", left:-150 }} />

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", justifyContent:"space-between", alignItems:"center", padding: m ? "0 4%" : "0 5%", height:72 }}>
        <div style={{ background:"rgba(20,10,12,0.8)", backdropFilter:"blur(20px)", border:"1px solid rgba(196,72,60,0.2)", borderRadius:2, padding: m ? "8px 14px" : "10px 24px", display:"flex", alignItems:"center", gap: m ? 10 : 16 }}>
          <div style={{ width:6, height:6, background:"rgb(220 100 80)", borderRadius:"50%", boxShadow:"0 0 10px rgba(220,100,80,0.8)" }} />
          <span style={{ fontSize: m ? "0.65rem" : "0.9rem", fontWeight:300, letterSpacing: m ? "0.14em" : "0.24em", textTransform:"uppercase" }}>Löwenbräu · Lemgo</span>
        </div>
        <a href="#reservierung" style={{ background:"rgba(196,72,60,0.15)", border:"1px solid rgba(196,72,60,0.4)", color:"rgb(220 100 80)", fontFamily:"var(--font-inter)", fontSize: m ? "0.55rem" : "0.65rem", letterSpacing: m ? "0.14em" : "0.22em", textTransform:"uppercase", padding: m ? "8px 14px" : "10px 24px", textDecoration:"none" }}>
          Reservieren
        </a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:1, textAlign:"center", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"url(https://img02.restaurantguru.com/c689-Restaurant-Munchner-Lowenbrau-interior.jpg)", backgroundSize:"cover", backgroundPosition:"center", filter:"brightness(0.15) saturate(1.3) hue-rotate(-5deg)" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center, transparent 20%, rgb(20 10 12) 75%)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 50%, rgb(20 10 12))" }} />

        <motion.div style={{ y: heroY, scale: heroScale, opacity: heroOpacity, position:"relative", zIndex:2, padding: m ? "0 6%" : "0" }}>
          <motion.p initial={{ opacity:0, letterSpacing:"0.8em" }} animate={{ opacity:1, letterSpacing:"0.45em" }} transition={{ duration:1.5 }}
            style={{ fontFamily:"var(--font-inter)", fontSize: m ? "0.5rem" : "0.6rem", letterSpacing:"0.45em", textTransform:"uppercase", color:"rgb(196 72 60)", marginBottom: m ? 24 : 40 }}>
            Seit über 50 Jahren · Lemgo
          </motion.p>

          <div style={{ overflow:"hidden", marginBottom:4 }}>
            <motion.h1 initial={{ y:120, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:1.3, ease:[0.22,1,0.36,1] }}
              style={{ fontSize:"clamp(2.8rem,12vw,10.5rem)", fontWeight:300, lineHeight:0.9, margin:0, letterSpacing:"0.01em" }}>
              Münchener
            </motion.h1>
          </div>
          <div style={{ overflow:"hidden", marginBottom: m ? 24 : 40 }}>
            <motion.h1 initial={{ y:120, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:1.3, delay:0.12, ease:[0.22,1,0.36,1] }}
              style={{ fontSize:"clamp(2.8rem,12vw,10.5rem)", fontWeight:300, lineHeight:0.9, margin:0, letterSpacing:"0.01em", color:"rgb(220 100 80)", fontStyle:"italic",
                       textShadow:"0 0 60px rgba(220,80,60,0.5), 0 0 120px rgba(196,72,60,0.25)" }}>
              Löwenbräu
            </motion.h1>
          </div>

          <motion.div initial={{ opacity:0, scaleX:0 }} animate={{ opacity:1, scaleX:1 }} transition={{ delay:0.6, duration:0.8 }}
            style={{ width:80, height:1, background:"linear-gradient(to right, transparent, rgb(196 72 60), transparent)", margin:"0 auto 32px" }} />

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
            style={{ fontFamily:"var(--font-inter)", fontSize: m ? "0.58rem" : "0.72rem", letterSpacing:"0.28em", textTransform:"uppercase", color:"rgb(160 100 92)", marginBottom: m ? 36 : 52 }}>
            Balkan · Deutsche Küche · Lemgo
          </motion.p>

          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:1 }}
            style={{ display:"flex", justifyContent:"center", gap: m ? 12 : 16, flexWrap:"wrap" }}>
            <a href="#reservierung" style={{ fontFamily:"var(--font-inter)", fontSize: m ? "0.6rem" : "0.68rem", letterSpacing: m ? "0.16em" : "0.24em", textTransform:"uppercase", border:"1px solid rgba(220,100,80,0.5)", color:"rgb(220 100 80)", padding: m ? "12px 28px" : "16px 44px", textDecoration:"none", boxShadow:"0 0 24px rgba(196,72,60,0.15)" }}>
              Tisch reservieren
            </a>
            <a href="#speisekarte" style={{ fontFamily:"var(--font-inter)", fontSize: m ? "0.6rem" : "0.68rem", letterSpacing: m ? "0.14em" : "0.24em", textTransform:"uppercase", color:"rgba(250,238,232,0.4)", padding: m ? "12px 20px" : "16px 32px", textDecoration:"none" }}>
              Speisekarte ↓
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom stats */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}
          style={{ position:"absolute", bottom: m ? 24 : 48, left:0, right:0, display:"flex", justifyContent:"center", gap: m ? 32 : 64, zIndex:2 }}>
          {[["4,8 ★","Google Bewertung"],["347","Rezensionen"],["50+","Jahre"]].map(([n,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontSize: m ? "1.3rem" : "2rem", fontWeight:300, color:"rgb(220 100 80)", lineHeight:1, textShadow:"0 0 20px rgba(196,72,60,0.5)" }}>{n}</div>
              <div style={{ fontFamily:"var(--font-inter)", fontSize: m ? "0.45rem" : "0.55rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgb(160 100 92)", marginTop:5 }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* MENU */}
      <section id="speisekarte" style={{ position:"relative", zIndex:1, padding: m ? "60px 0" : "100px 0" }}>
        <div style={{ padding:"0 5%", marginBottom: m ? 36 : 64 }}>
          <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:20 }}>
              <div style={{ width:40, height:1, background:"rgb(196 72 60)", boxShadow:"0 0 12px rgba(196,72,60,0.6)" }} />
              <span style={{ fontFamily:"var(--font-inter)", fontSize:"0.55rem", letterSpacing:"0.32em", textTransform:"uppercase", color:"rgb(196 72 60)" }}>Unsere Speisen</span>
            </div>
            <h2 style={{ fontSize:"clamp(2rem,7vw,6rem)", fontWeight:300, letterSpacing:"0.02em", lineHeight:0.95 }}>Speisekarte</h2>
          </motion.div>
        </div>

        {MENU.map(([name, desc, price], i) => (
          <motion.div key={name}
            initial={{ opacity:0, x: i%2===0 ? -40 : 40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            transition={{ duration:0.8, delay:i*0.07 }}
            whileHover={{ backgroundColor:"rgba(196,72,60,0.06)" }}
            style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding: m ? "20px 5%" : "28px 5%", borderBottom:"1px solid rgba(80,24,28,0.6)", transition:"background-color 0.3s ease", cursor:"default", flexWrap: m ? "wrap" : "nowrap", gap: m ? 8 : 0 }}>
            <div style={{ flex: m ? "1 0 70%" : "auto" }}>
              <div style={{ fontSize: m ? "1.2rem" : "1.5rem", fontWeight:300, letterSpacing:"0.02em", marginBottom:3 }}>{name}</div>
              <div style={{ fontFamily:"var(--font-inter)", fontSize: m ? "0.62rem" : "0.7rem", color:"rgb(160 100 92)", letterSpacing:"0.1em" }}>{desc}</div>
            </div>
            <div style={{ fontSize: m ? "1.5rem" : "2rem", fontWeight:300, color:"rgb(220 100 80)", textShadow:"0 0 20px rgba(196,72,60,0.3)", flexShrink:0, marginLeft: m ? 0 : 32 }}>
              {price} <span style={{ fontSize: m ? "0.9rem" : "1.1rem" }}>€</span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* RESERVATION */}
      <section id="reservierung" style={{ position:"relative", zIndex:1, padding: m ? "60px 5%" : "100px 5%" }}>
        <div style={{ maxWidth:640, margin:"0 auto", border:"1px solid rgba(80,24,28,0.6)", padding: m ? "36px 24px" : "60px 48px", background:"rgba(34,14,18,0.6)", backdropFilter:"blur(12px)" }}>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:28 }}>
              <div style={{ width:32, height:1, background:"rgb(196 72 60)", boxShadow:"0 0 12px rgba(196,72,60,0.6)" }} />
              <span style={{ fontFamily:"var(--font-inter)", fontSize:"0.55rem", letterSpacing:"0.32em", textTransform:"uppercase", color:"rgb(196 72 60)" }}>Tisch reservieren</span>
            </div>
            <h2 style={{ fontSize: m ? "2rem" : "2.8rem", fontWeight:300, marginBottom: m ? 24 : 36, lineHeight:1 }}>Ihr Abend<br />bei uns</h2>
            <div style={{ display:"grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: m ? 12 : 16, marginBottom:16 }}>
              {["Name","Telefon","Datum","Personen"].map(f => (
                <input key={f} placeholder={f} style={{ background:"rgba(20,10,12,0.6)", border:"1px solid rgba(80,24,28,0.8)", padding:"14px 16px", color:"rgb(250 238 232)", fontFamily:"var(--font-cormorant)", fontSize:"1rem", outline:"none" }} />
              ))}
            </div>
            <button style={{ width:"100%", background:"rgb(196 72 60)", border:"none", color:"rgb(250 238 232)", fontFamily:"var(--font-inter)", fontSize:"0.68rem", letterSpacing:"0.24em", textTransform:"uppercase", padding:"16px", cursor:"pointer", boxShadow:"0 4px 24px rgba(196,72,60,0.3)" }}>
              Verbindlich reservieren →
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(80,24,28,0.6)", padding: m ? "28px 5%" : "48px 5%", display:"flex", flexDirection: m ? "column" : "row", justifyContent:"space-between", alignItems: m ? "flex-start" : "center", gap: m ? 12 : 0 }}>
        <div>
          <div style={{ fontSize: m ? "1rem" : "1.2rem", fontWeight:300, letterSpacing:"0.12em", marginBottom:5, color:"rgb(220 100 80)", textShadow:"0 0 20px rgba(196,72,60,0.4)" }}>Münchener Löwenbräu</div>
          <div style={{ fontFamily:"var(--font-inter)", fontSize:"0.6rem", color:"rgb(160 100 92)", letterSpacing:"0.1em" }}>Mittelstraße 144 · 32657 Lemgo</div>
        </div>
        <div style={{ fontFamily:"var(--font-inter)", fontSize:"0.6rem", color:"rgb(160 100 92)", letterSpacing:"0.1em", textAlign: m ? "left" : "right", lineHeight:1.8 }}>
          <div>05261 4267</div>
          <div>Mi–So: 11:30–14:00 & 17:00–22:30</div>
        </div>
      </footer>
    </div>
  );
}
