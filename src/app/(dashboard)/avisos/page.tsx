"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Plus,
  Pin,
  AlertTriangle,
  Info,
  Calendar,
  CheckCheck,
} from "lucide-react";
import { avisosService } from "@/services/avisosService";
import { Aviso, PrioridadeAviso } from "@/types";
import { formatarData } from "@/lib/utils";

export default function AvisosPage() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);

  // Form states
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [prioridade, setPrioridade] = useState<PrioridadeAviso>("NORMAL");
  const [fixado, setFixado] = useState(false);

  async function carregar() {
    setLoading(true);
    try {
      const data = await avisosService.listar();
      setAvisos(data);
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
    if (!titulo || !conteudo) return;

    await avisosService.criar({
      autorId: "00000000-0000-0000-0000-000000000000",
      titulo,
      conteudo,
      prioridade,
      fixado,
    });

    setTitulo("");
    setConteudo("");
    setPrioridade("NORMAL");
    setFixado(false);
    setModalAberto(false);
    carregar();
  }

  return (
    <div>
      <Header
        titulo="Mural de Avisos & Comunicados"
        subtitulo="Notificações institucionais, informativos urgentes e leitura obrigatória"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Top Controls */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            {avisos.length} comunicados ativos no mural
          </div>

          <Button
            onClick={() => setModalAberto(!modalAberto)}
            variant="orange"
            className="gap-2 font-bold"
          >
            <Plus className="h-4 w-4" />
            Novo Comunicado
          </Button>
        </div>

        {/* Modal / Formulário de Criação */}
        {modalAberto && (
          <Card className="border-2 border-zap-orange-500/50 bg-white dark:bg-slate-900 shadow-lg">
            <CardHeader>
              <CardTitle className="text-base font-bold text-zap-orange-700 dark:text-zap-orange-400">
                Publicar Comunicado Interno
              </CardTitle>
              <CardDescription>
                Informe o assunto, conteúdo e o nível de prioridade para a equipe ZapZup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCriar} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Título do Aviso
                  </label>
                  <Input
                    placeholder="Ex: Atualização do protocolo de segurança para as equipes"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Conteúdo
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Escreva a íntegra do comunicado..."
                    value={conteudo}
                    onChange={(e) => setConteudo(e.target.value)}
                    required
                    className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zap-blue-500"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Prioridade:
                    </label>
                    <select
                      value={prioridade}
                      onChange={(e) => setPrioridade(e.target.value as PrioridadeAviso)}
                      className="h-9 px-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    >
                      <option value="NORMAL">Normal</option>
                      <option value="IMPORTANTE">Importante</option>
                      <option value="URGENTE">Urgente</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fixado}
                      onChange={(e) => setFixado(e.target.checked)}
                      className="rounded text-zap-orange-500"
                    />
                    Fixar no topo do mural
                  </label>
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
                    Publicar Aviso
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Lista de Avisos */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            Carregando mural de avisos...
          </div>
        ) : avisos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white dark:bg-slate-900">
            <Bell className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              Nenhum aviso publicado
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Publique avisos importantes, alertas de segurança e diretrizes para toda a equipe.
            </p>
            <Button variant="orange" size="sm" onClick={() => setModalAberto(true)}>
              Criar Primeiro Comunicado
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {avisos.map((a) => (
              <Card
                key={a.id}
                className={`hover:shadow-md transition-shadow ${
                  a.fixado ? "border-l-4 border-l-zap-orange-500" : ""
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {a.fixado && <Pin className="h-4 w-4 text-zap-orange-500" />}
                      <CardTitle className="text-base font-bold">{a.titulo}</CardTitle>
                    </div>
                    <Badge
                      variant={
                        a.prioridade === "URGENTE"
                          ? "destructive"
                          : a.prioridade === "IMPORTANTE"
                          ? "orange"
                          : "secondary"
                      }
                    >
                      {a.prioridade}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs flex items-center gap-1 text-slate-400 mt-1">
                    <Calendar className="h-3 w-3" /> Publicado em {formatarData(a.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line">
                  {a.conteudo}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
