"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ThemeToggle } from "./theme-toggle"
import {
  Headphones,
  User,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ShieldCheck,
  TicketCheck,
  Zap,
} from "lucide-react"

const features = [
  {
    icon: TicketCheck,
    title: "Gerenciamento de Chamados",
    description: "Acompanhe e resolva todos os chamados de forma eficiente",
  },
  {
    icon: ShieldCheck,
    title: "Suporte Seguro",
    description: "Dados protegidos e acesso controlado por equipe",
  },
  {
    icon: Zap,
    title: "Resposta Rapida",
    description: "Ferramentas para agilizar o atendimento ao cliente",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
}

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!email.trim() || !password.trim()) {
      setError("Preencha todos os campos para continuar.")
      return
    }

    setLoading(true)

    // Simulated login - replace with real auth
    await new Promise((r) => setTimeout(r, 1200))

    setLoading(false)
    router.push("/")
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left branded panel - hidden on mobile */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-sidebar p-10 text-sidebar-foreground lg:flex lg:w-[45%]">
        {/* Background decorative shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-sidebar-accent/30" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-sidebar-accent/20" />
          <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sidebar-primary/10" />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-foreground/10">
              <Headphones className="h-5 w-5 text-sidebar-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">Help Desk FOCOPDV</span>
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-balance text-3xl font-bold leading-tight xl:text-4xl">
              Bem-vindo ao sistema de suporte
            </h1>
            <p className="mt-3 text-pretty text-base leading-relaxed text-sidebar-foreground/70 xl:text-lg">
              Acesse sua conta para gerenciar chamados, acompanhar interacoes e manter o controle do suporte.
            </p>
          </motion.div>

          <div className="flex flex-col gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i + 3}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="flex items-start gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-foreground/10">
                  <feature.icon className="h-4 w-4 text-sidebar-foreground/90" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{feature.title}</p>
                  <p className="text-sm text-sidebar-foreground/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="relative z-10"
        >
          <p className="text-xs text-sidebar-foreground/40">
            FOCOPDV - Solucoes Integradas LTDA
          </p>
        </motion.div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 flex-col">
        {/* Top bar - mobile brand + theme toggle */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 lg:hidden">
            <Headphones className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-foreground">Help Desk FOCOPDV</span>
          </div>
          <div className="lg:ml-auto">
            <ThemeToggle />
          </div>
        </div>

        {/* Centered form */}
        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            {/* Mobile heading */}
            <div className="mb-8 lg:hidden">
              <h1 className="text-balance text-2xl font-bold text-foreground">
                Bem-vindo de volta
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Faca login para acessar o painel de suporte
              </p>
            </div>

            {/* Desktop heading */}
            <div className="mb-8 hidden lg:block">
              <h2 className="text-2xl font-bold text-foreground">Entrar na sua conta</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Insira suas credenciais para acessar o sistema
              </p>
            </div>

            <Card className="border bg-card shadow-lg">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Error message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                      role="alert"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="login-email" className="text-sm font-medium text-foreground">
                      Email ou Usuario
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="text"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        autoComplete="username"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password" className="text-sm font-medium text-foreground">
                        Senha
                      </Label>
                      <button
                        type="button"
                        className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Esqueceu a senha?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        autoComplete="current-password"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember me */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="login-remember"
                      checked={remember}
                      onCheckedChange={(checked) => setRemember(checked === true)}
                      disabled={loading}
                    />
                    <Label
                      htmlFor="login-remember"
                      className="text-sm text-muted-foreground cursor-pointer select-none"
                    >
                      Manter conectado
                    </Label>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full gap-2 text-base font-semibold"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      <>
                        Entrar
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Footer note */}
            <p className="mt-6 text-center text-xs text-muted-foreground">
              Problemas para acessar? Entre em contato com o administrador do sistema.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
