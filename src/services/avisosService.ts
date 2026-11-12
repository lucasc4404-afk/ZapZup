import { createClient } from "@/lib/supabase/client";
import { Aviso, PrioridadeAviso, NivelAcesso } from "@/types";

export const avisosService = {
  async listar(): Promise<Aviso[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("avisos")
      .select("*")
      .eq("ativo", true)
      .order("fixado", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Aviso ao buscar avisos:", error.message);
      return [];
    }

    return ((data as any[]) || []).map((a) => ({
      id: a.id,
      autorId: a.autor_id,
      unidadeId: a.unidade_id || undefined,
      titulo: a.titulo,
      conteudo: a.conteudo,
      prioridade: a.prioridade as PrioridadeAviso,
      destinatariosNivel: a.destinatarios_nivel as NivelAcesso || undefined,
      fixado: a.fixado,
      ativo: a.ativo,
      createdAt: a.created_at,
      updatedAt: a.updated_at,
    }));
  },

  async criar(aviso: {
    autorId: string;
    titulo: string;
    conteudo: string;
    prioridade: PrioridadeAviso;
    destinatariosNivel?: NivelAcesso;
    fixado?: boolean;
  }): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase.from("avisos").insert({
      autor_id: aviso.autorId,
      titulo: aviso.titulo,
      conteudo: aviso.conteudo,
      prioridade: aviso.prioridade,
      destinatarios_nivel: aviso.destinatariosNivel,
      fixado: aviso.fixado ?? false,
    });

    return !error;
  },
};
