"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Wrench, Save, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function SettingsPage() {
  const [companyName, setCompanyName] = useState("FOCOPDV")
  const [email, setEmail] = useState("suporte.pdvlink@focopdv.com")
  const [notificacoes, setNotificacoes] = useState(true)
  const [emailNotify, setEmailNotify] = useState(true)
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
    toast.success("Configurações salvas com sucesso!")
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Wrench className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Configurações Gerais</h1>
          <p className="text-sm text-muted-foreground">Gerencie as configurações do sistema</p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl flex flex-col gap-6">
        {/* General Info */}
        <Card className="border shadow-sm">
          <CardHeader>
            <h2 className="text-lg font-semibold text-foreground">Informações Gerais</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">Nome da Empresa</Label>
              <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">Email de Suporte</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border shadow-sm">
          <CardHeader>
            <h2 className="text-lg font-semibold text-foreground">Notificações</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Notificações no sistema</p>
                <p className="text-xs text-muted-foreground">Receber alertas de novos chamados e interações</p>
              </div>
              <Switch checked={notificacoes} onCheckedChange={setNotificacoes} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Notificações por email</p>
                <p className="text-xs text-muted-foreground">Enviar emails para novos chamados</p>
              </div>
              <Switch checked={emailNotify} onCheckedChange={setEmailNotify} />
            </div>
          </CardContent>
        </Card>

        {/* Save */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
