"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Plus, Settings } from "lucide-react"

const teams = [
  {
    id: 1,
    nome: "Suporte N1",
    descricao: "Atendimento de primeiro nível",
    membros: ["Giovana Lana", "Jéssica Rodrigues"],
  },
  {
    id: 2,
    nome: "Desenvolvimento",
    descricao: "Equipe de desenvolvimento e correções",
    membros: ["Igor Paulino", "Guilherme Borges"],
  },
  {
    id: 3,
    nome: "Integração",
    descricao: "Equipe de integrações e implantações",
    membros: ["Ana Beatriz", "Edielma Silva"],
  },
]

export function TeamsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Equipes</h1>
            <p className="text-sm text-muted-foreground">Gerencie as equipes de atendimento</p>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nova Equipe</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Card key={team.id} className="border shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-foreground">{team.nome}</h3>
                  <p className="text-xs text-muted-foreground">{team.descricao}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">Membros ({team.membros.length})</span>
                <div className="flex flex-wrap gap-2">
                  {team.membros.map((membro) => (
                    <div key={membro} className="flex items-center gap-1.5">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-primary/10 text-[10px] font-medium text-primary">
                          {membro.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-foreground">{membro}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
