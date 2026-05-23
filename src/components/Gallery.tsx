"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";

const filters = ["ALLE", "BLACK & GREY", "REALISM", "DARK ART", "FINE LINE"];

/* ── Realistic Tattoo SVG Artwork ────────────────────────────────────────── */

const EyeSVG = () => (
  <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
    <defs>
      <radialGradient id="iris" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#111" />
        <stop offset="25%" stopColor="#1a1a2e" />
        <stop offset="65%" stopColor="#2d2d3a" />
        <stop offset="100%" stopColor="#3a3020" />
      </radialGradient>
      <radialGradient id="pupil" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#000" />
        <stop offset="80%" stopColor="#0a0a0a" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </radialGradient>
      <filter id="softshadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    {/* Skin shading around eye */}
    <ellipse cx="100" cy="105" rx="85" ry="55" fill="#1a1a1a" opacity="0.6"/>
    <ellipse cx="100" cy="103" rx="78" ry="45" fill="#151515" opacity="0.4"/>
    {/* Eyeball white */}
    <path d="M22 102 Q60 62 100 60 Q140 62 178 102 Q140 142 100 144 Q60 142 22 102 Z" fill="#e8e0d5" opacity="0.92"/>
    {/* Iris */}
    <ellipse cx="100" cy="102" rx="32" ry="32" fill="url(#iris)"/>
    {/* Iris texture rays */}
    {Array.from({length: 20}, (_, i) => {
      const angle = (i / 20) * Math.PI * 2;
      return (
        <line key={i}
          x1={100 + Math.cos(angle) * 14} y1={102 + Math.sin(angle) * 14}
          x2={100 + Math.cos(angle) * 30} y2={102 + Math.sin(angle) * 30}
          stroke="#4a3820" strokeWidth="0.8" opacity="0.5"/>
      );
    })}
    {/* Pupil */}
    <ellipse cx="100" cy="102" rx="13" ry="13" fill="url(#pupil)"/>
    {/* Main catchlight */}
    <ellipse cx="108" cy="94" rx="5" ry="4" fill="white" opacity="0.88" transform="rotate(-25, 108, 94)"/>
    <ellipse cx="92" cy="108" rx="2" ry="1.5" fill="white" opacity="0.35"/>
    {/* Upper eyelid shadow */}
    <path d="M22 102 Q60 62 100 60 Q140 62 178 102" stroke="#1a1a1a" strokeWidth="3.5" fill="none" opacity="0.9"/>
    <path d="M25 101 Q60 65 100 63 Q140 65 175 101" stroke="#111" strokeWidth="2" fill="none" opacity="0.5"/>
    {/* Lower lid */}
    <path d="M22 102 Q60 142 100 144 Q140 142 178 102" stroke="#2a2520" strokeWidth="1.8" fill="none" opacity="0.6"/>
    {/* Upper eyelashes */}
    {[
      {sx:48,sy:73,ex:40,ey:59}, {sx:58,sy:68,ex:52,ey:53}, {sx:70,sy:64,ex:67,ey:48},
      {sx:83,sy:62,ex:83,ey:46}, {sx:96,sy:61,ex:97,ey:45}, {sx:109,sy:62,ex:111,ey:46},
      {sx:121,sy:64,ex:124,ey:49}, {sx:132,sy:67,ex:138,ey:53}, {sx:143,sy:72,ex:150,ey:58},
      {sx:152,sy:79,ex:160,ey:67},
    ].map((l, i) => (
      <path key={i} d={`M${l.sx} ${l.sy} C${(l.sx+l.ex)/2} ${(l.sy+l.ey)/2+3} ${l.ex-2} ${l.ey+4} ${l.ex} ${l.ey}`}
        stroke="#0d0d0d" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
    ))}
    {/* Lower lashes */}
    {[
      {sx:50,sy:128,ex:46,ey:136}, {sx:68,sy:134,ex:66,ey:143}, {sx:88,sy:137,ex:88,ey:147},
      {sx:110,sy:137,ex:112,ey:146}, {sx:132,sy:133,ex:136,ey:141}, {sx:150,sy:127,ex:155,ey:134},
    ].map((l, i) => (
      <line key={i} x1={l.sx} y1={l.sy} x2={l.ex} y2={l.ey} stroke="#222" strokeWidth="1.2" strokeLinecap="round"/>
    ))}
    {/* Eyebrow */}
    <path d="M32 65 Q60 48 100 46 Q140 48 167 58" stroke="#111" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.85"/>
    <path d="M35 63 Q62 47 100 45 Q138 47 164 56" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
    {/* Fine brow hairs */}
    {Array.from({length: 14}, (_, i) => {
      const t  = i / 13;
      const bx = 35 + t * 128;
      const by = 63 - 18 * Math.sin(t * Math.PI);
      return <line key={i} x1={bx} y1={by} x2={bx + 3 * (t - 0.5)} y2={by - 5} stroke="#111" strokeWidth="0.9" opacity="0.7"/>;
    })}
  </svg>
);

