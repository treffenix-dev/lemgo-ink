"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("customer_auth") === "1") {
      setAuthed(true);
    } else {
      router.replace("/login");
    }
  }, [router]);

  if (!authed) return null;

  return (
    <div className="flex min-h-screen bg-muted/20">
      <Sidebar role="customer" />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
