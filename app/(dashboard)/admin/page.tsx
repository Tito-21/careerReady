"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockStudents, mockOpportunities } from "@/lib/mock-data"
import {
  Users,
  GraduationCap,
  Building2,
  TrendingUp,
  ArrowRight,
  BarChart3,
  UserPlus,
  FileText,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  const totalStudents = mockStudents.length
  const avgReadiness = Math.round(mockStudents.reduce((acc, s) => acc + s.readinessScore, 0) / totalStudents)
  const totalOpportunities = mockOpportunities.length

  const recentStudents = mockStudents.slice(0, 4)

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage users, opportunities, and system settings.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/reports">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/users">
              <UserPlus className="h-4 w-4 mr-2" />
              Manage Users
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold text-foreground">{totalStudents}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <span className="text-primary">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Readiness</p>
                <p className="text-3xl font-bold text-foreground">{avgReadiness}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-chart-1/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-chart-1" />
              </div>
            </div>
            <Progress value={avgReadiness} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Career Coaches</p>
                <p className="text-3xl font-bold text-foreground">8</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-chart-2/10 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-chart-2" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              1:50 coach-to-student ratio
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Opportunities</p>
                <p className="text-3xl font-bold text-foreground">{totalOpportunities}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-chart-3/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-chart-3" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <span className="text-primary">+5</span> added this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/users">
                <Users className="h-4 w-4 mr-3" />
                Manage Users
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/opportunities">
                <Building2 className="h-4 w-4 mr-3" />
                Manage Opportunities
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/reports">
                <BarChart3 className="h-4 w-4 mr-3" />
                View Reports
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-3" />
              System Settings
            </Button>
          </CardContent>
        </Card>

        {/* Recent Students */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Students</CardTitle>
                <CardDescription>Newly registered students</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/users">
                  View all
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {student.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.program} - Year {student.year}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={student.readinessScore >= 75 ? "default" : student.readinessScore >= 50 ? "secondary" : "outline"}>
                      {student.readinessScore}% Ready
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Overview */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Readiness Distribution</CardTitle>
          <CardDescription>Student career readiness score distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-3xl font-bold text-destructive">15%</p>
              <p className="text-sm text-muted-foreground mt-1">Below 50%</p>
              <p className="text-xs text-muted-foreground">Need intervention</p>
            </div>
            <div className="p-4 rounded-lg bg-chart-4/10 border border-chart-4/20">
              <p className="text-3xl font-bold text-chart-4">35%</p>
              <p className="text-sm text-muted-foreground mt-1">50-69%</p>
              <p className="text-xs text-muted-foreground">Developing</p>
            </div>
            <div className="p-4 rounded-lg bg-chart-1/10 border border-chart-1/20">
              <p className="text-3xl font-bold text-chart-1">35%</p>
              <p className="text-sm text-muted-foreground mt-1">70-84%</p>
              <p className="text-xs text-muted-foreground">On track</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-3xl font-bold text-primary">15%</p>
              <p className="text-sm text-muted-foreground mt-1">85%+</p>
              <p className="text-xs text-muted-foreground">Job ready</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest platform activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New student registered", user: "Michael Okonkwo", time: "2 hours ago" },
              { action: "Opportunity posted", user: "Admin", time: "5 hours ago" },
              { action: "Skill verified", user: "Dr. Sarah Coach", time: "1 day ago" },
              { action: "Certificate uploaded", user: "Jane Smith", time: "1 day ago" },
              { action: "Feedback provided", user: "Dr. Sarah Coach", time: "2 days ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">by {activity.user}</p>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
