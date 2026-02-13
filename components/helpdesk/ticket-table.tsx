"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CheckCircle2 } from "lucide-react"
import type { Chamado } from "@/lib/helpdesk-data"

interface TicketTableProps {
  tickets: Chamado[]
  title: string
  emptyMessage?: string
}

function getCriticidadeVariant(criticidade: string) {
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

function getClassificacaoVariant(classificacao: string) {
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

export function TicketTable({ tickets, title, emptyMessage = "Nenhum registro de chamado encontrado." }: TicketTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-4">
        <h2 className="text-center text-lg font-semibold text-primary">
          {title}
        </h2>
      </div>

      <Card className="overflow-hidden border shadow-sm">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[100px] font-semibold text-foreground">Chamado</TableHead>
                <TableHead className="font-semibold text-primary">Título</TableHead>
                <TableHead className="font-semibold text-foreground">Responsável</TableHead>
                <TableHead className="font-semibold text-foreground">Cliente</TableHead>
                <TableHead className="font-semibold text-foreground">Data de Criação</TableHead>
                <TableHead className="w-[80px] text-center font-semibold text-foreground">Interações</TableHead>
                <TableHead className="font-semibold text-foreground">Última Interação</TableHead>
                <TableHead className="font-semibold text-foreground">Classificação</TableHead>
                <TableHead className="font-semibold text-foreground">Criticidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center text-success">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                tickets.map((ticket, index) => (
                  <motion.tr
                    key={ticket.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                    className="group cursor-pointer border-b transition-colors hover:bg-accent/50 data-[state=selected]:bg-muted"
                  >
                    <TableCell className="font-mono text-sm">
                      <div className="flex items-center gap-2">
                        {ticket.status === "fechado" && (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        )}
                        <span className="text-muted-foreground">{ticket.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {ticket.titulo}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{ticket.responsavel}</TableCell>
                    <TableCell className="text-muted-foreground">{ticket.cliente}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{ticket.dataCriacao}</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-sm font-medium text-foreground">
                        {ticket.interacoes}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{ticket.ultimaInteracao}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getClassificacaoVariant(ticket.classificacao)}`}
                      >
                        {ticket.classificacao}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getCriticidadeVariant(ticket.criticidade)}`}
                      >
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
          {tickets.length === 0 ? (
            <div className="p-6 text-center text-sm text-success">
              {emptyMessage}
            </div>
          ) : (
            tickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="border-b p-4 transition-colors last:border-b-0 hover:bg-accent/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      {ticket.status === "fechado" && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                      )}
                      <span className="font-mono text-xs text-muted-foreground">#{ticket.id}</span>
                    </div>
                    <h4 className="text-sm font-medium text-foreground leading-snug">
                      {ticket.titulo}
                    </h4>
                  </div>
                  <Badge
                    variant="outline"
                    className={`shrink-0 text-[10px] ${getCriticidadeVariant(ticket.criticidade)}`}
                  >
                    {ticket.criticidade}
                  </Badge>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground/70">Responsável:</span>{" "}
                    {ticket.responsavel}
                  </div>
                  <div>
                    <span className="font-medium text-foreground/70">Cliente:</span>{" "}
                    {ticket.cliente}
                  </div>
                  <div>
                    <span className="font-medium text-foreground/70">Criação:</span>{" "}
                    {ticket.dataCriacao}
                  </div>
                  <div>
                    <span className="font-medium text-foreground/70">Interações:</span>{" "}
                    {ticket.interacoes}
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${getClassificacaoVariant(ticket.classificacao)}`}
                  >
                    {ticket.classificacao}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">
                    Última: {ticket.ultimaInteracao}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Card>
    </motion.div>
  )
}
