import { createClient } from "@/lib/supabase/client";
import { Missao, StatusMissao, PrioridadeMissao } from "@/types";

export const missoesService = {
  async listar(): Promise<Missao[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("missoes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Aviso ao buscar missões:", error.message);
      return [];
    }

    return ((data as any[]) || []).map((m) => ({
      id: m.id,
      unidadeId: m.unidade_id || undefined,
      escalaId: m.escala_id || undefined,
      titulo: m.titulo,
      descricao: m.descricao || undefined,
      prioridade: m.prioridade as PrioridadeMissao,
      status: m.status as StatusMissao,
      responsavelId: m.responsavel_id || undefined,
      prazo: m.prazo || undefined,
      dataConclusao: m.data_conclusao || undefined,
      criadoPor: m.criado_por || undefined,
      createdAt: m.created_at,
      updatedAt: m.updated_at,
    }));
  },

  async criar(missao: {
    titulo: string;
    descricao?: string;
    prioridade: PrioridadeMissao;
    responsavelId?: string;
    prazo?: string;
  }): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase.from("missoes").insert({
      titulo: missao.titulo,
      descricao: missao.descricao,
      prioridade: missao.prioridade,
      responsavel_id: missao.responsavelId,
      prazo: missao.prazo,
      status: "PENDENTE",
    });

    return !error;
  },

  async atualizarStatus(id: string, status: StatusMissao): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase
      .from("missoes")
      .update({
        status,
        data_conclusao: status === "CONCLUIDA" ? new Date().toISOString() : null,
      })
      .eq("id", id);

    return !error;
  },
};
