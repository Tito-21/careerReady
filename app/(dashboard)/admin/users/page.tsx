"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockStudents } from "@/lib/mock-data"
import {
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Mail,
  Eye,
  Trash2,
  Users,
  GraduationCap,
  Shield,
} from "lucide-react"

const allUsers = [
  ...mockStudents.map((s) => ({ ...s, role: "student" as const })),
  { id: "c1", name: "Dr. Sarah Coach", email: "sarah.c@alu.edu", role: "coach" as const, program: "Career Services", year: null, readinessScore: null, skills: null, experiences: null },
  { id: "c2", name: "Prof. James Mentor", email: "james.m@alu.edu", role: "coach" as const, program: "Career Services", year: null, readinessScore: null, skills: null, experiences: null },
  { id: "a1", name: "Admin User", email: "admin@alu.edu", role: "admin" as const, program: "Administration", year: null, readinessScore: null, skills: null, experiences: null },
]

const roleColors = {
  student: "bg-chart-1/10 text-chart-1 border-chart-1/30",
  coach: "bg-chart-2/10 text-chart-2 border-chart-2/30",
  admin: "bg-primary/10 text-primary border-primary/30",
}

const roleIcons = {
  student: GraduationCap,
  coach: Users,
  admin: Shield,
}

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = !selectedRole || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  const roles = ["student", "coach", "admin"] as const

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Manage Users</h1>
          <p className="text-muted-foreground mt-1">View and manage all platform users.</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold">{allUsers.filter((u) => u.role === "student").length}</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">{allUsers.filter((u) => u.role === "coach").length}</p>
                <p className="text-sm text-muted-foreground">Coaches</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{allUsers.filter((u) => u.role === "admin").length}</p>
                <p className="text-sm text-muted-foreground">Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedRole === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRole(null)}
          >
            <Filter className="h-4 w-4 mr-2" />
            All
          </Button>
          {roles.map((role) => {
            const Icon = roleIcons[role]
            return (
              <Button
                key={role}
                variant={selectedRole === role ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRole(role)}
                className="capitalize"
              >
                <Icon className="h-4 w-4 mr-2" />
                {role}s
              </Button>
            )
          })}
        </div>
      </div>

      {/* Users Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>{filteredUsers.length} users found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredUsers.map((user) => {
              const Icon = roleIcons[user.role]
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{user.name}</p>
                        <Badge variant="outline" className={`${roleColors[user.role]} capitalize`}>
                          <Icon className="h-3 w-3 mr-1" />
                          {user.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {user.role === "student" && user.readinessScore && (
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium">{user.readinessScore}% Ready</p>
                        <p className="text-xs text-muted-foreground">
                          {user.program} - Year {user.year}
                        </p>
                      </div>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
