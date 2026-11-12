"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  CalendarDays,
  Plus,
  Clock,
  UserCheck,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { escalasService } from "@/services/escalasService";
import { Escala, StatusEscala } from "@/types";
import { formatarData, formatarDataSimples } from "@/lib/utils";

export default function EscalasPage() {
  const [escalas, setEscalas] = useState<Escala[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string>("TODOS");
  const [modalAberto, setModalAberto] = useState(false);

  // Form states para criação
  const [titulo, setTitulo] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [observacoes, setObservacoes] = useState("");

  async function carregar() {
    setLoading(true);
    try {
      const data = await escalasService.listar();
      setEscalas(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleCriar(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo || !dataInicio || !dataFim) return;

    await escalasService.criar({
      unidadeId: "00000000-0000-0000-0000-000000000000",
      titulo,
      dataInicio,
      dataFim,
      status: "PLANEJADA",
      observacoes,
    });

    setTitulo("");
    setDataInicio("");
    setDataFim("");
    setObservacoes("");
    setModalAberto(false);
    carregar();
  }

  const escalasFiltradas = escalas.filter((esc) => {
    if (filtroStatus === "TODOS") return true;
    return esc.status === filtroStatus;
  });

  return (
    <div>
      <Header
        titulo="Escalas & Plantões"
        subtitulo="Planejamento e alocação de equipes operacionais da ZapZup"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Filtrar Status:</span>
            <div className="flex gap-1">
              {["TODOS", "PLANEJADA", "EM_ANDAMENTO", "CONCLUIDA"].map((st) => (
                <button
                  key={st}
                  onClick={() => setFiltroStatus(st)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                    filtroStatus === st
                      ? "bg-zap-green-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {st === "TODOS" ? "Todos" : st}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setModalAberto(!modalAberto)}
            variant="green"
            className="gap-2 font-bold"
          >
            <Plus className="h-4 w-4" />
            Nova Escala
          </Button>
        </div>

        {/* Modal / Formulário de Criação Rápida */}
        {modalAberto && (
          <Card className="border-2 border-zap-green-500/50 bg-white dark:bg-slate-900 shadow-lg">
            <CardHeader>
              <CardTitle className="text-base font-bold text-zap-green-700 dark:text-zap-green-400">
                Criar Nova Escala Operacional
              </CardTitle>
              <CardDescription>
                Informe os horários e detalhes do plantão para a equipe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCriar} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Título / Turno da Escala
                  </label>
                  <Input
                    placeholder="Ex: Plantão Operacional Noturno"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Início
                    </label>
                    <Input
                      type="datetime-local"
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Término
                    </label>
                    <Input
                      type="datetime-local"
                      value={dataFim}
                      onChange={(e) => setDataFim(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Observações / Instruções
                  </label>
                  <Input
                    placeholder="Orientações e exigências específicas"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setModalAberto(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" variant="green">
                    Salvar Escala
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Lista de Escalas */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            Carregando escalas do Supabase...
          </div>
        ) : escalasFiltradas.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white dark:bg-slate-900">
            <CalendarDays className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              Nenhuma escala encontrada
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Nenhuma escala cadastrada no momento para este filtro. Clique no botão acima para cadastrar uma nova escala.
            </p>
            <Button variant="green" size="sm" onClick={() => setModalAberto(true)}>
              Cadastrar Escala
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {escalasFiltradas.map((esc) => (
              <Card key={esc.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base font-bold">{esc.titulo}</CardTitle>
                    <Badge variant={esc.status === "EM_ANDAMENTO" ? "green" : "secondary"}>
                      {esc.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs flex items-center gap-1.5 mt-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {formatarData(esc.dataInicio)} - {formatarData(esc.dataFim)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {esc.observacoes && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-md">
                      {esc.observacoes}
                    </p>
                  )}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <UserCheck className="h-3.5 w-3.5 text-zap-green-600" />
                      {esc.participantes?.length || 0} Integrantes
                    </span>
                    <Button variant="ghost" size="sm" className="text-xs text-zap-blue-600 h-7 px-2">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