const WolfSVG = () => (
  <svg viewBox="0 0 200 220" fill="none" className="w-full h-full">
    <defs>
      <radialGradient id="wolfface" cx="50%" cy="48%" r="50%">
        <stop offset="0%" stopColor="#404040"/>
        <stop offset="60%" stopColor="#252525"/>
        <stop offset="100%" stopColor="#0d0d0d"/>
      </radialGradient>
      <radialGradient id="wolfeye" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#c8a820"/>
        <stop offset="40%" stopColor="#8a6a10"/>
        <stop offset="100%" stopColor="#2a1a00"/>
      </radialGradient>
    </defs>
    {/* Head base */}
    <path d="M100 15 L72 22 L48 38 L36 62 L32 90 L38 118 L52 138 L72 152 L100 160 L128 152 L148 138 L162 118 L168 90 L164 62 L152 38 L128 22 Z"
      fill="url(#wolfface)" stroke="#1a1a1a" strokeWidth="1.5"/>
    {/* Left ear */}
    <path d="M68 22 L52 2 L44 25 L62 30 Z" fill="#1a1a1a" stroke="#111" strokeWidth="1.2"/>
    <path d="M66 21 L54 6 L47 24 Z" fill="#2d1a1a" opacity="0.7"/>
    {/* Right ear */}
    <path d="M132 22 L148 2 L156 25 L138 30 Z" fill="#1a1a1a" stroke="#111" strokeWidth="1.2"/>
    <path d="M134 21 L146 6 L153 24 Z" fill="#2d1a1a" opacity="0.7"/>
    {/* Fur texture lines - forehead */}
    {[[95,32,100,20],[100,30,104,18],[105,32,109,21],[90,36,88,23],[110,36,112,23]].map(([x1,y1,x2,y2],i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#555" strokeWidth="0.8" opacity="0.6"/>
    ))}
    {/* Muzzle */}
    <path d="M72 118 Q100 130 128 118 L132 105 Q100 115 68 105 Z" fill="#2a2a2a" opacity="0.9"/>
    <path d="M80 118 Q100 125 120 118" stroke="#444" strokeWidth="1" fill="none"/>
    {/* Nose */}
    <path d="M86 100 Q100 94 114 100 Q110 112 100 114 Q90 112 86 100 Z" fill="#111" stroke="#333" strokeWidth="1.5"/>
    <path d="M88 103 Q100 98 112 103" stroke="#444" strokeWidth="0.8" fill="none"/>
    <ellipse cx="91" cy="99" rx="4" ry="3" fill="#0a0a0a"/>
    <ellipse cx="109" cy="99" rx="4" ry="3" fill="#0a0a0a"/>
    <ellipse cx="90" cy="97" rx="1.5" ry="1" fill="#555" opacity="0.6"/>
    {/* Left eye */}
    <ellipse cx="70" cy="78" rx="14" ry="11" fill="#111" stroke="#333" strokeWidth="1.5"/>
    <ellipse cx="70" cy="78" rx="10" ry="8" fill="url(#wolfeye)"/>
    <ellipse cx="70" cy="78" rx="5" ry="5" fill="#050505"/>
    <ellipse cx="74" cy="74" rx="2.5" ry="2" fill="white" opacity="0.75"/>
    {/* Right eye */}
    <ellipse cx="130" cy="78" rx="14" ry="11" fill="#111" stroke="#333" strokeWidth="1.5"/>
    <ellipse cx="130" cy="78" rx="10" ry="8" fill="url(#wolfeye)"/>
    <ellipse cx="130" cy="78" rx="5" ry="5" fill="#050505"/>
    <ellipse cx="134" cy="74" rx="2.5" ry="2" fill="white" opacity="0.75"/>
    {/* Fur details - cheeks */}
    {[
      [38,82,28,76],[40,92,29,88],[42,102,30,100],[44,110,32,110],
      [162,82,172,76],[160,92,171,88],[158,102,170,100],[156,110,168,110],
    ].map(([x1,y1,x2,y2],i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3a3a3a" strokeWidth="1" opacity="0.7"/>
    ))}
    {/* Whiskers */}
    {[[80,112,42,106],[80,114,44,114],[80,116,44,122],[120,112,158,106],[120,114,156,114],[120,116,156,122]].map(([x1,y1,x2,y2],i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#666" strokeWidth="0.7" opacity="0.5"/>
    ))}
    {/* Fur texture - body */}
    {Array.from({length: 20}, (_, i) => {
      const angle = -Math.PI/2 + (i/20) * Math.PI;
      const r1 = 50 + Math.random()*10;
      const r2 = r1 + 12;
      const cx = 100, cy = 95;
      return <line key={`f${i}`}
        x1={cx + Math.cos(angle)*r1} y1={cy + Math.sin(angle)*r1*0.9}
        x2={cx + Math.cos(angle)*r2} y2={cy + Math.sin(angle)*r2*0.9}
        stroke="#2a2a2a" strokeWidth="1" opacity="0.5"/>;
    })}
  </svg>
);

