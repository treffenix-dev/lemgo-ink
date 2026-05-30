/** Fachwerk-Muster (Andreaskreuze) als Grafik-Motiv — wie Florians Fassade. */
export default function Fachwerk({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="100%" height="100%" preserveAspectRatio="none" aria-hidden>
      <defs>
        <pattern id="fachwerk" width="64" height="80" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="64" height="80" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M0 0 L64 80 M64 0 L0 80" stroke="currentColor" strokeWidth="4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fachwerk)" />
    </svg>
  );
}
