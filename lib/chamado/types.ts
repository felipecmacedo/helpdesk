// Types and interfaces for the Chamado (Ticket) system

export type Classificacao = "Bug" | "Suporte" | "Integração" | "Customização" | "Melhoria"
export type Criticidade = "Alto" | "Intermediário" | "Baixo"
export type StatusChamado = "aberto" | "fechado" | "pendente"
export type TipoInteracao = "publica" | "interna"
export type StatusInterno = "Pendente análise" | "Em desenvolvimento" | "Em homologação" | "Aguardando publicação" | "Publicada"
export type SortDirection = "asc" | "desc"

export interface Interacao {
  id: number
  idChamado: number
  usuario: string
  avatarUrl?: string
  data: string
  tipo: TipoInteracao
  mensagem: string
  anexos?: Anexo[]
  destinatarios?: string[]
}

export interface Anexo {
  nome: string
  url: string
  tipo: string
}

export interface Chamado {
  id: number
  titulo: string
  responsavel: string
  cliente: string
  dataCriacao: string
  interacoes: number
  ultimaInteracao: string
  classificacao: Classificacao
  criticidade: Criticidade
  status: StatusChamado
  ferramenta?: string
  statusInterno?: StatusInterno
  dataEntrega?: string
  descricao?: string
}

export interface ChamadoDetalhes extends Chamado {
  solicitante: string
  historicoInteracoes: Interacao[]
}

export interface SortConfig {
  key: keyof Chamado
  direction: SortDirection
}

export interface PaginationConfig {
  page: number
  perPage: number
  total: number
}

export interface FilterConfig {
  search: string
  classificacao: string
  criticidade: string
  status: string
  perPage: number
}
