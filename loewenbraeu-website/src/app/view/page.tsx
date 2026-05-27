"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutSwitcher } from "@/components/LayoutSwitcher";
import dynamic from "next/dynamic";

const DefaultTheme  = dynamic(() => import("@/themes/DefaultTheme"),  { ssr: false });
const RusticTheme   = dynamic(() => import("@/themes/RusticTheme"),   { ssr: false });
const LightTheme    = dynamic(() => import("@/themes/LightTheme"),    { ssr: false });
const AbendrotTheme = dynamic(() => import("@/themes/AbendrotTheme"), { ssr: false });

const VALID = ["default", "rustic", "light", "abendrot"] as const;
type ThemeId = typeof VALID[number];

function ViewContent() {
  const params = useSearchParams();
  const [theme, setTheme] = useState<ThemeId>("default");

  useEffect(() => {
    const t = params.get("theme") as ThemeId | null;
    if (t && VALID.includes(t)) setTheme(t);
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, [params]);

  return (
    <>
      {theme === "default"  && <DefaultTheme />}
      {theme === "rustic"   && <RusticTheme />}
      {theme === "light"    && <LightTheme />}
      {theme === "abendrot" && <AbendrotTheme />}
      <LayoutSwitcher backLink="/" />
    </>
  );
}

export default function ViewPage() {
  return (
    <Suspense>
      <ViewContent />
    </Suspense>
  );
}
