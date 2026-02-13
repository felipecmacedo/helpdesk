import { TeamReportsPage } from "@/components/helpdesk/team-reports-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Relatório por Equipe - Help Desk FOCOPDV",
  description: "Relatórios por equipe do sistema Help Desk FOCOPDV",
}

export default function RelatoriosEquipePage() {
  return <TeamReportsPage />
}
