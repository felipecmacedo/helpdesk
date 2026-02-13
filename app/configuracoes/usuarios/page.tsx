import { UsersManagementPage } from "@/components/helpdesk/users-management-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gerenciar Usuários - Help Desk FOCOPDV",
  description: "Gerenciamento de usuários do sistema Help Desk FOCOPDV",
}

export default function UsuariosPage() {
  return <UsersManagementPage />
}
