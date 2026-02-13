import { AllTickets } from "@/components/helpdesk/all-tickets"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Todos os Chamados - Help Desk FOCOPDV",
  description: "Lista completa de todos os chamados do sistema Help Desk FOCOPDV",
}

export default function ChamadosPage() {
  return <AllTickets />
}
