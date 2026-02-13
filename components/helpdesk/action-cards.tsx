"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { PlusCircle, Search } from "lucide-react"

interface ActionCardsProps {
  onNewTicket: () => void
  onSearch?: () => void
}

const actions = [
  {
    key: "new",
    title: "Novo Chamado",
    description: "Criar um novo chamado para a FocoPDV",
    icon: PlusCircle,
    color: "bg-success",
    iconColor: "text-success-foreground",
  },
  {
    key: "search",
    title: "Busca",
    description: "Buscar chamados pelo ID, titulo ou conteudo descritivo",
    icon: Search,
    color: "bg-primary",
    iconColor: "text-primary-foreground",
  },
]

export function ActionCards({ onNewTicket, onSearch }: ActionCardsProps) {
  function handleClick(key: string) {
    if (key === "new") onNewTicket()
    else if (key === "search") onSearch?.()
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {actions.map((action, index) => (
        <motion.div
          key={action.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.15, type: "spring", stiffness: 300, damping: 24 }}
        >
          <Card
            className="group cursor-pointer border-0 bg-card p-0 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
            onClick={() => handleClick(action.key)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(action.key) }}
          >
            <div className="flex items-center gap-4 p-5">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${action.color} shadow-sm`}>
                <action.icon className={`h-6 w-6 ${action.iconColor}`} />
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {action.description}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
