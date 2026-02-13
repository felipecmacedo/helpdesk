"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TicketPlus, Send, Loader2, AlertCircle, Paperclip, X } from "lucide-react"
import { FERRAMENTAS, CRITICIDADES, CLASSIFICACOES } from "@/lib/chamado/constants"
import { toast } from "sonner"

export function NewTicketPage() {
  const router = useRouter()
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [ferramenta, setFerramenta] = useState("")
  const [criticidade, setCriticidade] = useState("")
  const [classificacao, setClassificacao] = useState("")
  const [arquivos, setArquivos] = useState<File[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const newErrors: Record<string, string> = {}
    if (!titulo.trim()) newErrors.titulo = "Título é obrigatório"
    if (!descricao.trim()) newErrors.descricao = "Descrição é obrigatória"
    if (!ferramenta) newErrors.ferramenta = "Selecione uma ferramenta"
    if (!criticidade) newErrors.criticidade = "Selecione a criticidade"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    toast.success("Chamado criado com sucesso!")
    router.push("/chamados")
  }

  function handleAddFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) setArquivos((p) => [...p, ...Array.from(e.target.files!)])
    e.target.value = ""
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
          <TicketPlus className="h-5 w-5 text-success" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Novo Chamado</h1>
          <p className="text-sm text-muted-foreground">Preencha os campos abaixo para abrir um novo chamado</p>
        </div>
      </div>

      <Card className="mx-auto max-w-2xl border shadow-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <FormField label="Título" required error={errors.titulo}>
              <Input
                placeholder="Ex: Erro ao gerar relatório de vendas"
                value={titulo}
                onChange={(e) => { setTitulo(e.target.value); setErrors((p) => ({ ...p, titulo: "" })) }}
                className={errors.titulo ? "border-destructive" : ""}
              />
            </FormField>

            <FormField label="Descrição" required error={errors.descricao}>
              <Textarea
                rows={5}
                placeholder="Descreva o problema ou solicitação com detalhes..."
                value={descricao}
                onChange={(e) => { setDescricao(e.target.value); setErrors((p) => ({ ...p, descricao: "" })) }}
                className={errors.descricao ? "border-destructive" : ""}
              />
            </FormField>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormField label="Ferramenta" required error={errors.ferramenta}>
                <Select value={ferramenta} onValueChange={(v) => { setFerramenta(v); setErrors((p) => ({ ...p, ferramenta: "" })) }}>
                  <SelectTrigger className={errors.ferramenta ? "border-destructive" : ""}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {FERRAMENTAS.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Criticidade" required error={errors.criticidade}>
                <Select value={criticidade} onValueChange={(v) => { setCriticidade(v); setErrors((p) => ({ ...p, criticidade: "" })) }}>
                  <SelectTrigger className={errors.criticidade ? "border-destructive" : ""}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {CRITICIDADES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Classificação">
                <Select value={classificacao} onValueChange={setClassificacao}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {CLASSIFICACOES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            {/* Anexos */}
            <FormField label="Anexos">
              <div className="flex flex-col gap-2">
                <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border bg-muted/50 px-3 py-2 text-sm transition-colors hover:bg-muted">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Adicionar arquivo</span>
                  <input type="file" multiple className="sr-only" onChange={handleAddFile} />
                </label>
                {arquivos.map((file, i) => (
                  <div key={i} className="flex items-center gap-2 rounded border bg-muted/30 px-2 py-1 text-xs">
                    <Paperclip className="h-3 w-3 text-muted-foreground" />
                    <span className="flex-1 truncate">{file.name}</span>
                    <button type="button" onClick={() => setArquivos((p) => p.filter((_, idx) => idx !== i))} className="text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </FormField>

            <div className="flex justify-end gap-3 border-t pt-4">
              <Button type="button" variant="outline" onClick={() => router.push("/chamados")}>Cancelar</Button>
              <Button type="submit" disabled={submitting} className="gap-2">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" />Criando...</> : <><Send className="h-4 w-4" />Criar Chamado</>}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function FormField({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
}
