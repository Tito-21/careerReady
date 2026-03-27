"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { mockStudents } from "@/lib/mock-data"
import {
  Users,
  Search,
  Filter,
  MessageSquare,
  Eye,
  Calendar,
  Mail,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function CoachStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  
  const assignedStudents = mockStudents
  const needsAttention = assignedStudents.filter((s) => s.readinessScore < 70)
  const onTrack = assignedStudents.filter((s) => s.readinessScore >= 70)

  const filteredStudents = assignedStudents.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.program.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = !selectedFilter || 
      (selectedFilter === "attention" && student.readinessScore < 70) ||
      (selectedFilter === "track" && student.readinessScore >= 70)
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Students</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor your assigned students.</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
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
                <p className="text-3xl font-bold text-foreground">
                  {Math.round(assignedStudents.reduce((acc, s) => acc + s.readinessScore, 0) / assignedStudents.length)}%
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-chart-1/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-chart-1" />
              </div>
            </div>
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
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name or program..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(null)}
          >
            <Filter className="h-4 w-4 mr-2" />
            All
          </Button>
          <Button
            variant={selectedFilter === "attention" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("attention")}
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Needs Attention
          </Button>
          <Button
            variant={selectedFilter === "track" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("track")}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            On Track
          </Button>
        </div>
      </div>

      {/* Students List */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Student List ({filteredStudents.length})</CardTitle>
          <CardDescription>
            {selectedFilter === "attention" && "Students requiring immediate attention"}
            {selectedFilter === "track" && "Students performing well"}
            {!selectedFilter && "All assigned students"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  student.readinessScore < 70 
                    ? "border-destructive/30 bg-destructive/5 hover:border-destructive/50" 
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className={
                      student.readinessScore < 70 
                        ? "bg-destructive/10 text-destructive" 
                        : "bg-primary/10 text-primary"
                    }>
                      {student.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-lg">{student.name}</p>
                      {student.readinessScore < 70 && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Needs Help
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{student.program} - Year {student.year}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {student.skills} skills
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {student.experiences} experiences
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge 
                      variant={student.readinessScore >= 70 ? "default" : "destructive"}
                      className="text-sm px-3 py-1"
                    >
                      {student.readinessScore}% Ready
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {student.readinessScore >= 70 ? "On Track" : "Below Target"}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/coach/student/${student.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
