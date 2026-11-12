"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarDays,
  CheckSquare,
  Users,
  Package,
  Camera,
  Bell,
  MessageSquare,
  Shield,
  Briefcase,
  UserCheck,
  ArrowRight,
  Database,
  Building2,
  Sparkles,
} from "lucide-react";
import { LogoPlaceholder } from "@/components/ui/logo-placeholder";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const modulos = [
    {
      title: "Escalas & Plantões",
      desc: "Planejamento, distribuição de turnos e controle de presença da equipe.",
      icon: CalendarDays,
      href: "/escalas",
      color: "border-zap-green-500/40 text-zap-green-600 bg-zap-green-500/10",
    },
    {
      title: "Missões & Checklists",
      desc: "Distribuição de ordens de serviço, prioridades e acompanhamento operacional.",
      icon: CheckSquare,
      href: "/missoes",
      color: "border-zap-blue-500/40 text-zap-blue-600 bg-zap-blue-500/10",
    },
    {
      title: "Funcionários & Equipes",
      desc: "Cadastros, atribuição de cargos, níveis de acesso e alocação.",
      icon: Users,
      href: "/funcionarios",
      color: "border-zap-orange-500/40 text-zap-orange-600 bg-zap-orange-500/10",
    },
    {
      title: "Materiais & Estoque",
      desc: "Inventário de equipamentos, insumos, controle de retiradas e devoluções.",
      icon: Package,
      href: "/materiais",
      color: "border-purple-500/40 text-purple-600 bg-purple-500/10",
    },
    {
      title: "Fotos & Vídeos",
      desc: "Galeria de comprovações de campo, registros fotográficos e vídeos de missões.",
      icon: Camera,
      href: "/midia",
      color: "border-rose-500/40 text-rose-600 bg-rose-500/10",
    },
    {
      title: "Avisos & Comunicados",
      desc: "Mural institucional com confirmações de leitura e avisos prioritários.",
      icon: Bell,
      href: "/avisos",
      color: "border-amber-500/40 text-amber-600 bg-amber-500/10",
    },
    {
      title: "Comunicação & Chat",
      desc: "Canais por missão, unidade e comunicação direta entre a equipe.",
      icon: MessageSquare,
      href: "/comunicacao",
      color: "border-cyan-500/40 text-cyan-600 bg-cyan-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Barra de Navegação Superior */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <LogoPlaceholder size="md" showText={true} />

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="default" className="gap-2 bg-zap-blue-600 hover:bg-zap-blue-700">
                Acessar Plataforma
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-20 px-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zap-green-500/30 bg-zap-green-500/10 text-zap-green-700 dark:text-zap-green-400 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-zap-green-500" />
            Ambiente Oficial de Gestão e Operações
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Plataforma Integrada <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-zap-green-600 via-zap-blue-600 to-zap-orange-500 bg-clip-text text-transparent">
              ZapZup Operacional
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Ecossistema unificado para gestão de donos, responsáveis, escalas, funcionários,
            missões, materiais, mídias, comunicados e chat em tempo real.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-zap-green-600 hover:bg-zap-green-700 text-white font-bold gap-2">
                Entrar no Painel Geral
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/escalas">
              <Button size="lg" variant="outline" className="font-semibold">
                Ver Escalas e Plantões
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Níveis de Perfil e Acesso */}
      <section className="py-12 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Arquitetura por Níveis de Acesso
          </h2>
          <p className="text-sm text-slate-500">
            Acesso segmentado para cada papel na estrutura da ZapZup
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Donos */}
          <Card className="border-t-4 border-t-zap-orange-500 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-zap-orange-100 dark:bg-zap-orange-950/40 flex items-center justify-center text-zap-orange-600 mb-2">
                <Shield className="h-5 w-5" />
              </div>
              <CardTitle>Donos & Sócios</CardTitle>
              <CardDescription>
                Controle estratégico, visão de todas as filiais, relatórios consolidados e governança geral.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zap-orange-500" />
                Painel executivo com métricas gerais
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zap-orange-500" />
                Auditoria de mídias e comprovações
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zap-orange-500" />
                Definição de permissões e unidades
              </div>
            </CardContent>
          </Card>

          {/* Card Responsáveis */}
          <Card className="border-t-4 border-t-zap-blue-500 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-zap-blue-100 dark:bg-zap-blue-950/40 flex items-center justify-center text-zap-blue-600 mb-2">
                <Briefcase className="h-5 w-5" />
              </div>
              <CardTitle>Responsáveis & Lideranças</CardTitle>
              <CardDescription>
                Montagem de escalas, designação de missões, controle de estoque e acompanhamento de equipes.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zap-blue-500" />
                Criação e aprovação de plantões
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zap-blue-500" />
                Despacho e monitoramento de missões
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zap-blue-500" />
                Gerenciamento de retirada de materiais
              </div>
            </CardContent>
          </Card>

          {/* Card Funcionários */}
          <Card className="border-t-4 border-t-zap-green-500 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-zap-green-100 dark:bg-zap-green-950/40 flex items-center justify-center text-zap-green-600 mb-2">
                <UserCheck className="h-5 w-5" />
              </div>
              <CardTitle>Funcionários & Equipes</CardTitle>
              <CardDescription>
                Consulta de turnos, check-in, execução de checklists de missão, upload de mídias e comunicação.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zap-green-500" />
                Visualização clara da agenda de escalas
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zap-green-500" />
                Envio de fotos e vídeos como evidência
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zap-green-500" />
                Chat direto e leitura de avisos urgentes
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Módulos do Sistema */}
      <section className="py-12 px-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Todos os Módulos Oficiais
            </h2>
            <p className="text-sm text-slate-500">
              Acesso direto às áreas operacionais da ZapZup
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-zap-blue-600 hover:text-zap-blue-700 gap-1 text-xs">
              Ver Todos no Painel <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulos.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link key={mod.title} href={mod.href} className="group">
                <Card className="h-full border border-slate-200 dark:border-slate-800 transition-all hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-sm">
                  <CardHeader>
                    <div className={`h-11 w-11 rounded-lg border flex items-center justify-center mb-3 ${mod.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-base group-hover:text-zap-blue-600 transition-colors">
                      {mod.title}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {mod.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Rodapé Oficial */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <LogoPlaceholder size="sm" showText={false} />
            <span>ZapZup Operacional &copy; {new Date().getFullYear()} - Todos os direitos reservados</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-zap-green-500" />
              Supabase / PostgreSQL
            </span>
            <span>Next.js 14 & Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
