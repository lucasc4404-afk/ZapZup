export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      unidades: {
        Row: {
          id: string;
          nome: string;
          codigo_identificador: string | null;
          endereco: string | null;
          cidade: string | null;
          estado: string | null;
          telefone: string | null;
          ativo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          codigo_identificador?: string | null;
          endereco?: string | null;
          cidade?: string | null;
          estado?: string | null;
          telefone?: string | null;
          ativo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          codigo_identificador?: string | null;
          endereco?: string | null;
          cidade?: string | null;
          estado?: string | null;
          telefone?: string | null;
          ativo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      perfis: {
        Row: {
          id: string;
          unidade_id: string | null;
          nome_completo: string;
          email: string;
          telefone: string | null;
          cpf: string | null;
          cargo: string;
          nivel_acesso: 'DONO' | 'RESPONSAVEL' | 'FUNCIONARIO';
          ativo: boolean;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          unidade_id?: string | null;
          nome_completo: string;
          email: string;
          telefone?: string | null;
          cpf?: string | null;
          cargo: string;
          nivel_acesso?: 'DONO' | 'RESPONSAVEL' | 'FUNCIONARIO';
          ativo?: boolean;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          unidade_id?: string | null;
          nome_completo?: string;
          email?: string;
          telefone?: string | null;
          cpf?: string | null;
          cargo?: string;
          nivel_acesso?: 'DONO' | 'RESPONSAVEL' | 'FUNCIONARIO';
          ativo?: boolean;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      escalas: {
        Row: {
          id: string;
          unidade_id: string | null;
          titulo: string;
          data_inicio: string;
          data_fim: string;
          status: 'PLANEJADA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
          observacoes: string | null;
          criado_por: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          unidade_id?: string | null;
          titulo: string;
          data_inicio: string;
          data_fim: string;
          status?: 'PLANEJADA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
          observacoes?: string | null;
          criado_por?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          unidade_id?: string | null;
          titulo?: string;
          data_inicio?: string;
          data_fim?: string;
          status?: 'PLANEJADA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
          observacoes?: string | null;
          criado_por?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      escala_participantes: {
        Row: {
          id: string;
          escala_id: string;
          usuario_id: string;
          funcao_escala: string | null;
          confirmou_presenca: boolean;
          check_in: string | null;
          check_out: string | null;
          observacao: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          escala_id: string;
          usuario_id: string;
          funcao_escala?: string | null;
          confirmou_presenca?: boolean;
          check_in?: string | null;
          check_out?: string | null;
          observacao?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          escala_id?: string;
          usuario_id?: string;
          funcao_escala?: string | null;
          confirmou_presenca?: boolean;
          check_in?: string | null;
          check_out?: string | null;
          observacao?: string | null;
          created_at?: string;
        };
      };
      missoes: {
        Row: {
          id: string;
          unidade_id: string | null;
          escala_id: string | null;
          titulo: string;
          descricao: string | null;
          prioridade: 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';
          status: 'PENDENTE' | 'EM_EXECUCAO' | 'CONCLUIDA' | 'CANCELADA';
          responsavel_id: string | null;
          prazo: string | null;
          data_conclusao: string | null;
          criado_por: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          unidade_id?: string | null;
          escala_id?: string | null;
          titulo: string;
          descricao?: string | null;
          prioridade?: 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';
          status?: 'PENDENTE' | 'EM_EXECUCAO' | 'CONCLUIDA' | 'CANCELADA';
          responsavel_id?: string | null;
          prazo?: string | null;
          data_conclusao?: string | null;
          criado_por?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          unidade_id?: string | null;
          escala_id?: string | null;
          titulo?: string;
          descricao?: string | null;
          prioridade?: 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';
          status?: 'PENDENTE' | 'EM_EXECUCAO' | 'CONCLUIDA' | 'CANCELADA';
          responsavel_id?: string | null;
          prazo?: string | null;
          data_conclusao?: string | null;
          criado_por?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      missao_tarefas: {
        Row: {
          id: string;
          missao_id: string;
          ordem: number;
          descricao: string;
          concluida: boolean;
          concluida_por: string | null;
          data_conclusao: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          missao_id: string;
          ordem?: number;
          descricao: string;
          concluida?: boolean;
          concluida_por?: string | null;
          data_conclusao?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          missao_id?: string;
          ordem?: number;
          descricao?: string;
          concluida?: boolean;
          concluida_por?: string | null;
          data_conclusao?: string | null;
          created_at?: string;
        };
      };
      materiais: {
        Row: {
          id: string;
          unidade_id: string | null;
          nome: string;
          categoria: string;
          codigo_patrimonio: string | null;
          quantidade_disponivel: number;
          quantidade_minima: number;
          unidade_medida: string;
          status: 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'ESGOTADO';
          localizacao: string | null;
          observacoes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          unidade_id?: string | null;
          nome: string;
          categoria: string;
          codigo_patrimonio?: string | null;
          quantidade_disponivel?: number;
          quantidade_minima?: number;
          unidade_medida?: string;
          status?: 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'ESGOTADO';
          localizacao?: string | null;
          observacoes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          unidade_id?: string | null;
          nome?: string;
          categoria?: string;
          codigo_patrimonio?: string | null;
          quantidade_disponivel?: number;
          quantidade_minima?: number;
          unidade_medida?: string;
          status?: 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'ESGOTADO';
          localizacao?: string | null;
          observacoes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      materiais_movimentacoes: {
        Row: {
          id: string;
          material_id: string;
          usuario_id: string;
          missao_id: string | null;
          tipo: 'RETIRADA' | 'DEVOLUCAO' | 'AJUSTE' | 'ENTRADA';
          quantidade: number;
          observacao: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          material_id: string;
          usuario_id: string;
          missao_id?: string | null;
          tipo: 'RETIRADA' | 'DEVOLUCAO' | 'AJUSTE' | 'ENTRADA';
          quantidade: number;
          observacao?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          material_id?: string;
          usuario_id?: string;
          missao_id?: string | null;
          tipo?: 'RETIRADA' | 'DEVOLUCAO' | 'AJUSTE' | 'ENTRADA';
          quantidade?: number;
          observacao?: string | null;
          created_at?: string;
        };
      };
      midias: {
        Row: {
          id: string;
          usuario_id: string;
          missao_id: string | null;
          escala_id: string | null;
          tipo: 'FOTO' | 'VIDEO';
          arquivo_url: string;
          arquivo_nome: string;
          tamanho_bytes: number | null;
          mime_type: string | null;
          titulo: string | null;
          descricao: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          usuario_id: string;
          missao_id?: string | null;
          escala_id?: string | null;
          tipo?: 'FOTO' | 'VIDEO';
          arquivo_url: string;
          arquivo_nome: string;
          tamanho_bytes?: number | null;
          mime_type?: string | null;
          titulo?: string | null;
          descricao?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          usuario_id?: string;
          missao_id?: string | null;
          escala_id?: string | null;
          tipo?: 'FOTO' | 'VIDEO';
          arquivo_url?: string;
          arquivo_nome?: string;
          tamanho_bytes?: number | null;
          mime_type?: string | null;
          titulo?: string | null;
          descricao?: string | null;
          created_at?: string;
        };
      };
      avisos: {
        Row: {
          id: string;
          autor_id: string;
          unidade_id: string | null;
          titulo: string;
          conteudo: string;
          prioridade: 'NORMAL' | 'IMPORTANTE' | 'URGENTE';
          destinatarios_nivel: 'DONO' | 'RESPONSAVEL' | 'FUNCIONARIO' | null;
          fixado: boolean;
          ativo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          autor_id: string;
          unidade_id?: string | null;
          titulo: string;
          conteudo: string;
          prioridade?: 'NORMAL' | 'IMPORTANTE' | 'URGENTE';
          destinatarios_nivel?: 'DONO' | 'RESPONSAVEL' | 'FUNCIONARIO' | null;
          fixado?: boolean;
          ativo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          autor_id?: string;
          unidade_id?: string | null;
          titulo?: string;
          conteudo?: string;
          prioridade?: 'NORMAL' | 'IMPORTANTE' | 'URGENTE';
          destinatarios_nivel?: 'DONO' | 'RESPONSAVEL' | 'FUNCIONARIO' | null;
          fixado?: boolean;
          ativo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      comunicacao_canais: {
        Row: {
          id: string;
          nome: string;
          tipo: 'GERAL' | 'UNIDADE' | 'MISSAO' | 'DIRETO';
          unidade_id: string | null;
          missao_id: string | null;
          criado_por: string | null;
          ativo: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          tipo?: 'GERAL' | 'UNIDADE' | 'MISSAO' | 'DIRETO';
          unidade_id?: string | null;
          missao_id?: string | null;
          criado_por?: string | null;
          ativo?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          tipo?: 'GERAL' | 'UNIDADE' | 'MISSAO' | 'DIRETO';
          unidade_id?: string | null;
          missao_id?: string | null;
          criado_por?: string | null;
          ativo?: boolean;
          created_at?: string;
        };
      };
      comunicacao_mensagens: {
        Row: {
          id: string;
          canal_id: string;
          remetente_id: string;
          conteudo: string;
          anexo_url: string | null;
          anexo_tipo: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          canal_id: string;
          remetente_id: string;
          conteudo: string;
          anexo_url?: string | null;
          anexo_tipo?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          canal_id?: string;
          remetente_id?: string;
          conteudo?: string;
          anexo_url?: string | null;
          anexo_tipo?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      nivel_acesso_enum: 'DONO' | 'RESPONSAVEL' | 'FUNCIONARIO';
      status_escala_enum: 'PLANEJADA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
      prioridade_missao_enum: 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';
      status_missao_enum: 'PENDENTE' | 'EM_EXECUCAO' | 'CONCLUIDA' | 'CANCELADA';
      status_material_enum: 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'ESGOTADO';
      tipo_movimentacao_material_enum: 'RETIRADA' | 'DEVOLUCAO' | 'AJUSTE' | 'ENTRADA';
      tipo_midia_enum: 'FOTO' | 'VIDEO';
      prioridade_aviso_enum: 'NORMAL' | 'IMPORTANTE' | 'URGENTE';
      tipo_canal_enum: 'GERAL' | 'UNIDADE' | 'MISSAO' | 'DIRETO';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
