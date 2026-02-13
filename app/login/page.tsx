import { LoginForm } from "@/components/helpdesk/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - Help Desk FOCOPDV",
  description: "Acesse o sistema de gerenciamento de chamados Help Desk FOCOPDV",
}

export default function LoginPage() {
  return <LoginForm />
}
