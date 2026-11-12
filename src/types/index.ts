// ==============================================================================
// ZAPZUP PLATFORM - DEFINIÇÕES DE TIPOS E MODELOS DE DADOS
// ==============================================================================

export type NivelAcesso = 'DONO' | 'RESPONSAVEL' | 'FUNCIONARIO';

export interface Unidade {
  id: string;
  nome: string;
  codigoIdentificador?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  telefone?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PerfilUsuario {
  id: string;
  unidadeId?: string;
  nomeCompleto: string;
  email: string;
  telefone?: string;
  cpf?: string;
  cargo: string;
  nivelAcesso: NivelAcesso;
  ativo: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type StatusEscala = 'PLANEJADA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';

export interface EscalaParticipante {
  id: string;
  escalaId: string;
  usuarioId: string;
  funcaoEscala?: string;
  confirmouPresenca: boolean;
  checkIn?: string;
  checkOut?: string;
  observacao?: string;
  usuario?: PerfilUsuario;
}

export interface Escala {
  id: string;
  unidadeId: string;
  titulo: string;
  dataInicio: string;
  dataFim: string;
  status: StatusEscala;
  observacoes?: string;
  criadoPor?: string;
  participantes?: EscalaParticipante[];
  unidade?: Unidade;
  createdAt: string;
  updatedAt: string;
}

export type PrioridadeMissao = 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';
export type StatusMissao = 'PENDENTE' | 'EM_EXECUCAO' | 'CONCLUIDA' | 'CANCELADA';

export interface MissaoTarefa {
  id: string;
  missaoId: string;
  ordem: number;
  descricao: string;
  concluida: boolean;
  concluidaPor?: string;
  dataConclusao?: string;
}

export interface Missao {
  id: string;
  unidadeId?: string;
  escalaId?: string;
  titulo: string;
  descricao?: string;
  prioridade: PrioridadeMissao;
  status: StatusMissao;
  responsavelId?: string;
  responsavel?: PerfilUsuario;
  prazo?: string;
  dataConclusao?: string;
  criadoPor?: string;
  tarefas?: MissaoTarefa[];
  createdAt: string;
  updatedAt: string;
}

export type StatusMaterial = 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'ESGOTADO';
export type TipoMovimentacaoMaterial = 'RETIRADA' | 'DEVOLUCAO' | 'AJUSTE' | 'ENTRADA';

export interface Material {
  id: string;
  unidadeId?: string;
  nome: string;
  categoria: string;
  codigoPatrimonio?: string;
  quantidadeDisponivel: number;
  quantidadeMinima: number;
  unidadeMedida: string;
  status: StatusMaterial;
  localizacao?: string;
  observacoes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialMovimentacao {
  id: string;
  materialId: string;
  usuarioId: string;
  missaoId?: string;
  tipo: TipoMovimentacaoMaterial;
  quantidade: number;
  observacao?: string;
  usuario?: PerfilUsuario;
  createdAt: string;
}

export type TipoMidia = 'FOTO' | 'VIDEO';

export interface MidiaRegistro {
  id: string;
  usuarioId: string;
  missaoId?: string;
  escalaId?: string;
  tipo: TipoMidia;
  arquivoUrl: string;
  arquivoNome: string;
  tamanhoBytes?: number;
  mimeType?: string;
  titulo?: string;
  descricao?: string;
  usuario?: PerfilUsuario;
  createdAt: string;
}

export type PrioridadeAviso = 'NORMAL' | 'IMPORTANTE' | 'URGENTE';

export interface Aviso {
  id: string;
  autorId: string;
  unidadeId?: string;
  titulo: string;
  conteudo: string;
  prioridade: PrioridadeAviso;
  destinatariosNivel?: NivelAcesso;
  fixado: boolean;
  ativo: boolean;
  autor?: PerfilUsuario;
  createdAt: string;
  updatedAt: string;
}

export type TipoCanal = 'GERAL' | 'UNIDADE' | 'MISSAO' | 'DIRETO';

export interface CanalComunicacao {
  id: string;
  nome: string;
  tipo: TipoCanal;
  unidadeId?: string;
  missaoId?: string;
  criadoPor?: string;
  ativo: boolean;
  createdAt: string;
}

export interface MensagemComunicacao {
  id: string;
  canalId: string;
  remetenteId: string;
  conteudo: string;
  anexoUrl?: string;
  anexoTipo?: string;
  remetente?: PerfilUsuario;
  createdAt: string;
}
