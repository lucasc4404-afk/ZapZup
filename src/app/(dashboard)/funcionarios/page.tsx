"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  Shield,
  Briefcase,
  UserCheck,
  Search,
  Plus,
  Mail,
  Phone,
  Power,
} from "lucide-react";
import { funcionariosService } from "@/services/funcionariosService";
import { PerfilUsuario, NivelAcesso } from "@/types";

export default function FuncionariosPage() {
  const [usuarios, setUsuarios] = useState<PerfilUsuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroNivel, setFiltroNivel] = useState<string>("TODOS");
  const [termoBusca, setTermoBusca] = useState("");

  async function carregar() {
    setLoading(true);
    try {
      const data = await funcionariosService.listar();
      setUsuarios(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleToggleAtivo(id: string, ativoAtual: boolean) {
    await funcionariosService.toggleAtivo(id, ativoAtual);
    carregar();
  }

  const usuariosFiltrados = usuarios.filter((u) => {
    const matchNivel = filtroNivel === "TODOS" || u.nivelAcesso === filtroNivel;
    const matchBusca =
      u.nomeCompleto.toLowerCase().includes(termoBusca.toLowerCase()) ||
      u.cargo.toLowerCase().includes(termoBusca.toLowerCase()) ||
      u.email.toLowerCase().includes(termoBusca.toLowerCase());
    return matchNivel && matchBusca;
  });

  return (
    <div>
      <Header
        titulo="Gestão de Pessoas & Perfis"
        subtitulo="Controle de Donos, Responsáveis e Funcionários da ZapZup"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Controles de Filtro e Busca */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Nível de Acesso:</span>
            <div className="flex gap-1">
              {[
                { label: "Todos", val: "TODOS" },
                { label: "Donos", val: "DONO" },
                { label: "Responsáveis", val: "RESPONSAVEL" },
                { label: "Funcionários", val: "FUNCIONARIO" },
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => setFiltroNivel(item.val)}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                    filtroNivel === item.val
                      ? "bg-zap-blue-600 text-white font-bold"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar por nome, cargo ou email..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>
            <Button variant="default" className="gap-1.5 bg-zap-blue-600 hover:bg-zap-blue-700 font-bold whitespace-nowrap">
              <Plus className="h-4 w-4" />
              Convidar
            </Button>
          </div>
        </div>

        {/* Estatísticas Rápidas dos Níveis */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-zap-orange-200 dark:border-zap-orange-950 bg-zap-orange-50/50 dark:bg-zap-orange-950/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-zap-orange-100 dark:bg-zap-orange-900/50 flex items-center justify-center text-zap-orange-600">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-zap-orange-800 dark:text-zap-orange-300 font-medium">Donos / Sócios</span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">
                  {usuarios.filter((u) => u.nivelAcesso === "DONO").length}
                </h4>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-zap-blue-200 dark:border-zap-blue-950 bg-zap-blue-50/50 dark:bg-zap-blue-950/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-zap-blue-100 dark:bg-zap-blue-900/50 flex items-center justify-center text-zap-blue-600">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-zap-blue-800 dark:text-zap-blue-300 font-medium">Responsáveis / Liderança</span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">
                  {usuarios.filter((u) => u.nivelAcesso === "RESPONSAVEL").length}
                </h4>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-zap-green-200 dark:border-zap-green-950 bg-zap-green-50/50 dark:bg-zap-green-950/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-zap-green-100 dark:bg-zap-green-900/50 flex items-center justify-center text-zap-green-600">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-zap-green-800 dark:text-zap-green-300 font-medium">Funcionários Operacionais</span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">
                  {usuarios.filter((u) => u.nivelAcesso === "FUNCIONARIO").length}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela / Grid de Usuários */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            Carregando usuários do banco de dados...
          </div>
        ) : usuariosFiltrados.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white dark:bg-slate-900">
            <Users className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              Nenhum perfil encontrado
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Os usuários cadastrados no banco Supabase aparecerão listados aqui de acordo com seu cargo e nível de acesso.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usuariosFiltrados.map((u) => {
              const roleBadge =
                u.nivelAcesso === "DONO"
                  ? "orange"
                  : u.nivelAcesso === "RESPONSAVEL"
                  ? "blue"
                  : "green";

              return (
                <Card key={u.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
                          {u.nomeCompleto.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <CardTitle className="text-sm font-bold">{u.nomeCompleto}</CardTitle>
                          <CardDescription className="text-xs font-medium text-slate-600 dark:text-slate-400">
                            {u.cargo}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={roleBadge}>{u.nivelAcesso}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs text-slate-500 pt-0">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span>{u.email}</span>
                    </div>
                    {u.telefone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        <span>{u.telefone}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="flex items-center gap-1 font-medium">
                        <span className={`h-2 w-2 rounded-full ${u.ativo ? "bg-zap-green-500" : "bg-red-400"}`} />
                        {u.ativo ? "Ativo" : "Inativo"}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleAtivo(u.id, u.ativo)}
                        className="text-[11px] h-7 px-2 text-slate-600 hover:text-slate-900"
                      >
                        <Power className="mr-1 h-3 w-3" />
                        Alternar Status
                      </Button>
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
