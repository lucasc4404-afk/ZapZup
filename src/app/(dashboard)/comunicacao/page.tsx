"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Send,
  Hash,
  Users,
  Paperclip,
  Smile,
  ShieldAlert,
} from "lucide-react";
import { comunicacaoService } from "@/services/comunicacaoService";
import { CanalComunicacao, MensagemComunicacao } from "@/types";
import { formatarHora } from "@/lib/utils";

export default function ComunicacaoPage() {
  const [canais, setCanais] = useState<CanalComunicacao[]>([]);
  const [canalAtivo, setCanalAtivo] = useState<CanalComunicacao | null>(null);
  const [mensagens, setMensagens] = useState<MensagemComunicacao[]>([]);
  const [conteudo, setConteudo] = useState("");
  const [loading, setLoading] = useState(true);

  async function carregarCanais() {
    setLoading(true);
    try {
      const data = await comunicacaoService.listarCanais();
      setCanais(data);
      if (data.length > 0 && !canalAtivo) {
        setCanalAtivo(data[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarCanais();
  }, []);

  useEffect(() => {
    if (canalAtivo) {
      comunicacaoService.listarMensagens(canalAtivo.id).then(setMensagens);
    }
  }, [canalAtivo]);

  async function handleEnviar(e: React.FormEvent) {
    e.preventDefault();
    if (!conteudo || !canalAtivo) return;

    await comunicacaoService.enviarMensagem(
      canalAtivo.id,
      "00000000-0000-0000-0000-000000000000",
      conteudo
    );

    setConteudo("");
    const atualizadas = await comunicacaoService.listarMensagens(canalAtivo.id);
    setMensagens(atualizadas);
  }

  return (
    <div>
      <Header
        titulo="Comunicação & Chat Interno"
        subtitulo="Canais operacionais em tempo real da equipe ZapZup"
      />

      <div className="p-6 max-w-7xl mx-auto">
        <div className="h-[calc(100vh-12rem)] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col md:flex-row overflow-hidden">
          {/* Barra Lateral de Canais */}
          <div className="w-full md:w-72 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-950/40">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-zap-blue-600" />
                Canais Operacionais
              </h3>
              <p className="text-[11px] text-slate-400">
                Segmentados por unidade e missão
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {canais.length === 0 ? (
                <div className="p-4 text-xs text-slate-400 text-center">
                  <Hash className="h-6 w-6 mx-auto mb-2 opacity-50" />
                  Nenhum canal aberto. Os canais criados no Supabase aparecerão aqui.
                </div>
              ) : (
                canais.map((c) => {
                  const isSelected = canalAtivo?.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCanalAtivo(c)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-zap-blue-600 text-white"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Hash className="h-3.5 w-3.5 opacity-70" />
                        {c.nome}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`text-[9px] px-1.5 py-0 ${
                          isSelected ? "bg-white/20 text-white" : ""
                        }`}
                      >
                        {c.tipo}
                      </Badge>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Área Principal de Conversa */}
          <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900">
            {/* Header do Canal */}
            <div className="h-14 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-zap-blue-600" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {canalAtivo ? canalAtivo.nome : "Canal Geral da Operação"}
                </h4>
              </div>
              <span className="text-xs text-slate-400">
                Mensagens criptografadas & registradas
              </span>
            </div>

            {/* Lista de Mensagens */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {mensagens.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 text-xs">
                  <MessageSquare className="h-10 w-10 text-slate-300 dark:text-slate-700 mb-2" />
                  <p className="font-semibold text-slate-600 dark:text-slate-300">
                    Nenhuma mensagem neste canal ainda.
                  </p>
                  <p className="text-[11px] mt-1 max-w-xs">
                    Inicie a conversa operacional para alinhar procedimentos com os responsáveis e executores.
                  </p>
                </div>
              ) : (
                mensagens.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                      ZZ
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          Colaborador ZapZup
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {formatarHora(msg.createdAt)}
                        </span>
                      </div>
                      <div className="mt-1 p-3 rounded-lg rounded-tl-none bg-slate-100 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200">
                        {msg.conteudo}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input de Mensagem */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <form onSubmit={handleEnviar} className="flex items-center gap-2">
                <Input
                  placeholder="Digite uma mensagem para a equipe..."
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  className="flex-1 text-xs"
                />
                <Button type="submit" variant="default" size="icon" className="bg-zap-blue-600 hover:bg-zap-blue-700">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
