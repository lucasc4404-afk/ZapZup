"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogoPlaceholder } from "@/components/ui/logo-placeholder";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ShieldCheck,
  CheckSquare,
  Package,
  Camera,
  Bell,
  MessageSquare,
  Building2,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  roleRequired?: string;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard Geral",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Escalas & Plantões",
    href: "/escalas",
    icon: CalendarDays,
  },
  {
    title: "Missões & Tarefas",
    href: "/missoes",
    icon: CheckSquare,
  },
  {
    title: "Funcionários",
    href: "/funcionarios",
    icon: Users,
  },
  {
    title: "Materiais & Estoque",
    href: "/materiais",
    icon: Package,
  },
  {
    title: "Fotos & Vídeos",
    href: "/midia",
    icon: Camera,
  },
  {
    title: "Mural de Avisos",
    href: "/avisos",
    icon: Bell,
  },
  {
    title: "Comunicação & Chat",
    href: "/comunicacao",
    icon: MessageSquare,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 md:flex">
      {/* Top Header com Espaço Reservado da Logomarca */}
      <div className="flex h-16 items-center border-b border-slate-200 dark:border-slate-800 px-6">
        <Link href="/dashboard" className="flex items-center">
          <LogoPlaceholder size="sm" showText={true} />
        </Link>
      </div>

      {/* Navegação Principal */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Módulos Operacionais
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-zap-green-500/10 text-zap-green-700 dark:text-zap-green-400 font-semibold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isActive
                        ? "text-zap-green-600 dark:text-zap-green-400"
                        : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                    )}
                  />
                  <span>{item.title}</span>
                </div>
                {isActive && (
                  <div className="h-2 w-2 rounded-full bg-zap-green-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Níveis de Acesso Rápidos */}
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-6">
          <div className="mb-3 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Perfis de Visão
          </div>
          <div className="space-y-1.5 px-1">
            <div className="flex items-center gap-2 rounded-md bg-slate-50 dark:bg-slate-900 p-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-zap-orange-500"></span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Donos</span>
              <span className="ml-auto text-[10px] text-slate-400">Acesso Total</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-slate-50 dark:bg-slate-900 p-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-zap-blue-500"></span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Responsáveis</span>
              <span className="ml-auto text-[10px] text-slate-400">Gestão de Equipes</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-slate-50 dark:bg-slate-900 p-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-zap-green-500"></span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Funcionários</span>
              <span className="ml-auto text-[10px] text-slate-400">Operacional</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer da Sidebar */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>ZapZup Core v1.0</span>
          <span className="flex items-center gap-1 font-semibold text-zap-green-600">
            <span className="h-2 w-2 rounded-full bg-zap-green-500 animate-pulse"></span>
            Online
          </span>
        </div>
      </div>
    </aside>
  );
}
