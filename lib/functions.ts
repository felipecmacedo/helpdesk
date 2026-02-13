// Shared utility functions used across multiple pages

import type { Chamado, SortConfig, SortDirection, FilterConfig } from "./chamado/types"

/** Get CSS classes for criticidade badge */
export function getCriticidadeVariant(criticidade: string): string {
  switch (criticidade) {
    case "Alto":
      return "bg-destructive/10 text-destructive border-destructive/20"
    case "Intermediário":
      return "bg-warning/10 text-warning border-warning/20"
    case "Baixo":
      return "bg-success/10 text-success border-success/20"
    default:
      return "bg-muted text-muted-foreground"
  }
}

/** Get CSS classes for classificacao badge */
export function getClassificacaoVariant(classificacao: string): string {
  switch (classificacao) {
    case "Bug":
      return "bg-destructive/10 text-destructive border-destructive/20"
    case "Suporte":
      return "bg-primary/10 text-primary border-primary/20"
    case "Integração":
      return "bg-accent text-accent-foreground border-primary/20"
    case "Customização":
      return "bg-warning/10 text-warning border-warning/20"
    case "Melhoria":
      return "bg-success/10 text-success border-success/20"
    default:
      return "bg-muted text-muted-foreground"
  }
}

/** Get CSS classes for status badge */
export function getStatusVariant(status: string): string {
  switch (status) {
    case "aberto":
      return "bg-success/10 text-success border-success/20"
    case "fechado":
      return "bg-muted text-muted-foreground border-border"
    case "pendente":
      return "bg-warning/10 text-warning border-warning/20"
    default:
      return "bg-muted text-muted-foreground"
  }
}

/** Get display label for status */
export function getStatusLabel(status: string): string {
  switch (status) {
    case "aberto":
      return "Aberto"
    case "fechado":
      return "Fechado"
    case "pendente":
      return "Pendente"
    default:
      return status
  }
}

/** Filter chamados based on filter config */
export function filterChamados(chamados: Chamado[], filters: FilterConfig): Chamado[] {
  return chamados.filter((t) => {
    const searchLower = filters.search.toLowerCase()
    const matchSearch =
      filters.search === "" ||
      t.titulo.toLowerCase().includes(searchLower) ||
      t.id.toString().includes(filters.search) ||
      t.responsavel.toLowerCase().includes(searchLower) ||
      t.cliente.toLowerCase().includes(searchLower)
    const matchClass = filters.classificacao === "all" || t.classificacao === filters.classificacao
    const matchCrit = filters.criticidade === "all" || t.criticidade === filters.criticidade
    const matchStatus = filters.status === "all" || t.status === filters.status
    return matchSearch && matchClass && matchCrit && matchStatus
  })
}

/** Sort chamados by a given key and direction */
export function sortChamados(chamados: Chamado[], sort: SortConfig): Chamado[] {
  return [...chamados].sort((a, b) => {
    const aVal = a[sort.key]
    const bVal = b[sort.key]
    if (aVal == null || bVal == null) return 0
    const comparison = typeof aVal === "number" && typeof bVal === "number"
      ? aVal - bVal
      : String(aVal).localeCompare(String(bVal), "pt-BR")
    return sort.direction === "asc" ? comparison : -comparison
  })
}

/** Toggle sort direction */
export function toggleSortDirection(current: SortDirection): SortDirection {
  return current === "asc" ? "desc" : "asc"
}

/** Paginate array */
export function paginate<T>(items: T[], page: number, perPage: number): T[] {
  return items.slice(0, page * perPage)
}

/** Format date string for display */
export function formatDate(date: string): string {
  return date
}

/** Truncate text with ellipsis */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}
