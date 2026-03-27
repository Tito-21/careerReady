"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Mail,
  Award,
  BookOpen,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function CoachStudentDetailPage({ params }: { params: { id: string } }) {
  const student = mockStudents.find(s => s.id === params.id)
  
  if (!student) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Student Not Found</h1>
        <p className="text-muted-foreground mb-4">The student you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/coach/students">Back to Students</Link>
        </Button>
      </div>
    )
  }

  const skillCategories = [
    { name: "Technical Skills", count: Math.floor(student.skills * 0.4), color: "bg-chart-1" },
    { name: "Soft Skills", count: Math.floor(student.skills * 0.3), color: "bg-chart-2" },
    { name: "Industry Skills", count: Math.floor(student.skills * 0.3), color: "bg-chart-3" },
  ]

  const recentActivities = [
    { type: "skill", title: "Added React.js", date: "2 days ago", icon: TrendingUp },
    { type: "experience", title: "Updated Internship at ALX", date: "1 week ago", icon: Award },
    { type: "skill", title: "Completed Python Certification", date: "2 weeks ago", icon: BookOpen },
  ]

  const recommendations = [
    "Focus on leadership skills for management roles",
    "Consider adding more project-based experience",
    "Improve communication and presentation skills",
    "Explore internship opportunities in tech companies",
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/coach/students">
              <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
              Back to Students
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{student.name}</h1>
            <p className="text-muted-foreground">{student.program} - Year {student.year}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Student Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Card */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Career Readiness Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Readiness</span>
                    <Badge 
                      variant={student.readinessScore >= 70 ? "default" : "destructive"}
                      className="text-sm"
                    >
                      {student.readinessScore}%
                    </Badge>
                  </div>
                  <Progress value={student.readinessScore} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {student.readinessScore >= 70 ? "On track for career success" : "Needs improvement to meet career goals"}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Skills</span>
                    <span className="text-sm font-medium">{student.skills} total</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Experiences</span>
                    <span className="text-sm font-medium">{student.experiences} total</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant={student.readinessScore >= 70 ? "default" : "secondary"}>
                      {student.readinessScore >= 70 ? "On Track" : "Needs Attention"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Tabs */}
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="skills">Skills & Progress</TabsTrigger>
              <TabsTrigger value="experiences">Experiences</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="skills" className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Skills Breakdown</CardTitle>
                  <CardDescription>Distribution of skills across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillCategories.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{category.name}</span>
                          <span className="text-sm text-muted-foreground">{category.count} skills</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`${category.color} h-2 rounded-full`}
                            style={{ width: `${(category.count / student.skills) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="experiences" className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Experience Portfolio</CardTitle>
                  <CardDescription>Internships, projects, and certifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="font-medium">Software Engineering Intern</span>
                        <Badge variant="outline" className="text-xs">ALX Africa</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Jan 2024 - Present • 6 months</p>
                      <p className="text-sm mt-2">Developed web applications using React and Node.js, collaborated with cross-functional teams.</p>
                    </div>
                    <div className="p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="font-medium">Full Stack Development</span>
                        <Badge variant="outline" className="text-xs">Certification</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Completed • Dec 2023</p>
                      <p className="text-sm mt-2">Comprehensive certification covering modern web development technologies and best practices.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => {
                      const Icon = activity.icon
                      return (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Actions & Recommendations */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-3" />
                Send Feedback
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-3" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-3" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/opportunities">
                  <Eye className="h-4 w-4 mr-3" />
                  Browse Opportunities
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Coach Recommendations</CardTitle>
              <CardDescription>Personalized guidance for {student.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">{rec}</p>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                Add Recommendation
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{student.name.toLowerCase().replace(' ', '.')}@alu.edu</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Available for meetings</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
