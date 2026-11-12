"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Video,
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
  Calendar,
  Eye,
} from "lucide-react";
import { midiaService } from "@/services/midiaService";
import { MidiaRegistro, TipoMidia } from "@/types";
import { formatarData } from "@/lib/utils";

export default function MidiaPage() {
  const [midias, setMidias] = useState<MidiaRegistro[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState<string>("TODOS");

  async function carregar() {
    setLoading(true);
    try {
      const data = await midiaService.listar(
        filtroTipo === "TODOS" ? undefined : (filtroTipo as TipoMidia)
      );
      setMidias(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [filtroTipo]);

  return (
    <div>
      <Header
        titulo="Fotos & Vídeos Operacionais"
        subtitulo="Registros visuais de campo, comprovações e vistorias da ZapZup"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Filtrar:</span>
            <div className="flex gap-1">
              {[
                { label: "Todas", val: "TODOS" },
                { label: "Fotos", val: "FOTO" },
                { label: "Vídeos", val: "VIDEO" },
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => setFiltroTipo(item.val)}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                    filtroTipo === item.val
                      ? "bg-rose-600 text-white font-bold"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <Button variant="default" className="gap-2 bg-rose-600 hover:bg-rose-700 font-bold">
            <UploadCloud className="h-4 w-4" />
            Enviar Comprovação Visual
          </Button>
        </div>

        {/* Área de Upload Rápido / Drag & Drop */}
        <div className="rounded-xl border-2 border-dashed border-rose-300 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/10 p-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 mb-3">
            <UploadCloud className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Solte suas fotos ou vídeos de comprovação aqui
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
            Suporta imagens (PNG, JPG) e vídeos de vistorias vinculados a escalas ou missões operacionais.
          </p>
          <Button variant="outline" size="sm" className="text-xs">
            Selecionar Arquivos do Dispositivo
          </Button>
        </div>

        {/* Galeria de Registros Visuais */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            Carregando galeria de mídias...
          </div>
        ) : midias.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white dark:bg-slate-900">
            <Camera className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              Nenhuma mídia registrada ainda
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Fotos e vídeos enviados pelos funcionários em campo aparecerão catalogados aqui para auditoria de donos e responsáveis.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {midias.map((m) => (
              <Card key={m.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center">
                  {m.tipo === "VIDEO" ? (
                    <Video className="h-8 w-8 text-slate-400" />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-slate-400" />
                  )}
                  <Badge
                    variant="secondary"
                    className="absolute top-2 right-2 text-[10px] bg-black/60 text-white border-none"
                  >
                    {m.tipo}
                  </Badge>
                </div>
                <CardContent className="p-3 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {m.titulo || m.arquivoNome}
                  </h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {formatarData(m.createdAt)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
