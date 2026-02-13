"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  X,
  Send,
  Plus,
  Paperclip,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react"
import {
  CRITICIDADES,
  CLASSIFICACOES,
  STATUS_INTERNOS,
  FERRAMENTAS,
  RESPONSAVEIS,
  TIPOS_INTERACAO,
} from "@/lib/chamado/constants"
import type { TipoInteracao } from "@/lib/chamado/types"
import { toast } from "sonner"

interface NewInteractionFormProps {
  open: boolean
  onClose: () => void
  chamadoId: number
}

export function NewInteractionForm({ open, onClose, chamadoId }: NewInteractionFormProps) {
  const [mensagem, setMensagem] = useState("")
  const [tipoInteracao, setTipoInteracao] = useState<TipoInteracao>("publica")
  const [responsavel, setResponsavel] = useState("")
  const [criticidade, setCriticidade] = useState("")
  const [classificacao, setClassificacao] = useState("")
  const [ferramenta, setFerramenta] = useState("")
  const [statusInterno, setStatusInterno] = useState("")
  const [arquivos, setArquivos] = useState<File[]>([])
  const [dataEntrega, setDataEntrega] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const newErrors: Record<string, string> = {}
    if (!mensagem.trim()) newErrors.mensagem = "Campo obrigatório"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleAddFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setArquivos((prev) => [...prev, ...Array.from(e.target.files!)])
    }
    e.target.value = ""
  }

  function handleRemoveFile(index: number) {
    setArquivos((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit() {
    if (!validate()) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    toast.success("Interação adicionada com sucesso!")
    resetForm()
    onClose()
  }

  function resetForm() {
    setMensagem("")
    setTipoInteracao("publica")
    setResponsavel("")
    setCriticidade("")
    setClassificacao("")
    setFerramenta("")
    setStatusInterno("")
    setArquivos([])
    setDataEntrega("")
    setErrors({})
  }

  function handleClose() {
    resetForm()
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 right-0 top-14 z-50 flex w-full flex-col border-l bg-card shadow-2xl sm:w-[420px] lg:w-[460px]"
            role="dialog"
            aria-modal="true"
            aria-label="Nova Interação"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-5 py-3">
              <h3 className="text-base font-semibold text-foreground">Nova Interação</h3>
              <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
                <X className="h-4 w-4" />
                <span className="sr-only">Fechar</span>
              </Button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="flex flex-col gap-5">
                {/* Mensagem */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="interacao-msg" className="text-sm font-medium">
                    Mensagem <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="interacao-msg"
                    rows={5}
                    placeholder="Digite sua interação..."
                    value={mensagem}
                    onChange={(e) => {
                      setMensagem(e.target.value)
                      if (errors.mensagem) setErrors((p) => ({ ...p, mensagem: "" }))
                    }}
                    className={errors.mensagem ? "border-destructive" : ""}
                  />
                  {errors.mensagem && (
                    <p className="flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      {errors.mensagem}
                    </p>
                  )}
                </div>

                {/* Row: Responsável + Criticidade */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">Responsável Atual</Label>
                    <Select value={responsavel} onValueChange={setResponsavel}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        {RESPONSAVEIS.map((r) => (
                          <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">Criticidade</Label>
                    <Select value={criticidade} onValueChange={setCriticidade}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        {CRITICIDADES.map((c) => (
                          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row: Classificação + Ferramenta */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">Classificação</Label>
                    <Select value={classificacao} onValueChange={setClassificacao}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        {CLASSIFICACOES.map((c) => (
                          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">Ferramentas</Label>
                    <Select value={ferramenta} onValueChange={setFerramenta}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        {FERRAMENTAS.map((f) => (
                          <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Status Interno */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Status Interno</Label>
                  <Select value={statusInterno} onValueChange={setStatusInterno}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {STATUS_INTERNOS.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tipo de Interação */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Tipo de Interação</Label>
                  <RadioGroup
                    value={tipoInteracao}
                    onValueChange={(v) => setTipoInteracao(v as TipoInteracao)}
                    className="flex gap-4"
                  >
                    {TIPOS_INTERACAO.map((t) => (
                      <div key={t.value} className="flex items-center gap-2">
                        <RadioGroupItem value={t.value} id={`tipo-${t.value}`} />
                        <Label htmlFor={`tipo-${t.value}`} className="cursor-pointer text-sm">
                          {t.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Anexos */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Anexo(s)</Label>
                  <div className="flex items-center gap-2">
                    <label className="flex cursor-pointer items-center gap-2 rounded-md border bg-muted/50 px-3 py-2 text-sm transition-colors hover:bg-muted">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Escolher arquivo</span>
                      <input type="file" multiple className="sr-only" onChange={handleAddFile} />
                    </label>
                  </div>
                  {arquivos.length > 0 && (
                    <div className="mt-1 flex flex-col gap-1">
                      {arquivos.map((file, i) => (
                        <div key={i} className="flex items-center gap-2 rounded border bg-muted/30 px-2 py-1 text-xs">
                          <Paperclip className="h-3 w-3 text-muted-foreground" />
                          <span className="flex-1 truncate">{file.name}</span>
                          <button onClick={() => handleRemoveFile(i)} className="text-destructive hover:text-destructive/80">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Data/Hora de Entrega */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Data/Hora de Entrega</Label>
                  <Input
                    type="datetime-local"
                    value={dataEntrega}
                    onChange={(e) => setDataEntrega(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t px-5 py-3">
              <Button variant="outline" size="sm" onClick={handleClose} disabled={submitting}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSubmit} disabled={submitting} className="gap-2">
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Enviar
                  </>
                )}
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