const LionSVG = () => (
  <svg viewBox="0 0 200 220" fill="none" className="w-full h-full">
    <defs>
      <radialGradient id="mane" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#3d2a0a"/>
        <stop offset="70%" stopColor="#1a1005"/>
        <stop offset="100%" stopColor="#0d0a00"/>
      </radialGradient>
      <radialGradient id="lionface" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#c8a040"/>
        <stop offset="50%" stopColor="#8a6020"/>
        <stop offset="100%" stopColor="#4a3010"/>
      </radialGradient>
      <radialGradient id="lioneye" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#e8c840"/>
        <stop offset="50%" stopColor="#b89020"/>
        <stop offset="100%" stopColor="#3a2800"/>
      </radialGradient>
    </defs>
    {/* Outer mane */}
    {Array.from({length: 28}, (_, i) => {
      const a = (i / 28) * Math.PI * 2 - Math.PI/2;
      const r1 = 68, r2 = 94 + Math.sin(i * 2.3) * 8;
      const cx = 100, cy = 110;
      return <path key={i}
        d={`M${cx + Math.cos(a)*r1} ${cy + Math.sin(a)*r1} Q${cx + Math.cos(a)*(r1+r2)/2 + Math.cos(a+0.4)*10} ${cy + Math.sin(a)*(r1+r2)/2 + Math.sin(a+0.4)*10} ${cx + Math.cos(a)*r2} ${cy + Math.sin(a)*r2}`}
        stroke="#2a1a05" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8"/>;
    })}
    {/* Inner mane */}
    {Array.from({length: 20}, (_, i) => {
      const a = (i / 20) * Math.PI * 2 - Math.PI/2;
      const r1 = 52, r2 = 72 + Math.sin(i * 3.1) * 6;
      const cx = 100, cy = 110;
      return <path key={i}
        d={`M${cx+Math.cos(a)*r1} ${cy+Math.sin(a)*r1} Q${cx+Math.cos(a)*(r1+r2)/2+Math.cos(a+0.3)*8} ${cy+Math.sin(a)*(r1+r2)/2+Math.sin(a+0.3)*8} ${cx+Math.cos(a)*r2} ${cy+Math.sin(a)*r2}`}
        stroke="#3d2505" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>;
    })}
    {/* Mane fill */}
    <circle cx="100" cy="110" r="68" fill="url(#mane)"/>
    {/* Face */}
    <ellipse cx="100" cy="108" rx="50" ry="52" fill="url(#lionface)"/>
    {/* Facial shading */}
    <ellipse cx="100" cy="120" rx="35" ry="28" fill="#6a4015" opacity="0.3"/>
    {/* Left eye */}
    <ellipse cx="78" cy="96" rx="13" ry="10" fill="#1a0a00" stroke="#2a1500" strokeWidth="1.5"/>
    <ellipse cx="78" cy="96" rx="9" ry="7" fill="url(#lioneye)"/>
    <ellipse cx="78" cy="96" rx="4.5" ry="4.5" fill="#080400"/>
    <ellipse cx="81" cy="93" rx="2.5" ry="2" fill="white" opacity="0.8"/>
    {/* Right eye */}
    <ellipse cx="122" cy="96" rx="13" ry="10" fill="#1a0a00" stroke="#2a1500" strokeWidth="1.5"/>
    <ellipse cx="122" cy="96" rx="9" ry="7" fill="url(#lioneye)"/>
    <ellipse cx="122" cy="96" rx="4.5" ry="4.5" fill="#080400"/>
    <ellipse cx="125" cy="93" rx="2.5" ry="2" fill="white" opacity="0.8"/>
    {/* Nose bridge */}
    <path d="M95 100 L100 108 L105 100" stroke="#5a3010" strokeWidth="1" fill="none" opacity="0.5"/>
    {/* Nose */}
    <path d="M88 116 Q100 110 112 116 Q108 126 100 128 Q92 126 88 116 Z" fill="#1a0d08" stroke="#2a1510" strokeWidth="1.2"/>
    <path d="M90 119 Q100 115 110 119" stroke="#3a2010" strokeWidth="0.8" fill="none"/>
    <ellipse cx="93" cy="115" rx="3.5" ry="2.5" fill="#100808"/>
    <ellipse cx="107" cy="115" rx="3.5" ry="2.5" fill="#100808"/>
    {/* Mouth */}
    <path d="M100 128 Q88 136 82 132" stroke="#2a1510" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M100 128 Q112 136 118 132" stroke="#2a1510" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    {/* Muzzle dots */}
    {[[82,118],[86,115],[90,113],[110,113],[114,115],[118,118]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="1.2" fill="#2a1a10" opacity="0.7"/>
    ))}
    {/* Chin tuft */}
    {[[96,145,94,158],[100,146,100,160],[104,145,106,158],[92,143,88,155],[108,143,112,155]].map(([x1,y1,x2,y2],i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3d2505" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
    ))}
    {/* Ear tops through mane */}
    <path d="M62 52 L50 28 L76 42 Z" fill="#2a1505" stroke="#1a0d00" strokeWidth="1.5"/>
    <path d="M138 52 L150 28 L124 42 Z" fill="#2a1505" stroke="#1a0d00" strokeWidth="1.5"/>
  </svg>
);

