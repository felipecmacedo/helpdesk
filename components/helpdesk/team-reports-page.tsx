"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, CheckCircle2, AlertTriangle } from "lucide-react"
import { allChamados } from "@/lib/helpdesk-data"
import { RESPONSAVEIS } from "@/lib/chamado/constants"

export function TeamReportsPage() {
  const byResponsavel = RESPONSAVEIS.map((r) => {
    const tickets = allChamados.filter((c) => c.responsavel === r.label)
    return {
      ...r,
      total: tickets.length,
      abertos: tickets.filter((c) => c.status === "aberto").length,
      fechados: tickets.filter((c) => c.status === "fechado").length,
    }
  }).sort((a, b) => b.total - a.total)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Relatório por Equipe</h1>
          <p className="text-sm text-muted-foreground">Distribuição de chamados por membro da equipe</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {byResponsavel.map((member) => (
          <Card key={member.value} className="border shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                    {member.label.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{member.label}</h3>
                  <p className="text-xs text-muted-foreground">{member.total} chamado{member.total !== 1 ? "s" : ""} total</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                  <span className="text-xs text-muted-foreground">Abertos:</span>
                  <Badge variant="outline" className="bg-destructive/10 text-xs text-destructive">{member.abertos}</Badge>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  <span className="text-xs text-muted-foreground">Fechados:</span>
                  <Badge variant="outline" className="bg-success/10 text-xs text-success">{member.fechados}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
