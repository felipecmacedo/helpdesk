"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { StatsCards } from "./stats-cards"
import { ActionCards } from "./action-cards"
import { TicketTable } from "./ticket-table"
import { NewTicketSidebar } from "./new-ticket-sidebar"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, Filter, X, ArrowRight } from "lucide-react"
import { ultimosChamados, chamadosFechados } from "@/lib/helpdesk-data"
import { filterChamados } from "@/lib/functions"
import { CLASSIFICACOES, CRITICIDADES } from "@/lib/chamado/constants"
import type { Chamado } from "@/lib/chamado/types"

export function HelpdeskDashboard() {
  const [search, setSearch] = useState("")
  const [classificacao, setClassificacao] = useState("all")
  const [criticidade, setCriticidade] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [newTicketOpen, setNewTicketOpen] = useState(false)

  const hasActiveFilters = search !== "" || classificacao !== "all" || criticidade !== "all"

  const filters = { search, classificacao, criticidade, status: "all", perPage: 20 }
  const filteredUltimos = filterChamados(ultimosChamados, filters)
  const filteredFechados = filterChamados(chamadosFechados, filters)

  const clearFilters = () => {
    setSearch("")
    setClassificacao("all")
    setCriticidade("all")
  }

  return (
    <>
      {/* Stats */}
      <section aria-label="Estatísticas">
        <StatsCards />
      </section>

      {/* Actions */}
      <section aria-label="Ações rápidas" className="mt-8">
        <ActionCards onNewTicket={() => setNewTicketOpen(true)} />
      </section>

      {/* Filters */}
      <section aria-label="Filtros" className="mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Card className="border bg-card p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por ID, título, responsável ou cliente..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
                </Button>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="gap-1.5 text-destructive hover:text-destructive"
                  >
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
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-3 flex flex-col gap-3 border-t pt-3 sm:flex-row"
              >
                <div className="flex flex-col gap-1 sm:w-48">
                  <label className="text-xs font-medium text-muted-foreground">Classificação</label>
                  <Select value={classificacao} onValueChange={setClassificacao}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {CLASSIFICACOES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1 sm:w-48">
                  <label className="text-xs font-medium text-muted-foreground">Criticidade</label>
                  <Select value={criticidade} onValueChange={setCriticidade}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {CRITICIDADES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </section>

      {/* Separator */}
      <div className="my-10 flex items-center gap-4" aria-hidden="true">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Chamados</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Latest Tickets */}
      <section aria-label="Últimos chamados registrados" className="mb-10">
        <TicketTable tickets={filteredUltimos} title="Últimos chamados registrados" emptyMessage="Nenhum chamado encontrado com os filtros aplicados." />
        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="sm" asChild className="gap-2">
            <Link href="/chamados">
              Ver todos os chamados
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Closed Tickets */}
      <section aria-label="Últimos chamados fechados">
        <TicketTable tickets={filteredFechados} title="Últimos chamados fechados" emptyMessage="Nenhum chamado fechado encontrado." />
      </section>

      <NewTicketSidebar open={newTicketOpen} onClose={() => setNewTicketOpen(false)} />
    </>
  )
}
