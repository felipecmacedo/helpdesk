"use client"

import { motion } from "framer-motion"
import { Globe, Phone, Mail, MessageCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function HelpdeskFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-12 border-t bg-card"
    >
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <span className="font-semibold text-primary">
              FOCOPDV - Soluções Integradas LTDA
            </span>
          </div>

          <Separator className="max-w-md" />

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              PABX +55 (17) 3216-8650
            </span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="h-3.5 w-3.5" />
              (17) 3216-8650
            </span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              suporte.pdvlink@focopdv.com
            </span>
          </div>

          <p className="text-xs text-muted-foreground/60">
            {"Suporte FocoPDV - Todos os direitos reservados"}
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
