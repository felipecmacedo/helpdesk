import { HelpdeskDashboard } from "@/components/helpdesk/dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - Help Desk FOCOPDV",
  description: "Painel de gerenciamento de chamados e suporte Help Desk FOCOPDV",
}

export default function DashboardPage() {
  return <HelpdeskDashboard />
}
