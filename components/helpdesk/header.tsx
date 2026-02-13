"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Headphones,
  ChevronDown,
  Search,
  Menu,
  X,
  TicketPlus,
  List,
  BarChart3,
  Users,
  Settings,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  {
    label: "Chamados",
    icon: TicketPlus,
    items: ["Novo Chamado", "Meus Chamados", "Todos os Chamados"],
  },
  {
    label: "Relatórios",
    icon: BarChart3,
    items: ["Relatório Geral", "Relatório por Equipe", "Exportar CSV"],
  },
  {
    label: "Usuários & Configurações",
    icon: Settings,
    items: ["Gerenciar Usuários", "Equipes", "Configurações Gerais"],
  },
]

export function HelpdeskHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [ticketSearch, setTicketSearch] = useState("")

  return (
    <header className="sticky top-0 z-50 border-b bg-sidebar text-sidebar-foreground shadow-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Headphones className="h-5 w-5 text-sidebar-primary" />
          <span className="text-sm font-bold tracking-tight lg:text-base">
            Help Desk FOCOPDV
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu principal">
          {navItems.map((nav) => (
            <DropdownMenu key={nav.label}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                >
                  <nav.icon className="h-4 w-4" />
                  {nav.label}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {nav.items.map((item) => (
                  <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Ticket search - desktop */}
          <div className="hidden items-center gap-2 md:flex">
            <label htmlFor="ticket-search" className="text-xs text-sidebar-foreground/70">
              {"N\u00ba chamado"}
            </label>
            <Input
              id="ticket-search"
              value={ticketSearch}
              onChange={(e) => setTicketSearch(e.target.value)}
              placeholder="ID..."
              className="h-8 w-24 border-sidebar-border bg-sidebar-accent/50 text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/40 focus-visible:ring-sidebar-ring"
            />
          </div>

          {/* Quick contact icons */}
          <div className="hidden items-center gap-0.5 md:flex">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-green-400 hover:bg-sidebar-accent hover:text-green-300" aria-label="WhatsApp">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:bg-sidebar-accent hover:text-red-300" aria-label="Email">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-400 hover:bg-sidebar-accent hover:text-blue-300" aria-label="Chat">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground" />

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-sidebar-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-sidebar-border lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Menu mobile">
              {/* Mobile ticket search */}
              <div className="mb-2 flex items-center gap-2">
                <Search className="h-4 w-4 text-sidebar-foreground/60" />
                <Input
                  value={ticketSearch}
                  onChange={(e) => setTicketSearch(e.target.value)}
                  placeholder={"Buscar n\u00ba do chamado..."}
                  className="h-8 border-sidebar-border bg-sidebar-accent/50 text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/40"
                />
              </div>

              {navItems.map((nav) => (
                <div key={nav.label} className="flex flex-col">
                  <span className="flex items-center gap-2 px-2 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                    <nav.icon className="h-3.5 w-3.5" />
                    {nav.label}
                  </span>
                  {nav.items.map((item) => (
                    <button
                      key={item}
                      className="rounded-md px-4 py-2 text-left text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              ))}

              {/* Mobile contact buttons */}
              <div className="mt-2 flex items-center gap-2 border-t border-sidebar-border pt-3">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-green-400 hover:bg-sidebar-accent" aria-label="WhatsApp">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:bg-sidebar-accent" aria-label="Email">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-400 hover:bg-sidebar-accent" aria-label="Chat">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
