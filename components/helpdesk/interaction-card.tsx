"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Lock, Globe } from "lucide-react"
import type { Interacao } from "@/lib/chamado/types"
import { cn } from "@/lib/utils"

interface InteractionCardProps {
  interacao: Interacao
  index: number
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function InteractionCard({ interacao, index }: InteractionCardProps) {
  const isInternal = interacao.tipo === "interna"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="flex flex-col overflow-hidden rounded-lg border shadow-sm"
    >
      {/* Header */}
      <div
        className={cn(
          "flex flex-wrap items-center gap-2 px-4 py-2.5 text-sm",
          isInternal
            ? "bg-warning/10 text-warning-foreground"
            : "bg-primary/10 text-primary-foreground"
        )}
      >
        <span className={cn("font-semibold", isInternal ? "text-warning" : "text-primary")}>
          {interacao.usuario}
        </span>
        <span className={cn("text-xs", isInternal ? "text-warning/70" : "text-primary/70")}>
          {"às "}
          {interacao.data}
        </span>
        <Badge
          variant="outline"
          className={cn(
            "ml-auto gap-1 text-[10px]",
            isInternal
              ? "border-warning/30 bg-warning/10 text-warning"
              : "border-primary/30 bg-primary/10 text-primary"
          )}
        >
          {isInternal ? <Lock className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
          {isInternal ? "Interna" : "Pública"}
        </Badge>
        {isInternal && interacao.destinatarios && interacao.destinatarios.length > 0 && (
          <span className="w-full text-xs text-warning/70">
            Enviado para: {interacao.destinatarios.join("; ")}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex gap-4 bg-card p-4">
        <Avatar className="hidden h-12 w-12 shrink-0 sm:flex">
          <AvatarFallback className="bg-muted text-sm font-medium text-muted-foreground">
            {getInitials(interacao.usuario)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {interacao.mensagem}
          </p>
          {/* Attachments */}
          {interacao.anexos && interacao.anexos.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 border-t pt-3">
              {interacao.anexos.map((anexo) => (
                <a
                  key={anexo.nome}
                  href={anexo.url}
                  className="inline-flex items-center gap-1.5 rounded-md border bg-muted/50 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
                >
                  <FileText className="h-3.5 w-3.5" />
                  {anexo.nome}
                  <Download className="h-3 w-3 opacity-50" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
