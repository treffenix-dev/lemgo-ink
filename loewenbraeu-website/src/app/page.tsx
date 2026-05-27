"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

/* ── 1: Dark Luxury — Foto oben, Editorial-Text unten ── */
function PreviewDefault() {
  return (
    <div style={{ background:"#06080F", width:"100%", aspectRatio:"3/4", overflow:"hidden", fontFamily:"Georgia,serif", display:"flex", flexDirection:"column" }}>
      {/* Foto-Bereich (58% der Höhe) */}
      <div style={{ position:"relative", flex:"0 0 58%" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"url(https://img02.restaurantguru.com/c2d3-Restaurant-Munchner-Lowenbrau-food.jpg)", backgroundSize:"cover", backgroundPosition:"center", filter:"brightness(0.65) saturate(1.1)" }} />
        {/* Subtiler Vignette-Overlay */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(6,8,15,0.15) 0%, rgba(6,8,15,0.7) 100%)" }} />
        {/* Gold-Linie oben */}
        <div style={{ position:"absolute", top:10, left:12, right:12, height:1, background:"linear-gradient(to right, #D4A840, transparent)" }} />
        {/* Overlay-Text auf Foto */}
        <div style={{ position:"absolute", bottom:10, left:12 }}>
          <div style={{ color:"#D4A840", fontSize:3.5, letterSpacing:"0.35em", textTransform:"uppercase", marginBottom:4 }}>Seit 1970 · Lemgo</div>
          <div style={{ color:"#EDE9DF", fontSize:13, fontWeight:300, lineHeight:0.95 }}>Münchener</div>
          <div style={{ color:"#D4A840", fontSize:17, fontStyle:"italic", lineHeight:0.95 }}>Löwenbräu</div>
        </div>
        {/* Stars badge oben rechts */}
        <div style={{ position:"absolute", top:10, right:10, background:"rgba(6,8,15,0.75)", border:"1px solid rgba(212,168,64,0.4)", padding:"3px 6px" }}>
          <span style={{ color:"#D4A840", fontSize:5, fontWeight:300 }}>4,8 ★</span>
        </div>
      </div>
      {/* Text-Bereich (42%) */}
      <div style={{ flex:1, padding:"10px 12px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
        <div style={{ color:"#4A5270", fontSize:3.5, letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:8 }}>Balkan & Deutsche Küche</div>
        {[["Ćevapčići","12,90 €"],["Rumpsteak","22,90 €"],["Schnitzel","16,90 €"]].map(([n,p]) => (
          <div key={n} style={{ display:"flex", justifyContent:"space-between", borderBottom:"1px solid rgba(212,168,64,0.12)", padding:"4px 0" }}>
            <span style={{ color:"#C8C4BC", fontSize:4.5 }}>{n}</span>
            <span style={{ color:"#D4A840", fontSize:4.5 }}>{p}</span>
          </div>
        ))}
        <div style={{ marginTop:8, border:"1px solid rgba(237,233,223,0.2)", color:"#EDE9DF", fontSize:3.5, letterSpacing:"0.2em", textTransform:"uppercase", padding:"4px 8px", width:"fit-content" }}>
          Reservieren →
        </div>
      </div>
    </div>
  );
}

/* ── 2: Rustikales Bayern — Split-Screen, helles Foto ── */
function PreviewRustic() {
  return (
    <div style={{ background:"#0F0A06", width:"100%", aspectRatio:"3/4", overflow:"hidden", fontFamily:"Georgia,serif", display:"grid", gridTemplateColumns:"1fr 1fr" }}>
      {/* Bild-Hälfte — deutlich sichtbar */}
      <div style={{ position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"url(https://img02.restaurantguru.com/c8/Restaurant-Munchener-Lowenbrau-food.jpg)", backgroundSize:"cover", backgroundPosition:"center", filter:"brightness(0.85) saturate(1.1) sepia(0.15)" }} />
        {/* Nur rechts Übergang zum Text */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, transparent 55%, #0F0A06 100%)" }} />
        {/* Amber-Overlay oben */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"#DA962A" }} />
        {/* Badge */}
        <div style={{ position:"absolute", bottom:8, left:6, background:"rgba(15,10,6,0.9)", border:"1px solid rgba(218,150,42,0.5)", borderRadius:3, padding:"4px 7px" }}>
          <div style={{ color:"#DA962A", fontSize:7, fontWeight:600 }}>4,8 ★</div>
          <div style={{ color:"#8C6446", fontSize:3.5, letterSpacing:"0.08em" }}>347 Bew.</div>
        </div>
      </div>
      {/* Text-Hälfte */}
      <div style={{ padding:"12px 10px 12px 6px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
        <div style={{ width:24, height:2, background:"#DA962A", borderRadius:1, marginBottom:8 }} />
        <div style={{ color:"#F0E4D2", fontSize:9, fontWeight:500, lineHeight:1, marginBottom:2 }}>Münch-<br/>ener</div>
        <div style={{ color:"#DA962A", fontSize:11, fontStyle:"italic", lineHeight:1, marginBottom:8 }}>Löwen-<br/>bräu</div>
        <div style={{ color:"#8C6446", fontSize:4, lineHeight:1.5, marginBottom:10 }}>Balkan &<br/>Deutsche<br/>Küche</div>
        {[["Ćevapčići","12,90"],["Rumpsteak","22,90"]].map(([n,p]) => (
          <div key={n} style={{ background:"#1A1008", border:"1px solid rgba(60,32,16,0.8)", borderRadius:4, padding:"4px 6px", marginBottom:4, display:"flex", justifyContent:"space-between" }}>
            <span style={{ color:"#F0E4D2", fontSize:4.5 }}>{n}</span>
            <span style={{ color:"#DA962A", fontSize:4.5 }}>{p} €</span>
          </div>
        ))}
        <div style={{ background:"#C47C1C", borderRadius:4, padding:"5px 8px", textAlign:"center", marginTop:4 }}>
          <span style={{ color:"#0F0A06", fontSize:4, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif", fontWeight:700 }}>Reservieren</span>
        </div>
      </div>
    </div>
  );
}

/* ── 3: Modern Hell — Foto-Hero + Swiss Grid ── */
function PreviewLight() {
  return (
    <div style={{ background:"#FAF9F7", width:"100%", aspectRatio:"3/4", overflow:"hidden", fontFamily:"sans-serif", display:"flex", flexDirection:"column" }}>
      {/* Nav */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #DCD7CD", padding:"7px 10px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:"#A06E14" }} />
          <span style={{ fontSize:5, fontWeight:700, color:"#1E1C1A" }}>Löwenbräu</span>
        </div>
        <div style={{ background:"#1E1C1A", borderRadius:3, padding:"2px 7px" }}>
          <span style={{ color:"#FAF9F7", fontSize:3.5, fontWeight:600, letterSpacing:"0.08em" }}>TISCH</span>
        </div>
      </div>
      {/* Prominentes Foto */}
      <div style={{ position:"relative", flex:"0 0 42%", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"url(https://img02.restaurantguru.com/c689-Restaurant-Munchner-Lowenbrau-interior.jpg)", backgroundSize:"cover", backgroundPosition:"center top", filter:"brightness(0.88) saturate(0.95)" }} />
        {/* Subtle bottom fade */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"40%", background:"linear-gradient(to bottom, transparent, #FAF9F7)" }} />
        {/* Schwebender Tag */}
        <div style={{ position:"absolute", bottom:7, left:10, background:"#FAF9F7", padding:"2px 8px", borderRadius:20 }}>
          <span style={{ fontSize:3.5, fontWeight:600, color:"#1E1C1A", letterSpacing:"0.08em" }}>50+ Jahre · Lemgo</span>
        </div>
      </div>
      {/* Text + Grid */}
      <div style={{ padding:"8px 10px", flex:1 }}>
        <div style={{ marginBottom:7 }}>
          <div style={{ fontSize:14, fontWeight:700, lineHeight:0.88, color:"#1E1C1A", letterSpacing:"-0.03em" }}>Münchener</div>
          <div style={{ fontSize:14, fontWeight:300, lineHeight:0.88, color:"#A06E14", fontStyle:"italic", fontFamily:"Georgia,serif" }}>Löwenbräu</div>
        </div>
        {/* Stats bar */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderTop:"1px solid #DCD7CD", borderBottom:"1px solid #DCD7CD", padding:"5px 0", marginBottom:7 }}>
          {[["4,8","Rating"],["347","Bew."],["50+","Jahre"]].map(([n,l],i) => (
            <div key={l} style={{ textAlign:"center", borderRight: i<2 ? "1px solid #DCD7CD" : "none" }}>
              <div style={{ fontSize:8, fontWeight:700, color:"#1E1C1A" }}>{n}</div>
              <div style={{ fontSize:3, color:"#787064", textTransform:"uppercase", letterSpacing:"0.08em" }}>{l}</div>
            </div>
          ))}
        </div>
        {/* Menu 3-spalten */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:3 }}>
          {[["Balkan",["Ćevapčići","Mixed Grill"]],["Steaks",["Rumpsteak","T-Bone"]],["Schnitzel",["Wiener","Jäger"]]].map(([cat, items]) => (
            <div key={cat as string} style={{ background:"#F0EEE9", padding:"4px" }}>
              <div style={{ fontSize:3, fontWeight:700, color:"#A06E14", textTransform:"uppercase", letterSpacing:"0.08em", borderBottom:"1px solid #DCD7CD", paddingBottom:2, marginBottom:3 }}>{cat}</div>
              {(items as string[]).map(i => <div key={i} style={{ fontSize:3.5, color:"#1E1C1A", marginBottom:1.5 }}>{i}</div>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 4: Abendrot — Foto oben (dramatisch), Text unten ── */
function PreviewAbendrot() {
  return (
    <div style={{ background:"#140A0C", width:"100%", aspectRatio:"3/4", overflow:"hidden", fontFamily:"Georgia,serif", display:"flex", flexDirection:"column" }}>
      {/* Foto-Bereich (55%) — deutlich sichtbar, dramatisch rot getönt */}
      <div style={{ position:"relative", flex:"0 0 55%" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"url(https://img02.restaurantguru.com/c689-Restaurant-Munchner-Lowenbrau-interior.jpg)", backgroundSize:"cover", backgroundPosition:"center", filter:"brightness(0.6) saturate(1.4) hue-rotate(-10deg)" }} />
        {/* Dramatischer unterer Fade */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at top, transparent 30%, rgba(20,10,12,0.5) 100%)" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"50%", background:"linear-gradient(to bottom, transparent, #140A0C)" }} />
        {/* Glow orb */}
        <div style={{ position:"absolute", top:-20, right:-20, width:70, height:70, borderRadius:"50%", background:"#C44840", filter:"blur(35px)", opacity:0.5 }} />
        {/* Eyebrow oben */}
        <div style={{ position:"absolute", top:10, left:0, right:0, display:"flex", justifyContent:"center" }}>
          <div style={{ color:"#C44840", fontSize:3.5, letterSpacing:"0.4em", textTransform:"uppercase" }}>Seit über 50 Jahren</div>
        </div>
        {/* Stars */}
        <div style={{ position:"absolute", top:10, right:10, color:"#DC6450", fontSize:6, textShadow:"0 0 10px rgba(196,72,60,0.7)" }}>4,8 ★</div>
      </div>
      {/* Text-Bereich (45%) */}
      <div style={{ flex:1, padding:"10px 12px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center" }}>
        <div style={{ width:32, height:1, background:"linear-gradient(to right, transparent, #C44840, transparent)", marginBottom:10 }} />
        <div style={{ color:"#FAF0E1", fontSize:14, fontWeight:300, lineHeight:0.9, marginBottom:2 }}>Münchener</div>
        <div style={{ color:"#DC6450", fontSize:18, fontStyle:"italic", lineHeight:0.9, marginBottom:10, textShadow:"0 0 16px rgba(196,72,60,0.6)" }}>Löwenbräu</div>
        <div style={{ color:"#A07858", fontSize:3.5, letterSpacing:"0.28em", textTransform:"uppercase", marginBottom:10 }}>Balkan · Deutsche Küche</div>
        {[["Ćevapčići","12,90 €"],["Rumpsteak","22,90 €"]].map(([n,p],i) => (
          <div key={n} style={{ display:"flex", justifyContent:"space-between", width:"100%", padding:"3px 0", borderBottom: i===0 ? "1px solid rgba(80,24,28,0.5)" : "none" }}>
            <span style={{ color:"#FAF0E1", fontSize:4.5, opacity:0.8 }}>{n}</span>
            <span style={{ color:"#DC6450", fontSize:4.5 }}>{p}</span>
          </div>
        ))}
        <div style={{ marginTop:10, border:"1px solid rgba(220,100,80,0.45)", color:"#DC6450", fontSize:3.5, letterSpacing:"0.22em", textTransform:"uppercase", padding:"4px 12px" }}>
          Tisch reservieren
        </div>
      </div>
    </div>
  );
}

const THEMES = [
  { id: "default",  name: "Dark Luxury",       tagline: "Editorial · Parallax · Gold",   dot: "#D4A840", Preview: PreviewDefault  },
  { id: "rustic",   name: "Rustikales Bayern",  tagline: "Split-Screen · Karten · Warm",  dot: "#DA962A", Preview: PreviewRustic   },
  { id: "light",    name: "Modern Hell",        tagline: "Swiss Grid · Bold Type · Clean", dot: "#A06E14", Preview: PreviewLight    },
  { id: "abendrot", name: "Abendrot",           tagline: "Cinematic · Glow · Dramatisch", dot: "#DC6450", Preview: PreviewAbendrot },
] as const;

export default function SelectPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: "#07060C", color: "#EDE9DF" }}>

      {/* Header */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}
        className="text-center mb-14">
        <div className="flex items-center justify-center gap-4 mb-5">
          <span className="block h-px w-10" style={{ background:"#D4A840" }} />
          <span style={{ fontSize:"0.58rem", letterSpacing:"0.4em", color:"#D4A840", textTransform:"uppercase", fontFamily:"var(--font-inter)" }}>
            Website-Präsentation
          </span>
          <span className="block h-px w-10" style={{ background:"#D4A840" }} />
        </div>
        <h1 style={{ fontFamily:"var(--font-cormorant)", fontWeight:300, fontSize:"clamp(1.9rem,4vw,2.9rem)", letterSpacing:"0.08em", lineHeight:1.1 }}>
          Münchener Löwenbräu
        </h1>
        <p style={{ marginTop:10, fontSize:"0.7rem", letterSpacing:"0.22em", color:"#5A6580", textTransform:"uppercase", fontFamily:"var(--font-inter)" }}>
          4 komplett verschiedene Website-Designs
        </p>
      </motion.div>

      {/* Theme cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-5xl">
        {THEMES.map(({ id, name, tagline, dot, Preview }, i) => (
          <motion.button key={id}
            initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.65, delay:0.1 + i*0.09, ease:[0.22,1,0.36,1] }}
            onClick={() => router.push(`/view?theme=${id}`)}
            className="group text-left">
            <div className="mb-4"
              style={{ borderRadius:12, overflow:"hidden", border:`1px solid ${dot}28`, boxShadow:"0 8px 32px rgba(0,0,0,0.55)", transition:"transform 0.3s ease, box-shadow 0.3s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow=`0 16px 48px rgba(0,0,0,0.7), 0 0 24px ${dot}20`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform="translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow="0 8px 32px rgba(0,0,0,0.55)"; }}>
              <Preview />
            </div>
            <div className="px-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background:dot }} />
                <span style={{ fontFamily:"var(--font-cormorant)", fontSize:"1rem", fontWeight:400, color:"#EDE9DF", letterSpacing:"0.04em" }}>
                  {name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontSize:"0.58rem", letterSpacing:"0.12em", color:"#5A6580", textTransform:"uppercase", fontFamily:"var(--font-inter)" }}>
                  {tagline}
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ fontSize:"0.68rem", color:dot, fontFamily:"var(--font-inter)" }}>→</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.65 }}
        style={{ marginTop:52, fontSize:"0.58rem", letterSpacing:"0.18em", color:"#3A3845", textTransform:"uppercase", fontFamily:"var(--font-inter)" }}>
        Entwurf · Noch kein eigener Webauftritt
      </motion.p>
    </div>
  );
}