const SkullSVG = () => (
  <svg viewBox="0 0 200 240" fill="none" className="w-full h-full">
    <defs>
      <radialGradient id="skullgrad" cx="50%" cy="38%" r="55%">
        <stop offset="0%" stopColor="#5a5a5a"/>
        <stop offset="60%" stopColor="#2a2a2a"/>
        <stop offset="100%" stopColor="#0d0d0d"/>
      </radialGradient>
      <radialGradient id="rosepetal" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#4a1a1a"/>
        <stop offset="100%" stopColor="#1a0808"/>
      </radialGradient>
    </defs>
    {/* Mandala background ring */}
    {Array.from({length: 16}, (_, i) => {
      const a = (i/16)*Math.PI*2;
      return <line key={i} x1={100+Math.cos(a)*50} y1={110+Math.sin(a)*50}
        x2={100+Math.cos(a)*68} y2={110+Math.sin(a)*68}
        stroke="#2a2a2a" strokeWidth="1.2" opacity="0.6"/>;
    })}
    <circle cx="100" cy="110" r="68" stroke="#222" strokeWidth="0.8" fill="none" opacity="0.4"/>
    <circle cx="100" cy="110" r="76" stroke="#1a1a1a" strokeWidth="0.6" fill="none" opacity="0.3"/>
    {/* Skull cranium */}
    <path d="M100 22 C58 22 28 52 28 88 C28 114 42 132 58 144 L60 170 L140 170 L142 144 C158 132 172 114 172 88 C172 52 142 22 100 22 Z"
      fill="url(#skullgrad)" stroke="#111" strokeWidth="2"/>
    {/* Cranium shading */}
    <path d="M60 50 Q100 35 140 50" stroke="#666" strokeWidth="0.8" fill="none" opacity="0.4"/>
    <ellipse cx="84" cy="62" rx="22" ry="16" fill="#1a1a1a" opacity="0.2"/>
    <ellipse cx="116" cy="62" rx="22" ry="16" fill="#1a1a1a" opacity="0.2"/>
    {/* Eye sockets */}
    <ellipse cx="75" cy="88" rx="22" ry="20" fill="#050505" stroke="#222" strokeWidth="1.5"/>
    <ellipse cx="125" cy="88" rx="22" ry="20" fill="#050505" stroke="#222" strokeWidth="1.5"/>
    {/* Socket shading */}
    <ellipse cx="75" cy="84" rx="12" ry="8" fill="#0a0a0a" opacity="0.5"/>
    <ellipse cx="125" cy="84" rx="12" ry="8" fill="#0a0a0a" opacity="0.5"/>
    {/* Nasal cavity */}
    <path d="M90 118 Q100 112 110 118 L108 132 Q100 136 92 132 Z" fill="#050505" stroke="#222" strokeWidth="1.2"/>
    {/* Cheekbones */}
    <path d="M42 95 Q60 88 70 98" stroke="#444" strokeWidth="1" fill="none" opacity="0.5"/>
    <path d="M158 95 Q140 88 130 98" stroke="#444" strokeWidth="1" fill="none" opacity="0.5"/>
    {/* Jaw */}
    <path d="M58 144 L60 170 L78 174 L100 176 L122 174 L140 170 L142 144"
      stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
    {/* Teeth */}
    {[62,76,90,104,118,132].map((x,i) => (
      <path key={i} d={`M${x} 170 L${x+2} 182 L${x+10} 182 L${x+12} 170`}
        fill="#3a3a3a" stroke="#111" strokeWidth="1"/>
    ))}
    {/* Rose top-left */}
    <g transform="translate(22, 28) scale(0.7)">
      <circle cx="30" cy="30" r="18" fill="url(#rosepetal)" opacity="0.9"/>
      {Array.from({length: 8}, (_, i) => {
        const a = (i/8)*Math.PI*2;
        return <ellipse key={i} cx={30+Math.cos(a)*14} cy={30+Math.sin(a)*14}
          rx="8" ry="5" fill="#2a0a0a" opacity="0.8"
          transform={`rotate(${(i/8)*360} ${30+Math.cos(a)*14} ${30+Math.sin(a)*14})`}/>;
      })}
      <circle cx="30" cy="30" r="7" fill="#1a0505"/>
    </g>
    {/* Rose top-right */}
    <g transform="translate(118, 28) scale(0.7)">
      <circle cx="30" cy="30" r="18" fill="url(#rosepetal)" opacity="0.9"/>
      {Array.from({length: 8}, (_, i) => {
        const a = (i/8)*Math.PI*2;
        return <ellipse key={i} cx={30+Math.cos(a)*14} cy={30+Math.sin(a)*14}
          rx="8" ry="5" fill="#2a0a0a" opacity="0.8"
          transform={`rotate(${(i/8)*360} ${30+Math.cos(a)*14} ${30+Math.sin(a)*14})`}/>;
      })}
      <circle cx="30" cy="30" r="7" fill="#1a0505"/>
    </g>
    {/* Vine/stems */}
    <path d="M44 50 Q60 80 60 144" stroke="#1a2a10" strokeWidth="1.5" fill="none" opacity="0.6"/>
    <path d="M156 50 Q140 80 140 144" stroke="#1a2a10" strokeWidth="1.5" fill="none" opacity="0.6"/>
    {/* Small leaves */}
    {[[55,90,48,82],[57,108,48,104],[143,90,152,82],[143,108,152,104]].map(([x1,y1,x2,y2],i) => (
      <path key={i} d={`M${x1} ${y1} Q${(x1+x2)/2} ${y1-6} ${x2} ${y2} Q${x2+3} ${(y1+y2)/2} ${x1} ${y1}`}
        fill="#1a2a10" opacity="0.7"/>
    ))}
  </svg>
);

