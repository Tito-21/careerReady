"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

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
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo purposes
const mockUsers: (User & { password: string })[] = [
  { id: "1", name: "John Doe", email: "student@alu.edu", password: "password123", role: "student" },
  { id: "2", name: "Dr. Sarah Coach", email: "coach@alu.edu", password: "password123", role: "coach" },
  { id: "3", name: "Admin User", email: "admin@alu.edu", password: "password123", role: "admin" },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      return true
    }
    return false
  }, [])

  const register = useCallback(
    async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
      const newUser: User = {
        id: String(mockUsers.length + 1),
        name,
        email,
        role,
      }
      mockUsers.push({ ...newUser, password })
      setUser(newUser)
      return true
    },
    []
  )

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
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
