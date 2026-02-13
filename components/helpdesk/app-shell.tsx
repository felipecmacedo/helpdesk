"use client"

import { HelpdeskHeader } from "./header"
import { HelpdeskFooter } from "./footer"
import { ScrollToTop } from "./scroll-to-top"
import { Toaster } from "sonner"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HelpdeskHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 lg:py-8">
        {children}
      </main>
      <HelpdeskFooter />
      <ScrollToTop />
      <Toaster richColors position="top-right" />
    </div>
  )
}
