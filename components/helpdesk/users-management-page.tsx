"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Users, Search, Plus, Mail, Shield } from "lucide-react"
import { RESPONSAVEIS } from "@/lib/chamado/constants"

const mockUsers = RESPONSAVEIS.map((r, i) => ({
  id: i + 1,
  nome: r.label,
  email: `${r.value.replace(/-/g, ".")}@focopdv.com`,
  perfil: i === 0 ? "Admin" : "Agente",
  ativo: true,
}))

export function UsersManagementPage() {
  const [search, setSearch] = useState("")

  const filtered = mockUsers.filter(
    (u) =>
      u.nome.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Gerenciar Usuários</h1>
            <p className="text-sm text-muted-foreground">{mockUsers.length} usuários cadastrados</p>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Novo Usuário</span>
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <Card className="overflow-hidden border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold text-foreground">Usuário</TableHead>
              <TableHead className="font-semibold text-foreground">Email</TableHead>
              <TableHead className="font-semibold text-foreground">Perfil</TableHead>
              <TableHead className="font-semibold text-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id} className="transition-colors hover:bg-accent/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                        {user.nome.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{user.nome}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    {user.email}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={user.perfil === "Admin" ? "bg-primary/10 text-primary" : ""}>
                    <Shield className="mr-1 h-3 w-3" />
                    {user.perfil}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-success/10 text-success">Ativo</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  )
}
