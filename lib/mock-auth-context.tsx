"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "student" | "coach" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo purposes
const mockUsers: (User & { password: string })[] = [
  { id: "1", name: "Tito", email: "tito@alu.edu", password: "password123", role: "student" },
  { id: "2", name: "Mugisha Chris", email: "mugisha.chris@alu.edu", password: "password123", role: "coach" },
  { id: "3", name: "Admin User", email: "admin@alu.edu", password: "password123", role: "admin" },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
