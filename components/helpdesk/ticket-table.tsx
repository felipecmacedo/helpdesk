"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CheckCircle2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { getCriticidadeVariant, getClassificacaoVariant, sortChamados } from "@/lib/functions"
import type { Chamado, SortConfig, SortDirection } from "@/lib/chamado/types"

interface TicketTableProps {
  tickets: Chamado[]
  title: string
  emptyMessage?: string
  sortable?: boolean
}

type SortKey = keyof Chamado

function SortIcon({ active, direction }: { active: boolean; direction: SortDirection }) {
  if (!active) return <ArrowUpDown className="ml-1 h-3 w-3 opacity-40" />
  return direction === "asc"
    ? <ArrowUp className="ml-1 h-3 w-3" />
    : <ArrowDown className="ml-1 h-3 w-3" />
}

export function TicketTable({ tickets, title, emptyMessage = "Nenhum registro de chamado encontrado.", sortable = true }: TicketTableProps) {
  const [sort, setSort] = useState<SortConfig | null>(null)

  function handleSort(key: SortKey) {
    if (!sortable) return
    setSort((prev) => {
      if (prev?.key === key) {
        return prev.direction === "asc"
          ? { key, direction: "desc" }
          : null
      }
      return { key, direction: "asc" }
    })
  }

  const sorted = sort ? sortChamados(tickets, sort) : tickets

  const columns: { key: SortKey; label: string; className?: string; hideOnMobile?: boolean }[] = [
    { key: "id", label: "Chamado", className: "w-[100px]" },
    { key: "titulo", label: "Título" },
    { key: "responsavel", label: "Responsável", hideOnMobile: true },
    { key: "cliente", label: "Cliente", hideOnMobile: true },
    { key: "dataCriacao", label: "Data de Criação", hideOnMobile: true },
    { key: "interacoes", label: "Interações", className: "w-[80px] text-center" },
    { key: "classificacao", label: "Classificação" },
    { key: "criticidade", label: "Criticidade" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-4">
        <h2 className="text-center text-lg font-semibold text-primary">{title}</h2>
      </div>

      <Card className="overflow-hidden border shadow-sm">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={`font-semibold text-foreground ${col.className || ""} ${sortable ? "cursor-pointer select-none hover:bg-muted/80" : ""}`}
                    onClick={() => handleSort(col.key)}
                  >
                    <span className="inline-flex items-center">
                      {col.label}
                      {sortable && <SortIcon active={sort?.key === col.key} direction={sort?.direction || "asc"} />}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                sorted.map((ticket, index) => (
                  <motion.tr
                    key={ticket.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.02, duration: 0.3 }}
                    className="group cursor-pointer border-b transition-colors hover:bg-accent/50"
                  >
                    <TableCell className="font-mono text-sm">
                      <Link href={`/chamados/${ticket.id}`} className="flex items-center gap-2 hover:text-primary">
                        {ticket.status === "fechado" && <CheckCircle2 className="h-4 w-4 text-success" />}
                        <span className="text-muted-foreground group-hover:text-primary transition-colors">{ticket.id}</span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/chamados/${ticket.id}`} className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {ticket.titulo}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{ticket.responsavel}</TableCell>
                    <TableCell className="text-muted-foreground">{ticket.cliente}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{ticket.dataCriacao}</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-sm font-medium text-foreground">
                        {ticket.interacoes}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${getClassificacaoVariant(ticket.classificacao)}`}>
                        {ticket.classificacao}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${getCriticidadeVariant(ticket.criticidade)}`}>
                        {ticket.criticidade}
                      </Badge>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-0 md:hidden">
          {sorted.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">{emptyMessage}</div>
          ) : (
            sorted.map((ticket, index) => (
              <Link key={ticket.id} href={`/chamados/${ticket.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className="border-b p-4 transition-colors last:border-b-0 hover:bg-accent/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        {ticket.status === "fechado" && <CheckCircle2 className="h-3.5 w-3.5 text-success" />}
                        <span className="font-mono text-xs text-muted-foreground">#{ticket.id}</span>
                      </div>
                      <h4 className="text-sm font-medium text-foreground leading-snug">{ticket.titulo}</h4>
                    </div>
                    <Badge variant="outline" className={`shrink-0 text-[10px] ${getCriticidadeVariant(ticket.criticidade)}`}>
                      {ticket.criticidade}
                    </Badge>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div><span className="font-medium text-foreground/70">Responsável:</span> {ticket.responsavel}</div>
                    <div><span className="font-medium text-foreground/70">Cliente:</span> {ticket.cliente}</div>
                    <div><span className="font-medium text-foreground/70">Criação:</span> {ticket.dataCriacao}</div>
                    <div><span className="font-medium text-foreground/70">Interações:</span> {ticket.interacoes}</div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className={`text-[10px] ${getClassificacaoVariant(ticket.classificacao)}`}>
                      {ticket.classificacao}
                    </Badge>
                  </div>
                </motion.div>
              </Link>
            ))
          )}
        </div>
      </Card>
    </motion.div>
  )
}
