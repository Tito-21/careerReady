"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/database.types"
import {
  LayoutDashboard,
  Briefcase,
  Award,
  FileText,
  Users,
  Settings,
  TrendingUp,
  Building2,
  GraduationCap,
} from "lucide-react"

interface SidebarProps {
  className?: string
  role?: UserRole
}

export function Sidebar({ className, role = "student" }: SidebarProps) {
  const pathname = usePathname()

  const studentLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/skills", label: "Skills", icon: TrendingUp },
    { href: "/experiences", label: "Experiences", icon: Briefcase },
    { href: "/opportunities", label: "Opportunities", icon: Building2 },
    { href: "/profile", label: "Profile", icon: Settings },
  ]

  const coachLinks = [
    { href: "/coach", label: "Dashboard", icon: LayoutDashboard },
    { href: "/coach/students", label: "Students", icon: Users },
    { href: "/opportunities", label: "Opportunities", icon: Building2 },
    { href: "/profile", label: "Profile", icon: Settings },
  ]

  const adminLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Manage Users", icon: Users },
    { href: "/admin/opportunities", label: "Opportunities", icon: Building2 },
    { href: "/admin/reports", label: "Reports", icon: FileText },
    { href: "/profile", label: "Settings", icon: Settings },
  ]

  const getLinks = () => {
    switch (role) {
      case "admin":
        return adminLinks
      case "coach":
        return coachLinks
      default:
        return studentLinks
    }
  }

  const links = getLinks()

  return (
    <aside className={cn("w-64 border-r border-sidebar-border bg-sidebar min-h-[calc(100vh-4rem)]", className)}>
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
              <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-sidebar-foreground capitalize">{role} Portal</p>
              <p className="text-xs text-sidebar-foreground/60">CareerReady</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="rounded-lg bg-sidebar-accent p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-4 w-4 text-sidebar-primary" />
              <span className="text-xs font-medium text-sidebar-foreground">Career Tip</span>
            </div>
            <p className="text-xs text-sidebar-foreground/70">
              Keep your skills updated regularly to improve your career readiness score.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
