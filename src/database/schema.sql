-- ==============================================================================
-- ZAPZUP PLATFORM - SCHEMA DE BANCO DE DADOS (SUPABASE / POSTGRESQL)
-- Arquitetura Oficial: Donos, Responsáveis, Escalas, Funcionários, Missões,
-- Materiais, Fotos & Vídeos, Avisos e Comunicação.
-- ==============================================================================

-- Habilita extensão para UUIDs se ainda não estiver ativa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. TIPOS ENUMERADOS DO SISTEMA
-- ------------------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE nivel_acesso_enum AS ENUM ('DONO', 'RESPONSAVEL', 'FUNCIONARIO');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE status_escala_enum AS ENUM ('PLANEJADA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE prioridade_missao_enum AS ENUM ('BAIXA', 'MEDIA', 'ALTA', 'URGENTE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE status_missao_enum AS ENUM ('PENDENTE', 'EM_EXECUCAO', 'CONCLUIDA', 'CANCELADA');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE status_material_enum AS ENUM ('DISPONIVEL', 'EM_USO', 'MANUTENCAO', 'ESGOTADO');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE tipo_movimentacao_material_enum AS ENUM ('RETIRADA', 'DEVOLUCAO', 'AJUSTE', 'ENTRADA');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE tipo_midia_enum AS ENUM ('FOTO', 'VIDEO');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE prioridade_aviso_enum AS ENUM ('NORMAL', 'IMPORTANTE', 'URGENTE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE tipo_canal_enum AS ENUM ('GERAL', 'UNIDADE', 'MISSAO', 'DIRETO');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ------------------------------------------------------------------------------
-- 2. TABELA DE UNIDADES OPERACIONAIS / FILIAIS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.unidades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(150) NOT NULL,
    codigo_identificador VARCHAR(50) UNIQUE,
    endereco TEXT,
    cidade VARCHAR(100),
    estado VARCHAR(2),
    telefone VARCHAR(20),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 3. PERFIS DE USUÁRIOS (DONOS, RESPONSÁVEIS, FUNCIONÁRIOS)
-- Vinculado ao auth.users do Supabase
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.perfis (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    unidade_id UUID REFERENCES public.unidades(id) ON DELETE SET NULL,
    nome_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    cpf VARCHAR(14) UNIQUE,
    cargo VARCHAR(100) NOT NULL,
    nivel_acesso nivel_acesso_enum NOT NULL DEFAULT 'FUNCIONARIO',
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 4. ESCALAS DE TRABALHO E PLANTÕES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.escalas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unidade_id UUID REFERENCES public.unidades(id) ON DELETE CASCADE,
    titulo VARCHAR(200) NOT NULL,
    data_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    data_fim TIMESTAMP WITH TIME ZONE NOT NULL,
    status status_escala_enum NOT NULL DEFAULT 'PLANEJADA',
    observacoes TEXT,
    criado_por UUID REFERENCES public.perfis(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Integrantes alocados na escala
CREATE TABLE IF NOT EXISTS public.escala_participantes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    escala_id UUID NOT NULL REFERENCES public.escalas(id) ON DELETE CASCADE,
    usuario_id UUID NOT NULL REFERENCES public.perfis(id) ON DELETE CASCADE,
    funcao_escala VARCHAR(100),
    confirmou_presenca BOOLEAN NOT NULL DEFAULT FALSE,
    check_in TIMESTAMP WITH TIME ZONE,
    check_out TIMESTAMP WITH TIME ZONE,
    observacao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(escala_id, usuario_id)
);

-- ------------------------------------------------------------------------------
-- 5. MISSÕES OPERACIONAIS E CHECKLISTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.missoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unidade_id UUID REFERENCES public.unidades(id) ON DELETE SET NULL,
    escala_id UUID REFERENCES public.escalas(id) ON DELETE SET NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    prioridade prioridade_missao_enum NOT NULL DEFAULT 'MEDIA',
    status status_missao_enum NOT NULL DEFAULT 'PENDENTE',
    responsavel_id UUID REFERENCES public.perfis(id) ON DELETE SET NULL,
    prazo TIMESTAMP WITH TIME ZONE,
    data_conclusao TIMESTAMP WITH TIME ZONE,
    criado_por UUID REFERENCES public.perfis(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tarefas / itens de checklist da missão
CREATE TABLE IF NOT EXISTS public.missao_tarefas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    missao_id UUID NOT NULL REFERENCES public.missoes(id) ON DELETE CASCADE,
    ordem INT NOT NULL DEFAULT 0,
    descricao TEXT NOT NULL,
    concluida BOOLEAN NOT NULL DEFAULT FALSE,
    concluida_por UUID REFERENCES public.perfis(id) ON DELETE SET NULL,
    data_conclusao TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 6. MATERIAIS, INSUMOS, EQUIPAMENTOS E CONTROLE DE ESTOQUE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.materiais (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unidade_id UUID REFERENCES public.unidades(id) ON DELETE SET NULL,
    nome VARCHAR(200) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    codigo_patrimonio VARCHAR(100),
    quantidade_disponivel NUMERIC(10, 2) NOT NULL DEFAULT 0,
    quantidade_minima NUMERIC(10, 2) NOT NULL DEFAULT 0,
    unidade_medida VARCHAR(20) NOT NULL DEFAULT 'UN',
    status status_material_enum NOT NULL DEFAULT 'DISPONIVEL',
    localizacao VARCHAR(150),
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Movimentações de materiais (retiradas, devoluções, baixas, entradas)
CREATE TABLE IF NOT EXISTS public.materiais_movimentacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    material_id UUID NOT NULL REFERENCES public.materiais(id) ON DELETE CASCADE,
    usuario_id UUID NOT NULL REFERENCES public.perfis(id) ON DELETE RESTRICT,
    missao_id UUID REFERENCES public.missoes(id) ON DELETE SET NULL,
    tipo tipo_movimentacao_material_enum NOT NULL,
    quantidade NUMERIC(10, 2) NOT NULL,
    observacao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 7. FOTOS E VÍDEOS (REGISTRO VISUAL E COMPROVAÇÕES)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.midias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES public.perfis(id) ON DELETE CASCADE,
    missao_id UUID REFERENCES public.missoes(id) ON DELETE SET NULL,
    escala_id UUID REFERENCES public.escalas(id) ON DELETE SET NULL,
    tipo tipo_midia_enum NOT NULL DEFAULT 'FOTO',
    arquivo_url TEXT NOT NULL,
    arquivo_nome VARCHAR(255) NOT NULL,
    tamanho_bytes BIGINT,
    mime_type VARCHAR(100),
    titulo VARCHAR(200),
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 8. AVISOS E COMUNICADOS INTERNOS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.avisos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    autor_id UUID NOT NULL REFERENCES public.perfis(id) ON DELETE CASCADE,
    unidade_id UUID REFERENCES public.unidades(id) ON DELETE SET NULL,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    prioridade prioridade_aviso_enum NOT NULL DEFAULT 'NORMAL',
    destinatarios_nivel nivel_acesso_enum, -- NULL significa para todos
    fixado BOOLEAN NOT NULL DEFAULT FALSE,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Registro de visualização/leitura de avisos
CREATE TABLE IF NOT EXISTS public.aviso_leituras (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    aviso_id UUID NOT NULL REFERENCES public.avisos(id) ON DELETE CASCADE,
    usuario_id UUID NOT NULL REFERENCES public.perfis(id) ON DELETE CASCADE,
    lido_em TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(aviso_id, usuario_id)
);

-- ------------------------------------------------------------------------------
-- 9. COMUNICAÇÃO INTERNA (CANAIS E MENSAGENS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.comunicacao_canais (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(150) NOT NULL,
    tipo tipo_canal_enum NOT NULL DEFAULT 'GERAL',
    unidade_id UUID REFERENCES public.unidades(id) ON DELETE CASCADE,
    missao_id UUID REFERENCES public.missoes(id) ON DELETE CASCADE,
    criado_por UUID REFERENCES public.perfis(id) ON DELETE SET NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.comunicacao_mensagens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    canal_id UUID NOT NULL REFERENCES public.comunicacao_canais(id) ON DELETE CASCADE,
    remetente_id UUID NOT NULL REFERENCES public.perfis(id) ON DELETE CASCADE,
    conteudo TEXT NOT NULL,
    anexo_url TEXT,
    anexo_tipo VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 10. SEGURANÇA E POLÍTICAS RLS (ROW LEVEL SECURITY)
-- ------------------------------------------------------------------------------
ALTER TABLE public.perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escalas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escala_participantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missao_tarefas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materiais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materiais_movimentacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.midias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.avisos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aviso_leituras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comunicacao_canais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comunicacao_mensagens ENABLE ROW LEVEL SECURITY;

-- Políticas de Leitura e Edição
CREATE POLICY "Perfis visiveis por autenticados" ON public.perfis FOR SELECT TO authenticated USING (true);
CREATE POLICY "Usuario atualiza proprio perfil" ON public.perfis FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Unidades visiveis por autenticados" ON public.unidades FOR SELECT TO authenticated USING (true);
CREATE POLICY "Escalas visiveis por autenticados" ON public.escalas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Participantes escala visiveis" ON public.escala_participantes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Missoes visiveis por autenticados" ON public.missoes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Tarefas de missao visiveis" ON public.missao_tarefas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Materiais visiveis por autenticados" ON public.materiais FOR SELECT TO authenticated USING (true);
CREATE POLICY "Movimentacoes visiveis por autenticados" ON public.materiais_movimentacoes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Midias visiveis por autenticados" ON public.midias FOR SELECT TO authenticated USING (true);
CREATE POLICY "Avisos visiveis por autenticados" ON public.avisos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Leituras visiveis por autenticados" ON public.aviso_leituras FOR SELECT TO authenticated USING (true);
CREATE POLICY "Canais visiveis por autenticados" ON public.comunicacao_canais FOR SELECT TO authenticated USING (true);
CREATE POLICY "Mensagens visiveis por autenticados" ON public.comunicacao_mensagens FOR SELECT TO authenticated USING (true);
CREATE POLICY "Mensagens inseridas por autenticados" ON public.comunicacao_mensagens FOR INSERT TO authenticated WITH CHECK (auth.uid() = remetente_id);

-- Índices essenciais para alta performance
CREATE INDEX IF NOT EXISTS idx_perfis_nivel ON public.perfis(nivel_acesso);
CREATE INDEX IF NOT EXISTS idx_escalas_datas ON public.escalas(data_inicio, data_fim);
CREATE INDEX IF NOT EXISTS idx_missoes_status ON public.missoes(status);
CREATE INDEX IF NOT EXISTS idx_materiais_categoria ON public.materiais(categoria);
CREATE INDEX IF NOT EXISTS idx_midias_missao ON public.midias(missao_id);
CREATE INDEX IF NOT EXISTS idx_mensagens_canal ON public.comunicacao_mensagens(canal_id, created_at);
