import { createClient } from "@/lib/supabase/client";
import { CanalComunicacao, MensagemComunicacao, TipoCanal } from "@/types";

export const comunicacaoService = {
  async listarCanais(): Promise<CanalComunicacao[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("comunicacao_canais")
      .select("*")
      .eq("ativo", true)
      .order("created_at", { ascending: true });

    if (error) {
      console.warn("Aviso ao buscar canais de comunicação:", error.message);
      return [];
    }

    return (data || []).map((c) => ({
      id: c.id,
      nome: c.nome,
      tipo: c.tipo as TipoCanal,
      unidadeId: c.unidade_id || undefined,
      missaoId: c.missao_id || undefined,
      criadoPor: c.criado_por || undefined,
      ativo: c.ativo,
      createdAt: c.created_at,
    }));
  },

  async listarMensagens(canalId: string): Promise<MensagemComunicacao[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("comunicacao_mensagens")
      .select("*")
      .eq("canal_id", canalId)
      .order("created_at", { ascending: true });

    if (error) {
      console.warn("Aviso ao buscar mensagens:", error.message);
      return [];
    }

    return ((data as any[]) || []).map((m) => ({
      id: m.id,
      canalId: m.canal_id,
      remetenteId: m.remetente_id,
      conteudo: m.conteudo,
      anexoUrl: m.anexo_url || undefined,
      anexoTipo: m.anexo_tipo || undefined,
      createdAt: m.created_at,
    }));
  },

  async enviarMensagem(canalId: string, remetenteId: string, conteudo: string): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase.from("comunicacao_mensagens").insert({
      canal_id: canalId,
      remetente_id: remetenteId,
      conteudo,
    });

    return !error;
  },
};
