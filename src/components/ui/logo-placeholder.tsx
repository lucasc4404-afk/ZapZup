"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoPlaceholderProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export function LogoPlaceholder({
  className,
  size = "md",
  showText = true,
}: LogoPlaceholderProps) {
  const sizeMap = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-20 w-20 text-xl",
  };

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      {/* Moldura preparada para a futura inserção do arquivo oficial da logomarca ZapZup */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl bg-gradient-to-br from-zap-green-500 via-zap-blue-600 to-zap-orange-500 p-0.5 shadow-sm transition-transform hover:scale-105",
          sizeMap[size]
        )}
        title="Espaço reservado para a Logomarca Oficial da ZapZup"
      >
        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 font-black tracking-wider text-white">
          <span className="text-zap-green-400">Z</span>
          <span className="text-zap-orange-400">Z</span>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center tracking-tight font-extrabold text-slate-900 dark:text-white">
            <span className="text-lg font-black text-slate-900 dark:text-white">Zap</span>
            <span className="text-lg font-black text-zap-orange-500">Zup</span>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Gestão Operacional
          </span>
        </div>
      )}
    </div>
  );
}
