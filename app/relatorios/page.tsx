import { ReportsPage } from "@/components/helpdesk/reports-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Relatório Geral - Help Desk FOCOPDV",
  description: "Relatórios gerais do sistema Help Desk FOCOPDV",
}

export default function RelatoriosPage() {
  return <ReportsPage />
}
