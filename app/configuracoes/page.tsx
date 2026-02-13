import { SettingsPage } from "@/components/helpdesk/settings-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Configurações Gerais - Help Desk FOCOPDV",
  description: "Configurações gerais do sistema Help Desk FOCOPDV",
}

export default function ConfiguracoesPage() {
  return <SettingsPage />
}
