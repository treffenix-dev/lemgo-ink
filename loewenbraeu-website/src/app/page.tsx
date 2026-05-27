"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

/* ── 1: Dark Luxury — Editorial, links-ausgerichtet ── */
function PreviewDefault() {
  return (
    <div style={{ background:"#06080F", width:"100%", aspectRatio:"3/4", overflow:"hidden", fontFamily:"Georgia,serif", position:"relative" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"url(https://img02.restaurantguru.com/c2d3-Restaurant-Munchner-Lowenbrau-food.jpg)", backgroundSize:"cover", filter:"brightness(0.1)", transform:"scale(1.05)" }} />
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, #06080F 45%, transparent)" }} />
      <div style={{ position:"relative", padding:"14px 12px", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center" }}>
        <div style={{ width:20, height:1, background:"#D4A840", marginBottom:10 }} />
        <div style={{ color:"#5A6580", fontSize:4.5, letterSpacing:"0.4em", textTransform:"uppercase", marginBottom:6 }}>Seit über 50 Jahren</div>
        <div style={{ color:"#EDE9DF", fontSize:16, fontWeight:300, lineHeight:0.95, marginBottom:2 }}>Münchener</div>
        <div style={{ color:"#D4A840", fontSize:20, fontStyle:"italic", lineHeight:0.95, marginBottom:10 }}>Löwenbräu</div>
        <div style={{ color:"#5A6580", fontSize:4, letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:14 }}>Balkan & Deutsche Küche</div>
        <div style={{ border:"1px solid rgba(237,233,223,0.25)", color:"#EDE9DF", fontSize:4, letterSpacing:"0.2em", textTransform:"uppercase", padding:"5px 10px", width:"fit-content", marginBottom:18 }}>
          Tisch reservieren
        </div>
        {/* Menü-Liste */}
        {[["Ćevapčići","12,90 €"],["Rumpsteak","22,90 €"],["Schnitzel","16,90 €"]].map(([n,p]) => (
          <div key={n} style={{ display:"flex", justifyContent:"space-between", borderBottom:"1px solid rgba(26,34,64,0.7)", padding:"3px 0" }}>
            <span style={{ color:"#EDE9DF", fontSize:5, opacity:0.7 }}>{n}</span>
            <span style={{ color:"#D4A840", fontSize:5 }}>{p}</span>
          </div>
        ))}
        {/* Stats rechts unten */}
        <div style={{ position:"absolute", bottom:12, right:12, textAlign:"right" }}>
          <div style={{ color:"#D4A840", fontSize:10, fontWeight:300 }}>4,8★</div>
          <div style={{ color:"#5A6580", fontSize:3.5, letterSpacing:"0.15em", textTransform:"uppercase" }}>Google</div>
        </div>
      </div>
    </div>
  );
}

/* ── 2: Rustikales Bayern — Split-Screen ── */
function PreviewRustic() {
  return (
    <div style={{ background:"#0F0A06", width:"100%", aspectRatio:"3/4", overflow:"hidden", fontFamily:"Georgia,serif", display:"grid", gridTemplateColumns:"1fr 1fr" }}>
      {/* Bild-Hälfte */}
      <div style={{ position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"url(https://img02.restaurantguru.com/c2d3-Restaurant-Munchner-Lowenbrau-food.jpg)", backgroundSize:"cover", filter:"brightness(0.55) saturate(0.8) sepia(0.3)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, transparent 60%, #0F0A06)" }} />
        {/* Badge */}
        <div style={{ position:"absolute", bottom:8, left:6, background:"rgba(15,10,6,0.88)", border:"1px solid rgba(218,150,42,0.35)", borderRadius:4, padding:"4px 7px" }}>
          <div style={{ color:"#DA962A", fontSize:7, fontWeight:500 }}>4,8 ★</div>
          <div style={{ color:"#8C6446", fontSize:3.5, letterSpacing:"0.1em" }}>347 Reviews</div>
        </div>
      </div>
      {/* Text-Hälfte */}
      <div style={{ padding:"12px 10px 12px 6px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
        <div style={{ width:24, height:2, background:"#DA962A", borderRadius:1, marginBottom:8 }} />
        <div style={{ color:"#F0E4D2", fontSize:9, fontWeight:500, lineHeight:1, marginBottom:2 }}>Münch-<br/>ener</div>
        <div style={{ color:"#DA962A", fontSize:11, fontStyle:"italic", lineHeight:1, marginBottom:8 }}>Löwen-<br/>bräu</div>
        <div style={{ color:"#8C6446", fontSize:4, lineHeight:1.5, marginBottom:10 }}>Balkan &<br/>Deutsche<br/>Küche</div>
        {/* Karten */}
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

/* ── 3: Modern Hell — Bold Swiss Grid ── */
function PreviewLight() {
  return (
    <div style={{ background:"#FAF9F7", width:"100%", aspectRatio:"3/4", overflow:"hidden", fontFamily:"sans-serif", padding:"12px" }}>
      {/* Nav */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #DCD7CD", paddingBottom:7, marginBottom:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:"#A06E14" }} />
          <span style={{ fontSize:5, fontWeight:700, color:"#1E1C1A", letterSpacing:"0.01em" }}>Löwenbräu</span>
        </div>
        <div style={{ background:"#1E1C1A", borderRadius:3, padding:"2px 7px" }}>
          <span style={{ color:"#FAF9F7", fontSize:3.5, fontWeight:600, letterSpacing:"0.1em" }}>TISCH</span>
        </div>
      </div>
      {/* Bold headline */}
      <div style={{ marginBottom:10 }}>
        <div style={{ fontSize:22, fontWeight:700, lineHeight:0.88, color:"#1E1C1A", letterSpacing:"-0.03em" }}>Münch-</div>
        <div style={{ fontSize:22, fontWeight:300, lineHeight:0.88, color:"#A06E14", fontStyle:"italic", fontFamily:"Georgia,serif", letterSpacing:"-0.02em" }}>ener</div>
        <div style={{ fontSize:18, fontWeight:700, lineHeight:0.88, color:"#1E1C1A", letterSpacing:"-0.03em" }}>Löwen-</div>
        <div style={{ fontSize:18, fontWeight:700, lineHeight:0.88, color:"#1E1C1A", letterSpacing:"-0.03em" }}>bräu</div>
      </div>
      {/* Stats bar */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderTop:"1px solid #DCD7CD", borderBottom:"1px solid #DCD7CD", padding:"6px 0", marginBottom:10 }}>
        {[["4,8","Rating"],["347","Reviews"],["50+","Jahre"]].map(([n,l],i) => (
          <div key={l} style={{ textAlign:i===0?"left":"center", borderRight: i<2 ? "1px solid #DCD7CD" : "none", paddingLeft: i>0 ? 4 : 0 }}>
            <div style={{ fontSize:9, fontWeight:700, color:"#1E1C1A" }}>{n}</div>
            <div style={{ fontSize:3.5, color:"#787064", textTransform:"uppercase", letterSpacing:"0.1em" }}>{l}</div>
          </div>
        ))}
      </div>
      {/* Menu 3-spalten */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:4 }}>
        {[["Balkan",["Ćevapčići","Mixed Grill"]],["Steaks",["Rumpsteak","T-Bone"]],["Schnitzel",["Wiener","Jäger"]]].map(([cat, items]) => (
          <div key={cat as string} style={{ background:"#F0EEE9", padding:"5px" }}>
            <div style={{ fontSize:3.5, fontWeight:700, color:"#A06E14", textTransform:"uppercase", letterSpacing:"0.1em", borderBottom:"1px solid #DCD7CD", paddingBottom:3, marginBottom:4 }}>{cat}</div>
            {(items as string[]).map(i => <div key={i} style={{ fontSize:4, color:"#1E1C1A", marginBottom:2 }}>{i}</div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 4: Abendrot — Cinematic Fullscreen ── */
function PreviewAbendrot() {
  return (
    <div style={{ background:"#140A0C", width:"100%", aspectRatio:"3/4", overflow:"hidden", fontFamily:"Georgia,serif", position:"relative" }}>
      {/* Background */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"url(https://img02.restaurantguru.com/c689-Restaurant-Munchner-Lowenbrau-interior.jpg)", backgroundSize:"cover", filter:"brightness(0.15) saturate(1.2) hue-rotate(-5deg)" }} />
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center, transparent 20%, #140A0C 80%)" }} />
      {/* Glow orbs */}
      <div style={{ position:"absolute", top:-30, right:-30, width:80, height:80, borderRadius:"50%", background:"#C44840", filter:"blur(40px)", opacity:0.4 }} />
      <div style={{ position:"absolute", bottom:"20%", left:-20, width:60, height:60, borderRadius:"50%", background:"#8C2820", filter:"blur(30px)", opacity:0.3 }} />
      {/* Content centered */}
      <div style={{ position:"relative", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"12px" }}>
        <div style={{ color:"#C44840", fontSize:4, letterSpacing:"0.45em", textTransform:"uppercase", marginBottom:14 }}>Seit über 50 Jahren</div>
        {/* Divider */}
        <div style={{ width:40, height:1, background:"linear-gradient(to right, transparent, #C44840, transparent)", marginBottom:14 }} />
        <div style={{ color:"#FAF0E1", fontSize:16, fontWeight:300, lineHeight:0.9, marginBottom:2 }}>Münchener</div>
        <div style={{ color:"#DC6450", fontSize:20, fontStyle:"italic", lineHeight:0.9, marginBottom:14, textShadow:"0 0 20px rgba(196,72,60,0.6)" }}>Löwenbräu</div>
        <div style={{ color:"#A07858", fontSize:4, letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:16 }}>Balkan · Deutsche Küche</div>
        <div style={{ border:"1px solid rgba(220,100,80,0.5)", color:"#DC6450", fontSize:4, letterSpacing:"0.22em", textTransform:"uppercase", padding:"5px 14px", marginBottom:18 }}>
          Tisch reservieren
        </div>
        {/* Menü-Rows */}
        {[["Ćevapčići","12,90 €"],["Rumpsteak","22,90 €"],["Schnitzel","16,90 €"]].map(([n,p],i) => (
          <div key={n} style={{ display:"flex", justifyContent:"space-between", width:"100%", padding:"3px 0", borderBottom: i<2 ? "1px solid rgba(80,24,28,0.5)" : "none" }}>
            <span style={{ color:"#FAF0E1", fontSize:5, opacity:0.75 }}>{n}</span>
            <span style={{ color:"#DC6450", fontSize:5, textShadow:"0 0 8px rgba(196,72,60,0.4)" }}>{p}</span>
          </div>
        ))}
        {/* Stats */}
        <div style={{ display:"flex", gap:16, marginTop:14 }}>
          {[["4,8★","Google"],["50+","Jahre"]].map(([n,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ color:"#DC6450", fontSize:8, textShadow:"0 0 12px rgba(196,72,60,0.5)" }}>{n}</div>
              <div style={{ color:"#A07858", fontSize:3.5, letterSpacing:"0.15em", textTransform:"uppercase" }}>{l}</div>
            </div>
          ))}
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
