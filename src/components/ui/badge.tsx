import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "green" | "orange" | "blue";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80",
    secondary: "border-transparent bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100",
    destructive: "border-transparent bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    outline: "text-slate-950 dark:text-slate-50 border-slate-200 dark:border-slate-800",
    green: "border-transparent bg-zap-green-100 text-zap-green-800 dark:bg-zap-green-900/30 dark:text-zap-green-300",
    orange: "border-transparent bg-zap-orange-100 text-zap-orange-800 dark:bg-zap-orange-900/30 dark:text-zap-orange-300",
    blue: "border-transparent bg-zap-blue-100 text-zap-blue-800 dark:bg-zap-blue-900/30 dark:text-zap-blue-300",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
