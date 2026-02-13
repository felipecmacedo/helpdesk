"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
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
  Settings,
  Phone,
  Mail,
  MessageCircle,
  LogOut,
  User,
  LayoutDashboard,
  FileText,
  Users,
  Wrench,
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

interface NavSubItem {
  label: string
  href: string
  icon: React.ElementType
}

interface NavItem {
  label: string
  icon: React.ElementType
  items: NavSubItem[]
}

const navItems: NavItem[] = [
  {
    label: "Chamados",
    icon: TicketPlus,
    items: [
      { label: "Novo Chamado", href: "/chamados/novo", icon: TicketPlus },
      { label: "Meus Chamados", href: "/chamados/meus", icon: List },
      { label: "Todos os Chamados", href: "/chamados", icon: LayoutDashboard },
    ],
  },
  {
    label: "Relatórios",
    icon: BarChart3,
    items: [
      { label: "Relatório Geral", href: "/relatorios", icon: FileText },
      { label: "Relatório por Equipe", href: "/relatorios/equipe", icon: Users },
    ],
  },
  {
    label: "Usuários & Configurações",
    icon: Settings,
    items: [
      { label: "Gerenciar Usuários", href: "/configuracoes/usuarios", icon: Users },
      { label: "Equipes", href: "/configuracoes/equipes", icon: Users },
      { label: "Configurações Gerais", href: "/configuracoes", icon: Wrench },
    ],
  },
]

export function HelpdeskHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [ticketSearch, setTicketSearch] = useState("")

  function handleTicketSearch(e: React.FormEvent) {
    e.preventDefault()
    if (ticketSearch.trim()) {
      window.location.href = `/chamados/${ticketSearch.trim()}`
    }
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-sidebar text-sidebar-foreground shadow-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Headphones className="h-5 w-5 text-sidebar-primary" />
          <span className="text-sm font-bold tracking-tight lg:text-base">Help Desk FOCOPDV</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu principal">
          {navItems.map((nav) => (
            <DropdownMenu key={nav.label}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "gap-1.5 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    nav.items.some((item) => isActive(item.href)) && "bg-sidebar-accent/60 text-sidebar-foreground"
                  )}
                >
                  <nav.icon className="h-4 w-4" />
                  {nav.label}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {nav.items.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2",
                        isActive(item.href) && "bg-accent font-medium"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Ticket search */}
          <form onSubmit={handleTicketSearch} className="hidden items-center gap-2 md:flex">
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
          </form>

          {/* Quick contact icons */}
          <div className="hidden items-center gap-0.5 md:flex">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:bg-sidebar-accent hover:text-green-300" aria-label="WhatsApp">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-sidebar-accent hover:text-red-300" aria-label="Email">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:bg-sidebar-accent hover:text-blue-300" aria-label="Chat">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>

          <ThemeToggle className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground" />

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hidden gap-2 px-2 text-sidebar-foreground hover:bg-sidebar-accent md:flex">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-sidebar-accent text-xs text-sidebar-foreground">GL</AvatarFallback>
                </Avatar>
                <span className="max-w-[120px] truncate text-sm">Giovana Lana</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Giovana Lana</p>
                  <p className="text-xs text-muted-foreground">giovana@focopdv.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/configuracoes" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Meu Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/configuracoes" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configurações
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login" className="flex items-center gap-2 text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" />
                  Sair
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
              <form onSubmit={handleTicketSearch} className="mb-2 flex items-center gap-2">
                <Search className="h-4 w-4 text-sidebar-foreground/60" />
                <Input
                  value={ticketSearch}
                  onChange={(e) => setTicketSearch(e.target.value)}
                  placeholder={"Buscar n\u00ba do chamado..."}
                  className="h-8 border-sidebar-border bg-sidebar-accent/50 text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/40"
                />
              </form>

              {navItems.map((nav) => (
                <div key={nav.label} className="flex flex-col">
                  <span className="flex items-center gap-2 px-2 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                    <nav.icon className="h-3.5 w-3.5" />
                    {nav.label}
                  </span>
                  {nav.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-4 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
                        isActive(item.href) && "bg-sidebar-accent font-medium text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}

              {/* Mobile user section */}
              <div className="mt-2 flex flex-col gap-1 border-t border-sidebar-border pt-3">
                <div className="flex items-center gap-2 px-2 py-1">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-sidebar-accent text-xs text-sidebar-foreground">GL</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Giovana Lana</span>
                </div>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-md px-4 py-2 text-sm text-red-400 transition-colors hover:bg-sidebar-accent"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
