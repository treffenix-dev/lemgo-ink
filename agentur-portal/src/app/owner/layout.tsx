import { Sidebar } from "@/components/layout/Sidebar";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      <Sidebar role="owner" />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
