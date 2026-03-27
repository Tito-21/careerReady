import { AuthProvider } from "@/lib/mock-auth-context"
import MockDashboardLayout from "./mock-layout-wrapper"

export default function MockLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <MockDashboardLayout>
        {children}
      </MockDashboardLayout>
    </AuthProvider>
  )
}
