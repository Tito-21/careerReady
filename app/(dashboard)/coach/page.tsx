"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockStudents } from "@/lib/mock-data"
import {
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Eye,
  Calendar,
} from "lucide-react"
import Link from "next/link"

export default function CoachDashboardPage() {
  const assignedStudents = mockStudents
  const avgReadiness = Math.round(assignedStudents.reduce((acc, s) => acc + s.readinessScore, 0) / assignedStudents.length)
  const needsAttention = assignedStudents.filter((s) => s.readinessScore < 70)
  const onTrack = assignedStudents.filter((s) => s.readinessScore >= 70)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Coach Dashboard</h1>
        <p className="text-muted-foreground mt-1">Monitor and guide your assigned students.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assigned Students</p>
                <p className="text-3xl font-bold text-foreground">{assignedStudents.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
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
                <p className="text-sm font-medium text-muted-foreground">Needs Attention</p>
                <p className="text-3xl font-bold text-foreground">{needsAttention.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Below 70% readiness</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Track</p>
                <p className="text-3xl font-bold text-foreground">{onTrack.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-chart-1/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-chart-1" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">70%+ readiness</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Students Needing Attention */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  Students Needing Attention
                </CardTitle>
                <CardDescription>Students with readiness below 70%</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/coach/students">
                  View all
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {needsAttention.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 mx-auto text-primary mb-4" />
                <p className="font-medium">All students are on track!</p>
                <p className="text-sm text-muted-foreground">No students currently need intervention.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {needsAttention.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-destructive/10 text-destructive">
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.program} - Year {student.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge variant="destructive">{student.readinessScore}%</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{student.skills} skills</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common coaching tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/coach/students">
                <Users className="h-4 w-4 mr-3" />
                View All Students
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-3" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="h-4 w-4 mr-3" />
              Send Feedback
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/opportunities">
                <Eye className="h-4 w-4 mr-3" />
                Browse Opportunities
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* All Students Overview */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Assigned Students</CardTitle>
              <CardDescription>Overview of student progress</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link href="/coach/students">View Details</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {assignedStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {student.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.program}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={student.readinessScore >= 70 ? "default" : "secondary"}>
                    {student.readinessScore}%
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {student.skills} skills / {student.experiences} exp
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
