"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Headphones, AlertCircle, CheckCircle2, MessageSquare } from "lucide-react"
import { statsData } from "@/lib/helpdesk-data"
import { useEffect, useState } from "react"

interface CounterProps {
  target: number
  duration?: number
}

function AnimatedCounter({ target, duration = 1.5 }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = target / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [target, duration])

  return <span>{count.toLocaleString("pt-BR")}</span>
}

const stats = [
  {
    label: "Total de Chamados",
    value: statsData.totalChamados,
    icon: Headphones,
    color: "bg-primary text-primary-foreground",
    iconBg: "bg-primary-foreground/20",
  },
  {
    label: "Chamados Abertos",
    value: statsData.chamadosAbertos,
    icon: AlertCircle,
    color: "bg-destructive text-destructive-foreground",
    iconBg: "bg-destructive-foreground/20",
  },
  {
    label: "Chamados Fechados",
    value: statsData.chamadosFechados,
    icon: CheckCircle2,
    color: "bg-success text-success-foreground",
    iconBg: "bg-success-foreground/20",
  },
  {
    label: "Total de Interações",
    value: statsData.totalInteracoes,
    icon: MessageSquare,
    color: "bg-warning text-warning-foreground",
    iconBg: "bg-warning-foreground/20",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
}

export function StatsCards() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={item}>
          <Card
            className={`${stat.color} border-0 p-4 shadow-md transition-shadow hover:shadow-lg lg:p-6`}
          >
            <div className="flex items-center gap-3">
              <div className={`hidden rounded-xl p-2.5 sm:block ${stat.iconBg}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-medium opacity-90 lg:text-sm">
                  {stat.label}
                </span>
                <span className="text-2xl font-bold tracking-tight lg:text-3xl">
                  <AnimatedCounter target={stat.value} />
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
