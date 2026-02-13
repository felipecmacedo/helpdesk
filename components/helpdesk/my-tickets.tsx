"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { User } from "lucide-react"
import { allChamados } from "@/lib/helpdesk-data"
import { TicketTable } from "./ticket-table"

export function MyTickets() {
  const myChamados = useMemo(() => {
    return allChamados.filter((c) => c.responsavel === "Giovana Lana")
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Meus Chamados</h1>
          <p className="text-sm text-muted-foreground">
            {myChamados.length} chamado{myChamados.length !== 1 ? "s" : ""} atribuído{myChamados.length !== 1 ? "s" : ""} a você
          </p>
        </div>
      </div>

      <TicketTable
        tickets={myChamados}
        title="Chamados atribuídos a mim"
        emptyMessage="Nenhum chamado atribuído a você no momento."
      />
    </motion.div>
  )
}
