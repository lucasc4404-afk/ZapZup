import { createClient } from "@/lib/supabase/client";
import { MidiaRegistro, TipoMidia } from "@/types";

export const midiaService = {
  async listar(tipo?: TipoMidia): Promise<MidiaRegistro[]> {
    const supabase = createClient();
    let query = supabase.from("midias").select("*").order("created_at", { ascending: false });

    if (tipo) {
      query = (query as any).eq("tipo", tipo);
    }

    const { data, error } = await query;
    if (error) {
      console.warn("Aviso ao buscar mídias:", error.message);
      return [];
    }

    return ((data as any[]) || []).map((m) => ({
      id: m.id,
      usuarioId: m.usuario_id,
      missaoId: m.missao_id || undefined,
      escalaId: m.escala_id || undefined,
      tipo: m.tipo as TipoMidia,
      arquivoUrl: m.arquivo_url,
      arquivoNome: m.arquivo_nome,
      tamanhoBytes: m.tamanho_bytes || undefined,
      mimeType: m.mime_type || undefined,
      titulo: m.titulo || undefined,
      descricao: m.descricao || undefined,
      createdAt: m.created_at,
    }));
  },
};
