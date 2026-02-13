import { getChamadoById, allChamados } from "@/lib/helpdesk-data"
import { TicketDetail } from "@/components/helpdesk/ticket-detail"
import { TicketNotFound } from "@/components/helpdesk/ticket-not-found"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const chamado = getChamadoById(Number(id))
  return {
    title: chamado
      ? `#${chamado.id} ${chamado.titulo} - Help Desk FOCOPDV`
      : "Chamado não encontrado - Help Desk FOCOPDV",
  }
}

export default async function ChamadoDetailPage({ params }: Props) {
  const { id } = await params
  const chamado = getChamadoById(Number(id))

  if (!chamado) {
    return <TicketNotFound id={id} />
  }

  return <TicketDetail chamado={chamado} />
}
