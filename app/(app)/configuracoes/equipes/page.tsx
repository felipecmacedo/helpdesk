import { TeamsPage } from "@/components/helpdesk/teams-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Equipes - Help Desk FOCOPDV",
  description: "Gerenciamento de equipes do sistema Help Desk FOCOPDV",
}

export default function EquipesPage() {
  return <TeamsPage />
}
