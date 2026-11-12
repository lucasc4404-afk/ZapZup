"use client";

import React from "react";
import { Bell, Search, Shield, UserCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  titulo?: string;
  subtitulo?: string;
}

export function Header({
  titulo = "Painel ZapZup",
  subtitulo = "Visão Unificada da Operação",
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 px-6 backdrop-blur-md">
      {/* Título da Página / Rota */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            {titulo}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {subtitulo}
          </p>
        </div>
      </div>

      {/* Ações da Direita */}
      <div className="flex items-center gap-3">
        {/* Indicador de Perfil em Atividade */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-3 py-1">
          <Shield className="h-3.5 w-3.5 text-zap-orange-500" />
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Perfil: <strong className="text-slate-900 dark:text-white">Dono / Gestão</strong>
          </span>
          <Badge variant="green" className="text-[10px] px-1.5 py-0">
            Ativo
          </Badge>
        </div>

        {/* Notificações / Avisos */}
        <Button variant="ghost" size="icon" className="relative text-slate-600 dark:text-slate-300">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-zap-orange-500"></span>
        </Button>

        {/* Avatar Usuário */}
        <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white font-semibold text-xs border border-slate-200 dark:border-slate-700">
            ZZ
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-900 dark:text-white leading-none">
              Administrador ZapZup
            </span>
            <span className="text-[11px] text-slate-400 leading-tight">
              admin@zapzup.com.br
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
