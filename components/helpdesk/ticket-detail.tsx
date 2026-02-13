"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  MessageSquarePlus,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  User,
  Tag,
  AlertTriangle,
  Wrench,
  CalendarDays,
  FileBarChart,
} from "lucide-react"
import { InteractionCard } from "./interaction-card"
import { NewInteractionForm } from "./new-interaction-form"
import {
  getCriticidadeVariant,
  getClassificacaoVariant,
  getStatusVariant,
  getStatusLabel,
} from "@/lib/functions"
import type { ChamadoDetalhes } from "@/lib/chamado/types"

interface TicketDetailProps {
  chamado: ChamadoDetalhes
}

export function TicketDetail({ chamado }: TicketDetailProps) {
  const [interactionOpen, setInteractionOpen] = useState(false)
  const [sortDesc, setSortDesc] = useState(true)

  const interacoes = sortDesc
    ? [...chamado.historicoInteracoes].reverse()
    : chamado.historicoInteracoes

  return (
    <>
      {/* Breadcrumb / Back */}
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground">
          <Link href="/chamados">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <Separator orientation="vertical" className="h-5" />
        <span className="text-sm text-muted-foreground">
          Chamado <span className="font-mono font-semibold text-foreground">#{chamado.id}</span>
        </span>
      </div>

      {/* Ticket Info Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="mb-6 border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <h1 className="text-balance text-xl font-bold text-foreground lg:text-2xl">
                  {chamado.titulo}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Aberto em {chamado.dataCriacao} por {chamado.solicitante}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={`${getStatusVariant(chamado.status)}`}>
                  {chamado.status === "fechado" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                  {getStatusLabel(chamado.status)}
                </Badge>
                <Badge variant="outline" className={getCriticidadeVariant(chamado.criticidade)}>
                  {chamado.criticidade}
                </Badge>
                <Badge variant="outline" className={getClassificacaoVariant(chamado.classificacao)}>
                  {chamado.classificacao}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              <DetailItem icon={User} label="Responsável" value={chamado.responsavel} />
              <DetailItem icon={Tag} label="Cliente" value={chamado.cliente} />
              <DetailItem icon={Wrench} label="Ferramenta" value={chamado.ferramenta || "-"} />
              <DetailItem icon={FileBarChart} label="Status Interno" value={chamado.statusInterno || "-"} />
              <DetailItem icon={CalendarDays} label="Última Interação" value={chamado.ultimaInteracao} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Interactions Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <MessageSquarePlus className="h-5 w-5 text-primary" />
          Interações
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {chamado.historicoInteracoes.length}
          </span>
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSortDesc(!sortDesc)}
          className="gap-1.5 text-xs"
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
          {sortDesc ? "Mais recentes primeiro" : "Mais antigos primeiro"}
        </Button>
      </div>

      {/* Interaction list */}
      <div className="mb-28 flex flex-col gap-4">
        {interacoes.map((interacao, index) => (
          <InteractionCard key={interacao.id} interacao={interacao} index={index} />
        ))}
      </div>

      {/* Fixed New Interaction Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            onClick={() => setInteractionOpen(true)}
            className="gap-2 rounded-full px-6 shadow-lg"
          >
            <MessageSquarePlus className="h-5 w-5" />
            <span className="hidden sm:inline">Nova Interação</span>
          </Button>
        </motion.div>
      </div>

      {/* New Interaction Panel */}
      <NewInteractionForm
        open={interactionOpen}
        onClose={() => setInteractionOpen(false)}
        chamadoId={chamado.id}
      />
    </>
  )
}

function DetailItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
    </div>
  )
}
