"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  CheckSquare,
  Users,
  Package,
  Camera,
  Bell,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  PlusCircle,
  Building,
} from "lucide-react";
import { escalasService } from "@/services/escalasService";
import { missoesService } from "@/services/missoesService";
import { materiaisService } from "@/services/materiaisService";
import { avisosService } from "@/services/avisosService";
import { Escala, Missao, Material, Aviso } from "@/types";

export default function DashboardPage() {
  const [escalas, setEscalas] = useState<Escala[]>([]);
  const [missoes, setMissoes] = useState<Missao[]>([]);
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [esc, mis, mat, avi] = await Promise.all([
          escalasService.listar(),
          missoesService.listar(),
          materiaisService.listar(),
          avisosService.listar(),
        ]);
        setEscalas(esc);
        setMissoes(mis);
        setMateriais(mat);
        setAvisos(avi);
      } catch (err) {
        console.error("Erro ao carregar dados do painel:", err);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  return (
    <div>
      <Header
        titulo="Painel Executivo & Operacional"
        subtitulo="Visão consolidada de todas as áreas e módulos da ZapZup"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Banner de Boas-vindas e Status */}
        <div className="rounded-2xl bg-gradient-to-r from-zap-blue-600 via-zap-blue-700 to-zap-green-700 p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="orange" className="bg-zap-orange-500 text-white font-bold border-none text-[11px]">
                ZapZup Master
              </Badge>
              <span className="text-xs text-white/80">Operação em Tempo Real</span>
            </div>
            <h2 className="text-2xl font-black">
              Central Integrada de Gestão
            </h2>
            <p className="text-sm text-white/90 max-w-2xl">
              Acompanhe escalas ativas, status das missões em campo, níveis de estoque e comunicados da equipe.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link href="/escalas">
              <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
                <PlusCircle className="mr-1.5 h-4 w-4 text-zap-green-600" />
                Nova Escala
              </Button>
            </Link>
            <Link href="/missoes">
              <Button size="sm" variant="orange" className="font-bold">
                <PlusCircle className="mr-1.5 h-4 w-4" />
                Nova Missão
              </Button>
            </Link>
          </div>
        </div>

        {/* Métricas Principais (KPIs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card Escalas */}
          <Card className="border-l-4 border-l-zap-green-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Escalas Cadastradas
              </CardTitle>
              <CalendarDays className="h-4 w-4 text-zap-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {escalas.length}
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <span className="text-zap-green-600 font-semibold">Ativas e planejadas</span>
              </p>
            </CardContent>
          </Card>

          {/* Card Missões */}
          <Card className="border-l-4 border-l-zap-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Missões Operacionais
              </CardTitle>
              <CheckSquare className="h-4 w-4 text-zap-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {missoes.length}
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <span className="text-zap-blue-600 font-semibold">Em acompanhamento</span>
              </p>
            </CardContent>
          </Card>

          {/* Card Materiais */}
          <Card className="border-l-4 border-l-zap-orange-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Itens de Estoque
              </CardTitle>
              <Package className="h-4 w-4 text-zap-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {materiais.length}
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <span className="text-zap-orange-600 font-semibold">Insumos e equipamentos</span>
              </p>
            </CardContent>
          </Card>

          {/* Card Avisos */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Avisos Ativos
              </CardTitle>
              <Bell className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {avisos.length}
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <span className="text-purple-600 font-semibold">Mural da equipe</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Grade com Seções Operacionais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seção Escalas Recentes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-zap-green-600" />
                  Próximas Escalas & Plantões
                </CardTitle>
                <CardDescription className="text-xs">
                  Escalas agendadas para a equipe
                </CardDescription>
              </div>
              <Link href="/escalas">
                <Button variant="ghost" size="sm" className="text-xs text-zap-blue-600">
                  Ver Todas <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {escalas.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-200 dark:border-slate-800 p-8 text-center">
                  <p className="text-sm text-slate-500">Nenhuma escala cadastrada no banco de dados.</p>
                  <Link href="/escalas" className="mt-3 inline-block">
                    <Button size="sm" variant="green">Criar Primeira Escala</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {escalas.slice(0, 4).map((esc) => (
                    <div
                      key={esc.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                          {esc.titulo}
                        </h4>
                        <span className="text-xs text-slate-500">
                          {new Date(esc.dataInicio).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <Badge variant="green">{esc.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seção Missões Recentes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-zap-blue-600" />
                  Missões Operacionais
                </CardTitle>
                <CardDescription className="text-xs">
                  Atividades prioritárias e ordens de serviço
                </CardDescription>
              </div>
              <Link href="/missoes">
                <Button variant="ghost" size="sm" className="text-xs text-zap-blue-600">
                  Ver Todas <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {missoes.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-200 dark:border-slate-800 p-8 text-center">
                  <p className="text-sm text-slate-500">Nenhuma missão cadastrada no banco de dados.</p>
                  <Link href="/missoes" className="mt-3 inline-block">
                    <Button size="sm" variant="orange">Criar Primeira Missão</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {missoes.slice(0, 4).map((mis) => (
                    <div
                      key={mis.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                          {mis.titulo}
                        </h4>
                        <span className="text-xs text-slate-500">
                          Prioridade: {mis.prioridade}
                        </span>
                      </div>
                      <Badge variant="blue">{mis.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Atalhos Rápidos para outros Módulos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link href="/funcionarios">
            <Card className="hover:border-zap-blue-500 transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-zap-blue-50 dark:bg-zap-blue-950/40 flex items-center justify-center text-zap-blue-600">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Funcionários</h4>
                  <p className="text-[11px] text-slate-500">Gerenciar equipe</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/materiais">
            <Card className="hover:border-zap-orange-500 transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-zap-orange-50 dark:bg-zap-orange-950/40 flex items-center justify-center text-zap-orange-600">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Materiais</h4>
                  <p className="text-[11px] text-slate-500">Estoque e baixas</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/midia">
            <Card className="hover:border-rose-500 transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-600">
                  <Camera className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Fotos & Vídeos</h4>
                  <p className="text-[11px] text-slate-500">Comprovações</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/comunicacao">
            <Card className="hover:border-zap-green-500 transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-zap-green-50 dark:bg-zap-green-950/40 flex items-center justify-center text-zap-green-600">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Comunicação</h4>
                  <p className="text-[11px] text-slate-500">Chat em tempo real</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
