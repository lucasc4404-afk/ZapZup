"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  CheckSquare,
  Plus,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  User,
  ListTodo,
} from "lucide-react";
import { missoesService } from "@/services/missoesService";
import { Missao, StatusMissao, PrioridadeMissao } from "@/types";
import { formatarData } from "@/lib/utils";

export default function MissoesPage() {
  const [missoes, setMissoes] = useState<Missao[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string>("TODOS");
  const [modalAberto, setModalAberto] = useState(false);

  // Form states
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState<PrioridadeMissao>("MEDIA");
  const [prazo, setPrazo] = useState("");

  async function carregar() {
    setLoading(true);
    try {
      const data = await missoesService.listar();
      setMissoes(data);
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
    if (!titulo) return;

    await missoesService.criar({
      titulo,
      descricao,
      prioridade,
      prazo: prazo || undefined,
    });

    setTitulo("");
    setDescricao("");
    setPrioridade("MEDIA");
    setPrazo("");
    setModalAberto(false);
    carregar();
  }

  async function handleAtualizarStatus(id: string, status: StatusMissao) {
    await missoesService.atualizarStatus(id, status);
    carregar();
  }

  const missoesFiltradas = missoes.filter((m) => {
    if (filtroStatus === "TODOS") return true;
    return m.status === filtroStatus;
  });

  return (
    <div>
      <Header
        titulo="Missões & Checklists"
        subtitulo="Ordens de serviço, prioridades e acompanhamento operacional ZapZup"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Filtrar:</span>
            <div className="flex gap-1">
              {["TODOS", "PENDENTE", "EM_EXECUCAO", "CONCLUIDA"].map((st) => (
                <button
                  key={st}
                  onClick={() => setFiltroStatus(st)}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                    filtroStatus === st
                      ? "bg-zap-blue-600 text-white font-bold"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {st === "TODOS" ? "Todas" : st.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setModalAberto(!modalAberto)}
            variant="orange"
            className="gap-1.5 font-bold"
          >
            <Plus className="h-4 w-4" />
            Nova Missão
          </Button>
        </div>

        {/* Modal / Formulário de Criação Rápida */}
        {modalAberto && (
          <Card className="border-2 border-zap-orange-500/50 bg-white dark:bg-slate-900 shadow-lg">
            <CardHeader>
              <CardTitle className="text-base font-bold text-zap-orange-700 dark:text-zap-orange-400">
                Cadastrar Nova Missão Operacional
              </CardTitle>
              <CardDescription>
                Defina o objetivo, prazo e prioridade para os responsáveis e executores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCriar} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Título da Missão
                  </label>
                  <Input
                    placeholder="Ex: Vistoria preventiva do polo central"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Descrição Detalhada / Checklist
                  </label>
                  <Input
                    placeholder="Instruções e escopo detalhado"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Prioridade
                    </label>
                    <select
                      value={prioridade}
                      onChange={(e) => setPrioridade(e.target.value as PrioridadeMissao)}
                      className="w-full h-10 px-3 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
                    >
                      <option value="BAIXA">Baixa</option>
                      <option value="MEDIA">Média</option>
                      <option value="ALTA">Alta</option>
                      <option value="URGENTE">Urgente</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Prazo Limite
                    </label>
                    <Input
                      type="datetime-local"
                      value={prazo}
                      onChange={(e) => setPrazo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setModalAberto(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" variant="orange">
                    Cadastrar Missão
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Lista de Missões */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            Carregando missões do banco de dados...
          </div>
        ) : missoesFiltradas.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white dark:bg-slate-900">
            <CheckSquare className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              Nenhuma missão encontrada
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Crie ordens de serviço e missões para que a equipe em campo execute e forneça comprovação.
            </p>
            <Button variant="orange" size="sm" onClick={() => setModalAberto(true)}>
              Cadastrar Missão
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missoesFiltradas.map((m) => {
              const priorityBadge =
                m.prioridade === "URGENTE"
                  ? "destructive"
                  : m.prioridade === "ALTA"
                  ? "orange"
                  : "secondary";

              return (
                <Card key={m.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base font-bold">{m.titulo}</CardTitle>
                      <Badge variant={priorityBadge}>{m.prioridade}</Badge>
                    </div>
                    {m.prazo && (
                      <CardDescription className="text-xs flex items-center gap-1 mt-1 text-slate-500">
                        <Clock className="h-3.5 w-3.5" /> Prazo: {formatarData(m.prazo)}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    {m.descricao && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                        {m.descricao}
                      </p>
                    )}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <Badge variant={m.status === "CONCLUIDA" ? "green" : "blue"}>
                        {m.status.replace("_", " ")}
                      </Badge>
                      <div className="flex gap-1">
                        {m.status !== "CONCLUIDA" && (
                          <Button
                            variant="green"
                            size="sm"
                            className="h-7 text-xs px-2"
                            onClick={() => handleAtualizarStatus(m.id, "CONCLUIDA")}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Concluir
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
