import { MyTickets } from "@/components/helpdesk/my-tickets"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meus Chamados - Help Desk FOCOPDV",
  description: "Lista dos chamados atribuídos ao usuário",
}

export default function MeusChamadosPage() {
  return <MyTickets />
}
