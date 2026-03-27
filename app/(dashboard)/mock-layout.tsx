import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"
import { DashboardLayoutClient } from "./layout-client"

// Mock profile data for development
const mockProfiles = {
  "1": { id: "1", first_name: "Tito", last_name: "", role: "student", university: "African Leadership University", major: "Software Engineering", graduation_year: 2025 },
  "2": { id: "2", first_name: "Mugisha", last_name: "Chris", role: "coach", university: "African Leadership University" },
  "3": { id: "3", first_name: "Admin", last_name: "User", role: "admin", university: "African Leadership University" }
}

export default async function MockDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is logged in via localStorage (client-side check)
  // For now, we'll bypass the server-side auth check and let the client handle it
  
  return (
    <DashboardLayoutClient profile={null} userEmail="">
      {children}
    </DashboardLayoutClient>
  )
}
