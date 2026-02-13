"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, TrendingUp, Clock, CheckCircle2, AlertTriangle } from "lucide-react"
import { allChamados, statsData } from "@/lib/helpdesk-data"
import { CLASSIFICACOES } from "@/lib/chamado/constants"

export function ReportsPage() {
  const byClassificacao = CLASSIFICACOES.map((c) => ({
    label: c.label,
    count: allChamados.filter((ch) => ch.classificacao === c.value).length,
  }))

  const abertos = allChamados.filter((c) => c.status === "aberto").length
  const fechados = allChamados.filter((c) => c.status === "fechado").length
  const taxaResolucao = allChamados.length > 0 ? Math.round((fechados / allChamados.length) * 100) : 0

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Relatório Geral</h1>
          <p className="text-sm text-muted-foreground">Visão geral dos chamados e métricas</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SummaryCard icon={TrendingUp} label="Total de Chamados" value={statsData.totalChamados} color="bg-primary text-primary-foreground" />
        <SummaryCard icon={AlertTriangle} label="Abertos" value={abertos} color="bg-destructive text-destructive-foreground" />
        <SummaryCard icon={CheckCircle2} label="Fechados" value={fechados} color="bg-success text-success-foreground" />
        <SummaryCard icon={Clock} label="Taxa de Resolução" value={`${taxaResolucao}%`} color="bg-warning text-warning-foreground" />
      </div>

      {/* By Classification */}
      <Card className="border shadow-sm">
        <CardHeader>
          <h2 className="text-lg font-semibold text-foreground">Chamados por Classificação</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {byClassificacao.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <Badge variant="secondary" className="text-sm font-bold">{item.count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SummaryCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number | string; color: string }) {
  return (
    <Card className={`${color} border-0 p-4 shadow-md`}>
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6" />
        <div>
          <p className="text-xs font-medium opacity-90">{label}</p>
          <p className="text-2xl font-bold">{typeof value === "number" ? value.toLocaleString("pt-BR") : value}</p>
        </div>
      </div>
    </Card>
  )
}
