// Constants and options for the Chamado system

import type { Classificacao, Criticidade, StatusChamado, StatusInterno, TipoInteracao } from "./types"

export const CLASSIFICACOES: { value: Classificacao; label: string }[] = [
  { value: "Bug", label: "Bug" },
  { value: "Suporte", label: "Suporte" },
  { value: "Integração", label: "Integração" },
  { value: "Customização", label: "Customização" },
  { value: "Melhoria", label: "Melhoria" },
]

export const CRITICIDADES: { value: Criticidade; label: string }[] = [
  { value: "Alto", label: "Alto" },
  { value: "Intermediário", label: "Intermediário" },
  { value: "Baixo", label: "Baixo" },
]

export const STATUS_CHAMADO: { value: StatusChamado; label: string }[] = [
  { value: "aberto", label: "Aberto" },
  { value: "fechado", label: "Fechado" },
  { value: "pendente", label: "Pendente" },
]

export const STATUS_INTERNOS: { value: StatusInterno; label: string }[] = [
  { value: "Pendente análise", label: "Pendente análise" },
  { value: "Em desenvolvimento", label: "Em desenvolvimento" },
  { value: "Em homologação", label: "Em homologação" },
  { value: "Aguardando publicação", label: "Aguardando publicação" },
  { value: "Publicada", label: "Publicada" },
]

export const TIPOS_INTERACAO: { value: TipoInteracao; label: string }[] = [
  { value: "publica", label: "Pública" },
  { value: "interna", label: "Interna" },
]

export const FERRAMENTAS = [
  { value: "pdv-link-plus", label: "PDV Link Plus" },
  { value: "foco-pdv", label: "Foco PDV" },
  { value: "herbamed", label: "Herbamed" },
  { value: "geolab", label: "Geolab" },
  { value: "teuto", label: "Teuto" },
  { value: "mais-saude", label: "Mais Saúde" },
  { value: "maxifarma", label: "Maxifarma" },
  { value: "luchefarma", label: "Luchefarma" },
  { value: "sogamax", label: "Sogamax" },
  { value: "milfarma", label: "Milfarma" },
  { value: "vitamedic", label: "Vitamedic" },
  { value: "globo-pharma", label: "Globo Pharma" },
  { value: "farmarcas", label: "Farmarcas" },
  { value: "febrafar", label: "Febrafar" },
]

export const RESPONSAVEIS = [
  { value: "giovana-lana", label: "Giovana Lana" },
  { value: "jessica-rodrigues", label: "Jéssica Rodrigues" },
  { value: "igor-paulino", label: "Igor Paulino" },
  { value: "ana-beatriz", label: "Ana Beatriz" },
  { value: "guilherme-borges", label: "Guilherme Borges" },
  { value: "edielma-silva", label: "Edielma Silva" },
]

export const PER_PAGE_OPTIONS = [10, 20, 50, 100]

export const DEFAULT_PER_PAGE = 20