const RoseSVG = () => (
  <svg viewBox="0 0 200 240" fill="none" className="w-full h-full">
    <defs>
      <radialGradient id="rosecenter" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1a1a1a"/>
        <stop offset="100%" stopColor="#0a0a0a"/>
      </radialGradient>
    </defs>
    {/* Outer petal ring */}
    {Array.from({length: 10}, (_, i) => {
      const a = (i/10)*Math.PI*2 - Math.PI/2;
      const cx = 100, cy = 90;
      const px = cx + Math.cos(a) * 34;
      const py = cy + Math.sin(a) * 30;
      return <path key={i}
        d={`M${cx} ${cy} Q${px-Math.sin(a)*12} ${py+Math.cos(a)*10} ${px} ${py} Q${px+Math.sin(a)*12} ${py-Math.cos(a)*10} ${cx} ${cy}`}
        fill="none" stroke="#2a2a2a" strokeWidth="1.2" opacity="0.7"/>;
    })}
    {/* Outer petal fill */}
    {Array.from({length: 8}, (_, i) => {
      const a = (i/8)*Math.PI*2 - Math.PI/6;
      const cx = 100, cy = 90;
      return <path key={i}
        d={`M${cx} ${cy} C${cx+Math.cos(a-0.3)*20} ${cy+Math.sin(a-0.3)*18} ${cx+Math.cos(a)*38} ${cy+Math.sin(a)*33} ${cx+Math.cos(a+0.3)*20} ${cy+Math.sin(a+0.3)*18} Z`}
        fill="#111" stroke="#2a2a2a" strokeWidth="0.8" opacity="0.8"/>;
    })}
    {/* Mid petal ring */}
    {Array.from({length: 7}, (_, i) => {
      const a = (i/7)*Math.PI*2;
      const cx = 100, cy = 90;
      const r = 22;
      return <path key={i}
        d={`M${cx} ${cy} C${cx+Math.cos(a-0.35)*12} ${cy+Math.sin(a-0.35)*11} ${cx+Math.cos(a)*r} ${cy+Math.sin(a)*r} ${cx+Math.cos(a+0.35)*12} ${cy+Math.sin(a+0.35)*11} Z`}
        fill="#181818" stroke="#333" strokeWidth="0.7" opacity="0.9"/>;
    })}
    {/* Inner petals */}
    {Array.from({length: 5}, (_, i) => {
      const a = (i/5)*Math.PI*2 + 0.3;
      const cx = 100, cy = 90;
      return <path key={i}
        d={`M${cx} ${cy} C${cx+Math.cos(a-0.4)*8} ${cy+Math.sin(a-0.4)*7} ${cx+Math.cos(a)*14} ${cy+Math.sin(a)*12} ${cx+Math.cos(a+0.4)*8} ${cy+Math.sin(a+0.4)*7} Z`}
        fill="#0d0d0d" stroke="#2a2a2a" strokeWidth="0.6" opacity="0.9"/>;
    })}
    {/* Center */}
    <circle cx="100" cy="90" r="7" fill="url(#rosecenter)" stroke="#333" strokeWidth="0.8"/>
    {/* Petal vein lines */}
    {Array.from({length: 6}, (_, i) => {
      const a = (i/6)*Math.PI*2;
      const cx = 100, cy = 90;
      return <line key={i}
        x1={cx + Math.cos(a)*7} y1={cy + Math.sin(a)*6}
        x2={cx + Math.cos(a)*35} y2={cy + Math.sin(a)*30}
        stroke="#333" strokeWidth="0.6" opacity="0.4"/>;
    })}
    {/* Main stem */}
    <path d="M100 124 C98 150 96 170 94 200" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M100 124 C102 150 104 170 106 200" stroke="#222" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    {/* Thorns */}
    <path d="M97 148 L88 143" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M95 165 L85 162" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M103 156 L112 150" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M105 178 L114 175" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Left leaf */}
    <path d="M95 142 C80 136 64 142 62 156 C70 156 84 148 95 142 Z" fill="#111" stroke="#222" strokeWidth="1.2"/>
    <path d="M95 142 C81 144 68 152 62 156" stroke="#333" strokeWidth="0.6" fill="none"/>
    {/* Leaf veins */}
    {[[78,143,72,152],[83,141,79,150]].map(([x1,y1,x2,y2],i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2a2a2a" strokeWidth="0.5" opacity="0.6"/>
    ))}
    {/* Right leaf */}
    <path d="M105 160 C120 154 136 158 138 170 C130 170 116 162 105 160 Z" fill="#111" stroke="#222" strokeWidth="1.2"/>
    <path d="M105 160 C119 162 132 168 138 170" stroke="#333" strokeWidth="0.6" fill="none"/>
    {/* Small bud top */}
    <path d="M92 68 Q100 55 108 68 Q100 72 92 68 Z" fill="#0d0d0d" stroke="#222" strokeWidth="1"/>
    <line x1="100" y1="58" x2="100" y2="50" stroke="#1a1a1a" strokeWidth="1.5"/>
    {/* Dew drops */}
    <ellipse cx="65" cy="153" rx="2.5" ry="3.5" fill="#2a2a2a" opacity="0.6"/>
    <ellipse cx="65.5" cy="151.5" rx="1" ry="1.2" fill="white" opacity="0.3"/>
  </svg>
);

