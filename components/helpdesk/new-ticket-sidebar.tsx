"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Ticket, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SearchableSelect } from "./searchable-select"

const ferramentas = [
  { value: "foco-pdv", label: "Foco PDV" },
  { value: "herbamed", label: "Herbamed" },
  { value: "geolab", label: "Geolab" },
  { value: "teuto", label: "Teuto" },
  { value: "mais-saude", label: "Mais Saude" },
  { value: "maxifarma", label: "Maxifarma" },
  { value: "luchefarma", label: "Luchefarma" },
  { value: "sogamax", label: "Sogamax" },
  { value: "milfarma", label: "Milfarma" },
  { value: "vitamedic", label: "Vitamedic" },
  { value: "globo-pharma", label: "Globo Pharma" },
  { value: "farmarcas", label: "Farmarcas" },
  { value: "febrafar", label: "Febrafar" },
]

const prioridades = [
  { value: "alto", label: "Alto" },
  { value: "intermediario", label: "Intermediario" },
  { value: "baixo", label: "Baixo" },
]

interface NewTicketSidebarProps {
  open: boolean
  onClose: () => void
}

export function NewTicketSidebar({ open, onClose }: NewTicketSidebarProps) {
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [ferramenta, setFerramenta] = useState("")
  const [prioridade, setPrioridade] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const newErrors: Record<string, string> = {}
    if (!titulo.trim()) newErrors.titulo = "Titulo e obrigatorio"
    if (!descricao.trim()) newErrors.descricao = "Descricao e obrigatoria"
    if (!ferramenta) newErrors.ferramenta = "Selecione uma ferramenta"
    if (!prioridade) newErrors.prioridade = "Selecione uma prioridade"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit() {
    if (!validate()) return
    setSubmitted(true)
    setTimeout(() => {
      setTitulo("")
      setDescricao("")
      setFerramenta("")
      setPrioridade("")
      setErrors({})
      setSubmitted(false)
      onClose()
    }, 2000)
  }

  function handleClose() {
    setTitulo("")
    setDescricao("")
    setFerramenta("")
    setPrioridade("")
    setErrors({})
    setSubmitted(false)
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 flex w-full flex-col border-r bg-card shadow-2xl sm:w-[520px] lg:w-[50vw]"
            role="dialog"
            aria-modal="true"
            aria-label="Novo Chamado"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
                  <Ticket className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Novo Chamado</h2>
                  <p className="text-sm text-muted-foreground">Preencha os campos abaixo</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Fechar</span>
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex h-full flex-col items-center justify-center gap-4 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10"
                    >
                      <Send className="h-9 w-9 text-success" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-foreground">Chamado Criado!</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Seu chamado foi registrado com sucesso.
                      </p>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Titulo */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="titulo" className="text-sm font-medium text-foreground">
                        Titulo <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="titulo"
                        placeholder="Ex: Erro ao gerar relatorio de vendas"
                        value={titulo}
                        onChange={(e) => {
                          setTitulo(e.target.value)
                          if (errors.titulo) setErrors((prev) => ({ ...prev, titulo: "" }))
                        }}
                        className={errors.titulo ? "border-destructive focus-visible:ring-destructive" : ""}
                      />
                      {errors.titulo && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1 text-xs text-destructive"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.titulo}
                        </motion.p>
                      )}
                    </div>

                    {/* Descricao */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="descricao" className="text-sm font-medium text-foreground">
                        Descricao <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="descricao"
                        placeholder="Descreva o problema ou solicitacao com detalhes..."
                        rows={5}
                        value={descricao}
                        onChange={(e) => {
                          setDescricao(e.target.value)
                          if (errors.descricao) setErrors((prev) => ({ ...prev, descricao: "" }))
                        }}
                        className={errors.descricao ? "border-destructive focus-visible:ring-destructive" : ""}
                      />
                      {errors.descricao && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1 text-xs text-destructive"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.descricao}
                        </motion.p>
                      )}
                    </div>

                    <Separator />

                    {/* Ferramenta */}
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-medium text-foreground">
                        Ferramenta <span className="text-destructive">*</span>
                      </Label>
                      <SearchableSelect
                        options={ferramentas}
                        value={ferramenta}
                        onValueChange={(val) => {
                          setFerramenta(val)
                          if (errors.ferramenta) setErrors((prev) => ({ ...prev, ferramenta: "" }))
                        }}
                        placeholder="Selecione a ferramenta"
                        searchPlaceholder="Pesquisar ferramenta..."
                        emptyMessage="Nenhuma ferramenta encontrada."
                      />
                      {errors.ferramenta && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1 text-xs text-destructive"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.ferramenta}
                        </motion.p>
                      )}
                    </div>

                    {/* Prioridade */}
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-medium text-foreground">
                        Prioridade <span className="text-destructive">*</span>
                      </Label>
                      <SearchableSelect
                        options={prioridades}
                        value={prioridade}
                        onValueChange={(val) => {
                          setPrioridade(val)
                          if (errors.prioridade) setErrors((prev) => ({ ...prev, prioridade: "" }))
                        }}
                        placeholder="Selecione a prioridade"
                        searchPlaceholder="Pesquisar prioridade..."
                        emptyMessage="Nenhuma prioridade encontrada."
                      />
                      {errors.prioridade && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1 text-xs text-destructive"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.prioridade}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {!submitted && (
              <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
                <Button variant="outline" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit} className="gap-2">
                  <Send className="h-4 w-4" />
                  Criar Chamado
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
