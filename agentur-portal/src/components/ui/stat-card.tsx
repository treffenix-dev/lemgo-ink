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
  color?: "blue" | "green" | "amber" | "red" | "default";
}

const colorMap = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-red-50 text-red-600",
  default: "bg-muted text-muted-foreground",
};

export function StatCard({ label, value, sub, icon: Icon, trend, trendValue, className, color = "default" }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5 flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        {Icon && (
          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", colorMap[color])}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      {trendValue && (
        <p className={cn("text-xs font-medium", trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-muted-foreground")}>
          {trend === "up" ? "↑" : trend === "down" ? "↓" : "–"} {trendValue}
        </p>
      )}
    </div>
  );
}
