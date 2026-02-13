"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Search,
  Filter,
  X,
  CheckCircle2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Loader2,
  List,
} from "lucide-react"
import { allChamados } from "@/lib/helpdesk-data"
import {
  filterChamados,
  sortChamados,
  getCriticidadeVariant,
  getClassificacaoVariant,
  getStatusVariant,
  getStatusLabel,
} from "@/lib/functions"
import {
  CLASSIFICACOES,
  CRITICIDADES,
  STATUS_CHAMADO,
  PER_PAGE_OPTIONS,
  DEFAULT_PER_PAGE,
} from "@/lib/chamado/constants"
import type { SortConfig, SortDirection, Chamado } from "@/lib/chamado/types"

type SortKey = keyof Chamado

function SortIcon({ active, direction }: { active: boolean; direction: SortDirection }) {
  if (!active) return <ArrowUpDown className="ml-1 h-3 w-3 opacity-40" />
  return direction === "asc"
    ? <ArrowUp className="ml-1 h-3 w-3" />
    : <ArrowDown className="ml-1 h-3 w-3" />
}

export function AllTickets() {
  const [search, setSearch] = useState("")
  const [classificacao, setClassificacao] = useState("all")
  const [criticidade, setCriticidade] = useState("all")
  const [status, setStatus] = useState("all")
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE)
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [sort, setSort] = useState<SortConfig | null>(null)
  const [loadingMore, setLoadingMore] = useState(false)

  const hasActiveFilters = search !== "" || classificacao !== "all" || criticidade !== "all" || status !== "all"

  const filtered = useMemo(() => {
    return filterChamados(allChamados, { search, classificacao, criticidade, status, perPage })
  }, [search, classificacao, criticidade, status, perPage])

  const sorted = useMemo(() => {
    return sort ? sortChamados(filtered, sort) : filtered
  }, [filtered, sort])

  const paginated = useMemo(() => {
    return sorted.slice(0, page * perPage)
  }, [sorted, page, perPage])

  const hasMore = paginated.length < sorted.length

  function handleSort(key: SortKey) {
    setSort((prev) => {
      if (prev?.key === key) {
        return prev.direction === "asc" ? { key, direction: "desc" } : null
      }
      return { key, direction: "asc" }
    })
  }

  function clearFilters() {
    setSearch("")
    setClassificacao("all")
    setCriticidade("all")
    setStatus("all")
    setPage(1)
  }

  async function loadMore() {
    setLoadingMore(true)
    await new Promise((r) => setTimeout(r, 400))
    setPage((p) => p + 1)
    setLoadingMore(false)
  }

  const columns: { key: SortKey; label: string; className?: string }[] = [
    { key: "id", label: "ID", className: "w-[90px]" },
    { key: "titulo", label: "Título" },
    { key: "responsavel", label: "Responsável" },
    { key: "cliente", label: "Cliente" },
    { key: "dataCriacao", label: "Data Criação" },
    { key: "interacoes", label: "Int.", className: "w-[60px] text-center" },
    { key: "classificacao", label: "Classificação" },
    { key: "criticidade", label: "Criticidade" },
    { key: "status", label: "Status" },
  ]

  return (
    <>
      {/* Page Title */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <List className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Todos os Chamados</h1>
          <p className="text-sm text-muted-foreground">
            {sorted.length} chamado{sorted.length !== 1 ? "s" : ""} encontrado{sorted.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6 border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por ID, título, responsável ou cliente..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-1.5"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filtros</span>
              {hasActiveFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground text-[10px] font-bold text-primary">
                  {[classificacao !== "all", criticidade !== "all", status !== "all"].filter(Boolean).length}
                </span>
              )}
            </Button>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-destructive hover:text-destructive">
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Limpar</span>
              </Button>
            )}
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="mt-3 flex flex-col gap-3 border-t pt-3 sm:flex-row sm:flex-wrap"
          >
            <div className="flex flex-col gap-1 sm:w-44">
              <label className="text-xs font-medium text-muted-foreground">Classificação</label>
              <Select value={classificacao} onValueChange={(v) => { setClassificacao(v); setPage(1) }}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Todas" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {CLASSIFICACOES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1 sm:w-44">
              <label className="text-xs font-medium text-muted-foreground">Criticidade</label>
              <Select value={criticidade} onValueChange={(v) => { setCriticidade(v); setPage(1) }}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Todas" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {CRITICIDADES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1 sm:w-44">
              <label className="text-xs font-medium text-muted-foreground">Status</label>
              <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1) }}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Todos" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {STATUS_CHAMADO.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1 sm:w-44">
              <label className="text-xs font-medium text-muted-foreground">Itens por página</label>
              <Select value={String(perPage)} onValueChange={(v) => { setPerPage(Number(v)); setPage(1) }}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PER_PAGE_OPTIONS.map((n) => <SelectItem key={n} value={String(n)}>{n} por página</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}
      </Card>

      {/* Table */}
      <Card className="overflow-hidden border shadow-sm">
        {/* Desktop */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={`cursor-pointer select-none font-semibold text-foreground hover:bg-muted/80 ${col.className || ""}`}
                    onClick={() => handleSort(col.key)}
                  >
                    <span className="inline-flex items-center">
                      {col.label}
                      <SortIcon active={sort?.key === col.key} direction={sort?.direction || "asc"} />
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    Nenhum chamado encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((ticket) => (
                  <TableRow key={ticket.id} className="group cursor-pointer transition-colors hover:bg-accent/50">
                    <TableCell className="font-mono text-sm">
                      <Link href={`/chamados/${ticket.id}`} className="flex items-center gap-1.5 hover:text-primary">
                        {ticket.status === "fechado" && <CheckCircle2 className="h-3.5 w-3.5 text-success" />}
                        <span className="text-muted-foreground group-hover:text-primary transition-colors">{ticket.id}</span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/chamados/${ticket.id}`} className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {ticket.titulo}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{ticket.responsavel}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{ticket.cliente}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{ticket.dataCriacao}</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">{ticket.interacoes}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${getClassificacaoVariant(ticket.classificacao)}`}>{ticket.classificacao}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${getCriticidadeVariant(ticket.criticidade)}`}>{ticket.criticidade}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${getStatusVariant(ticket.status)}`}>{getStatusLabel(ticket.status)}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile */}
        <div className="flex flex-col md:hidden">
          {paginated.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Nenhum chamado encontrado.</div>
          ) : (
            paginated.map((ticket) => (
              <Link key={ticket.id} href={`/chamados/${ticket.id}`}>
                <div className="border-b p-4 transition-colors last:border-b-0 hover:bg-accent/30">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        {ticket.status === "fechado" && <CheckCircle2 className="h-3.5 w-3.5 text-success" />}
                        <span className="font-mono text-xs text-muted-foreground">#{ticket.id}</span>
                        <Badge variant="outline" className={`text-[10px] ${getStatusVariant(ticket.status)}`}>{getStatusLabel(ticket.status)}</Badge>
                      </div>
                      <h4 className="text-sm font-medium text-foreground leading-snug">{ticket.titulo}</h4>
                    </div>
                    <Badge variant="outline" className={`shrink-0 text-[10px] ${getCriticidadeVariant(ticket.criticidade)}`}>{ticket.criticidade}</Badge>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                    <div><span className="font-medium text-foreground/70">Responsável:</span> {ticket.responsavel}</div>
                    <div><span className="font-medium text-foreground/70">Cliente:</span> {ticket.cliente}</div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </Card>

      {/* Load More */}
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <Button variant="outline" onClick={loadMore} disabled={loadingMore} className="gap-2">
            {loadingMore ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loadingMore ? "Carregando..." : `Carregar mais ${perPage} chamados`}
          </Button>
        </div>
      )}

      {/* Results info */}
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Exibindo {paginated.length} de {sorted.length} chamados
      </p>
    </>
  )
}