const CompassSVG = () => (
  <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
    <defs>
      <radialGradient id="compassbg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2a2a2a"/>
        <stop offset="100%" stopColor="#0a0a0a"/>
      </radialGradient>
    </defs>
    {/* Outer decorative ring */}
    <circle cx="100" cy="100" r="90" fill="url(#compassbg)" stroke="#333" strokeWidth="1.5"/>
    <circle cx="100" cy="100" r="82" stroke="#222" strokeWidth="0.8" fill="none"/>
    {/* Degree tick marks */}
    {Array.from({length: 72}, (_, i) => {
      const a = (i/72)*Math.PI*2 - Math.PI/2;
      const r1 = i % 9 === 0 ? 74 : i % 3 === 0 ? 76 : 78;
      const r2 = 82;
      return <line key={i}
        x1={100+Math.cos(a)*r1} y1={100+Math.sin(a)*r1}
        x2={100+Math.cos(a)*r2} y2={100+Math.sin(a)*r2}
        stroke="#3a3a3a" strokeWidth={i % 9 === 0 ? 1.5 : 0.8} opacity="0.7"/>;
    })}
    {/* Inner ring */}
    <circle cx="100" cy="100" r="70" stroke="#2a2a2a" strokeWidth="1.2" fill="none"/>
    {/* 16-point compass rose */}
    {/* N,S,E,W main points */}
    <path d="M100 26 L92 100 L100 85 L108 100 Z" fill="#ddd" stroke="#111" strokeWidth="1"/>
    <path d="M100 174 L108 100 L100 115 L92 100 Z" fill="#666" stroke="#111" strokeWidth="1"/>
    <path d="M26 100 L100 108 L85 100 L100 92 Z" fill="#666" stroke="#111" strokeWidth="1"/>
    <path d="M174 100 L100 92 L115 100 L100 108 Z" fill="#666" stroke="#111" strokeWidth="1"/>
    {/* NE, NW, SE, SW secondary points */}
    {[[100,26,174,100],[100,26,26,100],[100,174,174,100],[100,174,26,100]].map(([x1,y1,x2,y2],i) => {
      const mx = (x1+x2)/2 + (i<2?1:-1)*(i%2===0?-12:12);
      const my = (y1+y2)/2 + (i<2?-12:12);
      return <path key={i} d={`M${x1} ${y1} L${mx} ${my} L${x2} ${y2} L100 100 Z`}
        fill="#3a3a3a" stroke="#111" strokeWidth="0.8" opacity="0.8"/>;
    })}
    {/* NNE, NNW, ENE, WNW etc - 8 tertiary points */}
    {Array.from({length: 8}, (_, i) => {
      const a = (i/8)*Math.PI*2 - Math.PI/2 + Math.PI/8;
      const tipX = 100 + Math.cos(a) * 60;
      const tipY = 100 + Math.sin(a) * 60;
      return <path key={i}
        d={`M100 100 L${100+Math.cos(a-0.2)*28} ${100+Math.sin(a-0.2)*28} L${tipX} ${tipY} L${100+Math.cos(a+0.2)*28} ${100+Math.sin(a+0.2)*28} Z`}
        fill="#222" stroke="#333" strokeWidth="0.7" opacity="0.7"/>;
    })}
    {/* Center rosette */}
    <circle cx="100" cy="100" r="14" fill="#1a1a1a" stroke="#333" strokeWidth="1.2"/>
    {Array.from({length: 8}, (_, i) => {
      const a = (i/8)*Math.PI*2;
      return <ellipse key={i}
        cx={100+Math.cos(a)*9} cy={100+Math.sin(a)*9}
        rx="4" ry="2.5"
        fill="#2a2a2a" stroke="#333" strokeWidth="0.6"
        transform={`rotate(${(i/8)*360} ${100+Math.cos(a)*9} ${100+Math.sin(a)*9})`}/>;
    })}
    <circle cx="100" cy="100" r="5" fill="#333" stroke="#444" strokeWidth="0.8"/>
    <circle cx="100" cy="100" r="2" fill="#555"/>
    {/* Cardinal letters */}
    {[["N",100,18],["S",100,196],["E",188,104],["W",12,104]].map(([ltr,x,y]) => (
      <text key={ltr as string} x={x as number} y={y as number}
        textAnchor="middle" fill="#ccc" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.8">{ltr}</text>
    ))}
    {/* Decorative outer petals */}
    {Array.from({length: 4}, (_, i) => {
      const a = (i/4)*Math.PI*2 - Math.PI/4;
      const bx = 100 + Math.cos(a)*88;
      const by = 100 + Math.sin(a)*88;
      return <g key={i}>
        <circle cx={bx} cy={by} r="5" fill="#1a1a1a" stroke="#333" strokeWidth="0.8"/>
        <circle cx={bx} cy={by} r="2.5" fill="#2a2a2a"/>
      </g>;
    })}
  </svg>
);

