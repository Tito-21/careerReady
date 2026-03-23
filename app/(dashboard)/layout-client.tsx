"use client"

import { createContext, useContext, type ReactNode } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import type { Profile } from "@/lib/database.types"

interface UserContextType {
  profile: Profile | null
  userEmail: string
}

const UserContext = createContext<UserContextType | null>(null)

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within DashboardLayoutClient")
  }
  return context
}

interface DashboardLayoutClientProps {
  children: ReactNode
  profile: Profile | null
  userEmail: string
}

export function DashboardLayoutClient({ 
  children, 
  profile, 
  userEmail 
}: DashboardLayoutClientProps) {
  return (
    <UserContext.Provider value={{ profile, userEmail }}>
      <div className="min-h-screen bg-background">
        <Header profile={profile} userEmail={userEmail} />
        <div className="flex">
          <Sidebar className="hidden md:block" role={profile?.role || "student"} />
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>
    </UserContext.Provider>
  )
}
