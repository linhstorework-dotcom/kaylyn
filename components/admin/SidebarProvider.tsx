"use client"

import { createContext, useContext, useState } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SidebarContext = createContext<any>(null)

export function SidebarProvider({ children }: { children: React.ReactNode }) {

  const [open, setOpen] = useState(false)

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(SidebarContext)
}