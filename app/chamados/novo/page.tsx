import { NewTicketPage } from "@/components/helpdesk/new-ticket-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Novo Chamado - Help Desk FOCOPDV",
  description: "Criar um novo chamado no sistema Help Desk FOCOPDV",
}

export default function NovoChamadoPage() {
  return <NewTicketPage />
}
