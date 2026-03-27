"use client"

import { createContext, useContext, type ReactNode } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { useAuth } from "@/lib/mock-auth-context"
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

// Mock profile data based on authenticated user
const getMockProfile = (user: any): Profile | null => {
  if (!user) return null
  
  const profiles = {
    "1": { 
      id: "1", 
      first_name: "Tito", 
      last_name: "", 
      role: "student" as const, 
      university: "African Leadership University",
      major: "Software Engineering",
      graduation_year: 2025,
      phone: null,
      linkedin_url: null,
      github_url: null,
      portfolio_url: null,
      bio: null,
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    "2": { 
      id: "2", 
      first_name: "Mugisha", 
      last_name: "Chris", 
      role: "coach" as const, 
      university: "African Leadership University",
      major: null,
      graduation_year: null,
      phone: null,
      linkedin_url: null,
      github_url: null,
      portfolio_url: null,
      bio: null,
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    "3": { 
      id: "3", 
      first_name: "Admin", 
      last_name: "User", 
      role: "admin" as const, 
      university: "African Leadership University",
      major: null,
      graduation_year: null,
      phone: null,
      linkedin_url: null,
      github_url: null,
      portfolio_url: null,
      bio: null,
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }
  
  return profiles[user.id as keyof typeof profiles] || null
}

interface DashboardLayoutClientProps {
  children: ReactNode
  profile: Profile | null
  userEmail: string
}

export function MockDashboardLayoutClient({ 
  children, 
  profile, 
  userEmail 
}: DashboardLayoutClientProps) {
  const { user, isAuthenticated } = useAuth()
  
  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    window.location.href = "/login-mock"
    return null
  }
  
  const mockProfile = getMockProfile(user)
  
  return (
    <UserContext.Provider value={{ profile: mockProfile, userEmail: user.email }}>
      <div className="min-h-screen bg-background">
        <Header profile={mockProfile} userEmail={user.email} />
        <div className="flex">
          <Sidebar className="hidden md:block" role={mockProfile?.role || "student"} />
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>
    </UserContext.Provider>
  )
}
