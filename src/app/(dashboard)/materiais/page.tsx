"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Package,
  Plus,
  ArrowDownCircle,
  ArrowUpCircle,
  AlertTriangle,
  Search,
  CheckCircle,
  Layers,
} from "lucide-react";
import { materiaisService } from "@/services/materiaisService";
import { Material } from "@/types";

export default function MateriaisPage() {
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");

  async function carregar() {
    setLoading(true);
    try {
      const data = await materiaisService.listar();
      setMateriais(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  const materiaisFiltrados = materiais.filter((m) =>
    m.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    m.categoria.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div>
      <Header
        titulo="Materiais, Insumos & Equipamentos"
        subtitulo="Controle de estoque, almoxarifado e movimentações da ZapZup"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por material ou categoria..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="gap-1.5 text-xs">
              <ArrowDownCircle className="h-4 w-4 text-zap-orange-500" />
              Registrar Retirada
            </Button>
            <Button variant="green" className="gap-1.5 text-xs font-bold">
              <Plus className="h-4 w-4" />
              Novo Item
            </Button>
          </div>
        </div>

        {/* Lista de Materiais */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            Carregando inventário de materiais...
          </div>
        ) : materiaisFiltrados.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white dark:bg-slate-900">
            <Package className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              Nenhum material no estoque
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Cadastre equipamentos, ferramentas e insumos para controlar retiradas e devoluções da equipe em campo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materiaisFiltrados.map((m) => {
              const estoqueBaixo = m.quantidadeDisponivel <= m.quantidadeMinima;

              return (
                <Card key={m.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base font-bold">{m.nome}</CardTitle>
                        <CardDescription className="text-xs font-semibold text-zap-blue-600">
                          {m.categoria}
                        </CardDescription>
                      </div>
                      <Badge variant={estoqueBaixo ? "destructive" : "green"}>
                        {m.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0 text-xs">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Disponível
                        </span>
                        <span className="text-lg font-black text-slate-900 dark:text-white">
                          {m.quantidadeDisponivel} {m.unidadeMedida}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Mínimo Seguro
                        </span>
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                          {m.quantidadeMinima} {m.unidadeMedida}
                        </span>
                      </div>
                    </div>

                    {estoqueBaixo && (
                      <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-semibold text-[11px]">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Atenção: Estoque próximo ou abaixo do limite mínimo!
                      </div>
                    )}
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