/* ── Works data ─────────────────────────────────────────────────────────── */
const works = [
  { tag: "BLACK & GREY", label: "Realistisches Auge",    size: "tall",   SVG: EyeSVG     },
  { tag: "DARK ART",     label: "Wolf Realism",          size: "normal", SVG: WolfSVG    },
  { tag: "REALISM",      label: "Löwen-Portrait",        size: "tall",   SVG: LionSVG    },
  { tag: "DARK ART",     label: "Skull & Roses",         size: "normal", SVG: SkullSVG   },
  { tag: "FINE LINE",    label: "Botanische Rose",       size: "normal", SVG: RoseSVG    },
  { tag: "BLACK & GREY", label: "Ornament Kompass",      size: "tall",   SVG: CompassSVG },
];

function GalleryCard({ work, index, onOpen }: { work: (typeof works)[0]; index: number; onOpen: () => void }) {
  const ref     = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);
  const { SVG } = work;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -12;
    el.style.transform  = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.03,1.03,1.03)`;
    el.style.transition = "transform 0.08s ease-out";
  };
  const handleLeave = () => {
    setHovered(false);
    if (!cardRef.current) return;
    cardRef.current.style.transform  = "perspective(900px) rotateY(0) rotateX(0) scale3d(1,1,1)";
    cardRef.current.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
  };

  return (
    <div ref={ref} className={work.size === "tall" ? "row-span-2" : ""}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="h-full"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleLeave}
          onClick={onOpen}
          data-cursor="ZOOM"
          className={`relative overflow-hidden cursor-pointer group bg-[#0d0d0d] border border-white/5
            hover:border-gold/30 transition-[border-color] duration-500
            ${work.size === "tall" ? "h-full min-h-[480px]" : "aspect-[4/5]"}`}
          style={{ willChange: "transform" }}
        >
          {/* Tattoo artwork */}
          <div className={`absolute inset-0 flex items-center justify-center p-4 transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"}`}>
            <div className="w-full h-full" style={{ color: "rgba(200,200,200,0.9)" }}>
              <SVG />
            </div>
          </div>

          {/* Dark vignette for photo-like feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none"/>
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25 pointer-events-none"/>

          {/* Hover overlay */}
          <div className={`absolute inset-0 bg-black/50 transition-opacity duration-400 ${hovered ? "opacity-100" : "opacity-0"}`}/>

          {/* Gold scan line on hover */}
          <motion.div
            className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent pointer-events-none"
            animate={{ y: hovered ? "100%" : "0%", opacity: hovered ? [0, 1, 0] : 0 }}
            transition={{ duration: 0.8, ease: "linear" }}
          />

          {/* Tag */}
          <div className={`absolute top-3 right-3 px-2.5 py-1 bg-black/80 border border-gold/30 transition-all duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
            <span className="font-sans text-[8px] tracking-[0.2em] text-gold">{work.tag}</span>
          </div>

          {/* Label bar */}
          <div className={`absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400`}>
            <p className="font-display text-2xl text-cream/92">{work.label}</p>
            <p className="font-sans text-[9px] tracking-[0.25em] text-gold/70 uppercase mt-1">{work.tag}</p>
          </div>

          {/* Corner marks */}
          <div className={`absolute top-3 left-3 w-5 h-5 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute top-0 left-0 w-full h-px bg-gold/60"/>
            <div className="absolute top-0 left-0 w-px h-full bg-gold/60"/>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("ALLE");
  const [lightboxIdx,  setLightboxIdx]  = useState<number | null>(null);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = useMemo(
    () => activeFilter === "ALLE" ? works : works.filter((w) => w.tag === activeFilter),
    [activeFilter]
  );

  return (
    <section id="portfolio" className="py-28 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div ref={ref} className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-gold opacity-50"/>
              <span className="section-label">Portfolio</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 }} className="font-display text-cream/92 leading-none"
              style={{ fontSize: "clamp(44px,7vw,88px)" }}>
              GETRAGEN.<br/><span className="gold-text">FÜR IMMER.</span>
            </motion.h2>
          </div>
          <motion.a href="https://instagram.com/tattooartist_nataschalee" target="_blank" rel="noreferrer"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
            className="font-sans text-[10px] tracking-[0.22em] uppercase text-gold/45 border-b border-gold/20 pb-1
              hover:text-gold hover:border-gold whitespace-nowrap transition-colors duration-300 self-start md:self-auto">
            Mehr auf Instagram →
          </motion.a>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none">
          {filters.map((f) => (
            <button key={f} onClick={() => { setActiveFilter(f); setLightboxIdx(null); }}
              className={`font-sans text-[9px] tracking-[0.2em] uppercase px-4 py-2 whitespace-nowrap flex-shrink-0
                transition-all duration-300
                ${activeFilter === f ? "bg-gold text-black font-bold" : "border border-cream/10 text-cream/30 hover:border-gold/30 hover:text-gold/70"}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" style={{ gridAutoRows: "240px" }}>
          {filtered.map((work, i) => (
            <GalleryCard key={`${work.label}-${activeFilter}`} work={work} index={i} onOpen={() => setLightboxIdx(i)}/>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[200] bg-black/97 backdrop-blur-2xl flex items-center justify-center"
            onClick={() => setLightboxIdx(null)}>
            <button onClick={() => setLightboxIdx(null)}
              className="absolute top-6 right-6 w-10 h-10 border border-gold/25 flex items-center justify-center
                text-cream/50 hover:text-gold hover:border-gold/50 transition-all z-10">✕</button>

            {lightboxIdx > 0 && (
              <button onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx - 1); }}
                className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 w-10 h-10 border border-gold/25
                  flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/50 transition-all z-10">←</button>
            )}
            {lightboxIdx < filtered.length - 1 && (
              <button onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx + 1); }}
                className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 w-10 h-10 border border-gold/25
                  flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/50 transition-all z-10">→</button>
            )}

            <motion.div key={lightboxIdx} initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-[min(80vw,480px)] h-[min(85vh,560px)] relative"
              onClick={(e) => e.stopPropagation()} style={{ color: "rgba(200,200,200,0.95)" }}>
              {(() => { const { SVG } = filtered[lightboxIdx]; return <SVG />; })()}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/40"/>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/40"/>
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
              <p className="font-display text-xl text-cream/80">{filtered[lightboxIdx].label}</p>
              <p className="font-sans text-[9px] tracking-[0.25em] text-gold/55 uppercase mt-1">{filtered[lightboxIdx].tag}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
