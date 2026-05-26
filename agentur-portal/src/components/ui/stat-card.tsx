import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  color?: "blue" | "green" | "amber" | "red" | "purple" | "default";
}

const colorMap = {
  blue:    "bg-blue-500/10 text-blue-400",
  green:   "bg-emerald-500/10 text-emerald-400",
  amber:   "bg-amber-500/10 text-amber-400",
  red:     "bg-red-500/10 text-red-400",
  purple:  "bg-purple-500/10 text-purple-400",
  default: "bg-muted text-muted-foreground",
};

export function StatCard({ label, value, sub, icon: Icon, trend, trendValue, className, color = "default" }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5 flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
        {Icon && (
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colorMap[color])}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      {trendValue && (
        <p className={cn("text-xs font-medium", trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : "text-muted-foreground")}>
          {trend === "up" ? "↑" : trend === "down" ? "↓" : "–"} {trendValue}
        </p>
      )}
    </div>
  );
}
