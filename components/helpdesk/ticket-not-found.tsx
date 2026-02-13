"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SearchX, ArrowLeft } from "lucide-react"

interface TicketNotFoundProps {
  id: string
}

export function TicketNotFound({ id }: TicketNotFoundProps) {
  return (
    <div className="flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="max-w-md border shadow-sm">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <SearchX className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Chamado não encontrado</h2>
            <p className="text-sm text-muted-foreground">
              {"O chamado #"}{id}{" não foi encontrado no sistema. Verifique o número e tente novamente."}
            </p>
            <Button asChild className="mt-2 gap-2">
              <Link href="/chamados">
                <ArrowLeft className="h-4 w-4" />
                Voltar para chamados
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
