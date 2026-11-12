import { createClient } from "@/lib/supabase/client";
import { Escala, StatusEscala } from "@/types";

export const escalasService = {
  async listar(): Promise<Escala[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("escalas")
      .select("*")
      .order("data_inicio", { ascending: false });

    if (error) {
      console.warn("Aviso ao buscar escalas no Supabase:", error.message);
      return [];
    }

    return ((data as any[]) || []).map((item) => ({
      id: item.id,
      unidadeId: item.unidade_id,
      titulo: item.titulo,
      dataInicio: item.data_inicio,
      dataFim: item.data_fim,
      status: item.status as StatusEscala,
      observacoes: item.observacoes || undefined,
      criadoPor: item.criado_por || undefined,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  },

  async criar(escala: Omit<Escala, "id" | "createdAt" | "updatedAt">): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase.from("escalas").insert({
      unidade_id: escala.unidadeId,
      titulo: escala.titulo,
      data_inicio: escala.dataInicio,
      data_fim: escala.dataFim,
      status: escala.status,
      observacoes: escala.observacoes,
      criado_por: escala.criadoPor,
    });

    if (error) {
      console.error("Erro ao criar escala:", error.message);
      return false;
    }
    return true;
  },

  async atualizarStatus(id: string, status: StatusEscala): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase
      .from("escalas")
      .update({ status })
      .eq("id", id);

    return !error;
  },
};
