import { createClient } from "@/lib/supabase/client";
import { Material, StatusMaterial, TipoMovimentacaoMaterial } from "@/types";

export const materiaisService = {
  async listar(): Promise<Material[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("materiais")
      .select("*")
      .order("nome", { ascending: true });

    if (error) {
      console.warn("Aviso ao buscar materiais:", error.message);
      return [];
    }

    return ((data as any[]) || []).map((m) => ({
      id: m.id,
      unidadeId: m.unidade_id || undefined,
      nome: m.nome,
      categoria: m.categoria,
      codigoPatrimonio: m.codigo_patrimonio || undefined,
      quantidadeDisponivel: Number(m.quantidade_disponivel),
      quantidadeMinima: Number(m.quantidade_minima),
      unidadeMedida: m.unidade_medida,
      status: m.status as StatusMaterial,
      localizacao: m.localizacao || undefined,
      observacoes: m.observacoes || undefined,
      createdAt: m.created_at,
      updatedAt: m.updated_at,
    }));
  },

  async registrarMovimentacao(dados: {
    materialId: string;
    usuarioId: string;
    tipo: TipoMovimentacaoMaterial;
    quantidade: number;
    observacao?: string;
  }): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase.from("materiais_movimentacoes").insert({
      material_id: dados.materialId,
      usuario_id: dados.usuarioId,
      tipo: dados.tipo,
      quantidade: dados.quantidade,
      observacao: dados.observacao,
    });

    return !error;
  },
};
