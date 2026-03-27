import { MockDashboardLayoutClient } from "./mock-layout-client"

export default function MockDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MockDashboardLayoutClient profile={null} userEmail="">
      {children}
    </MockDashboardLayoutClient>
  )
}
