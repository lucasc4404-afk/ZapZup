import { createClient } from "@/lib/supabase/client";
import { PerfilUsuario, NivelAcesso } from "@/types";

export const funcionariosService = {
  async listar(filtroNivel?: NivelAcesso): Promise<PerfilUsuario[]> {
    const supabase = createClient();
    let query = supabase.from("perfis").select("*").order("nome_completo", { ascending: true });

    if (filtroNivel) {
      query = query.eq("nivel_acesso", filtroNivel);
    }

    const { data, error } = await query;
    if (error) {
      console.warn("Aviso ao buscar usuários/funcionários:", error.message);
      return [];
    }

    return ((data as any[]) || []).map((p) => ({
      id: p.id,
      unidadeId: p.unidade_id || undefined,
      nomeCompleto: p.nome_completo,
      email: p.email,
      telefone: p.telefone || undefined,
      cpf: p.cpf || undefined,
      cargo: p.cargo,
      nivelAcesso: p.nivel_acesso as NivelAcesso,
      ativo: p.ativo,
      avatarUrl: p.avatar_url || undefined,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    }));
  },

  async atualizarNivel(id: string, nivelAcesso: NivelAcesso): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase
      .from("perfis")
      .update({ nivel_acesso: nivelAcesso })
      .eq("id", id);

    return !error;
  },

  async toggleAtivo(id: string, ativoAtual: boolean): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase
      .from("perfis")
      .update({ ativo: !ativoAtual })
      .eq("id", id);

    return !error;
  },
};
