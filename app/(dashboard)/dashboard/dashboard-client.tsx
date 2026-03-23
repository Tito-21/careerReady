"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { Profile, Skill, Experience, CareerReadinessScore, Opportunity } from "@/lib/database.types"
import {
  TrendingUp,
  Briefcase,
  Award,
  Target,
  ArrowRight,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
} from "lucide-react"
import Link from "next/link"

interface DashboardClientProps {
  profile: Profile | null
  skills: Skill[]
  experiences: Experience[]
  careerScore: CareerReadinessScore | null
  opportunities: Opportunity[]
}

export function DashboardClient({
  profile,
  skills,
  experiences,
  careerScore,
  opportunities,
}: DashboardClientProps) {
  const verifiedSkills = skills.filter((s) => s.verified)
  const upcomingDeadlines = opportunities
    .filter((o) => o.deadline && new Date(o.deadline) > new Date())
    .slice(0, 3)

  const overallScore = careerScore?.overall_score || 0
  const skillsScore = careerScore?.skills_score || 0
  const experienceScore = careerScore?.experience_score || 0
  const profileScore = careerScore?.profile_score || 0

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Welcome back, {profile?.first_name || "Student"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {"Here's an overview of your career readiness progress."}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Career Score</p>
                <p className="text-3xl font-bold text-foreground">{overallScore}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
            <Progress value={overallScore} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Skills</p>
                <p className="text-3xl font-bold text-foreground">{skills.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-chart-1/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-chart-1" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {verifiedSkills.length} verified
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Experiences</p>
                <p className="text-3xl font-bold text-foreground">{experiences.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-chart-2/10 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-chart-2" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {experiences.filter((e) => e.type === "internship").length} internships
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certifications</p>
                <p className="text-3xl font-bold text-foreground">
                  {experiences.filter((e) => e.type === "certification").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-chart-3/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-chart-3" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Earned this year</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Career Readiness Breakdown */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader>
            <CardTitle>Career Readiness Breakdown</CardTitle>
            <CardDescription>Your progress across different areas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Skills Development</span>
                  <span className="text-sm text-muted-foreground">{skillsScore}%</span>
                </div>
                <Progress value={skillsScore} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Work Experience</span>
                  <span className="text-sm text-muted-foreground">{experienceScore}%</span>
                </div>
                <Progress value={experienceScore} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <span className="text-sm text-muted-foreground">{profileScore}%</span>
                </div>
                <Progress value={profileScore} className="h-2" />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <h4 className="font-medium text-sm mb-2">Recommendation</h4>
              <p className="text-sm text-muted-foreground">
                {experienceScore < 50
                  ? "Focus on gaining more work experience through internships or projects to improve your overall career readiness score."
                  : skillsScore < 50
                  ? "Consider adding more skills and getting them verified by coaches to boost your profile."
                  : "Great progress! Keep building your experience and expanding your skill set."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Deadlines</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/opportunities">View all</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.length > 0 ? (
                upcomingDeadlines.map((opportunity) => (
                  <div key={opportunity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{opportunity.title}</p>
                      <p className="text-xs text-muted-foreground">{opportunity.company}</p>
                      {opportunity.deadline && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(opportunity.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No upcoming deadlines
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills and Experiences */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Skills */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Skills</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/skills">
                  Manage skills
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {skills.length > 0 ? (
                skills.slice(0, 4).map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      {skill.verified ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{skill.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{skill.category}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {skill.proficiency}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No skills added yet. <Link href="/skills" className="text-primary hover:underline">Add your first skill</Link>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Experiences */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Experiences</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/experiences">
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {experiences.length > 0 ? (
                experiences.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm">{exp.title}</p>
                        <p className="text-xs text-muted-foreground">{exp.organization}</p>
                      </div>
                      <Badge variant="outline" className="capitalize shrink-0">
                        {exp.type}
                      </Badge>
                    </div>
                    {exp.start_date && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(exp.start_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        {exp.end_date && ` - ${new Date(exp.end_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`}
                        {exp.is_current && " - Present"}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No experiences added yet. <Link href="/experiences" className="text-primary hover:underline">Add your first experience</Link>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Opportunities */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recommended Opportunities</CardTitle>
              <CardDescription>Based on your skills and interests</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link href="/opportunities">Browse all</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {opportunities.length > 0 ? (
              opportunities.slice(0, 3).map((opportunity) => (
                <div key={opportunity.id} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge 
                      variant={opportunity.type === "job" ? "default" : opportunity.type === "internship" ? "secondary" : "outline"} 
                      className="capitalize"
                    >
                      {opportunity.type}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{opportunity.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{opportunity.company}</p>
                  {opportunity.location && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3" />
                      {opportunity.location}
                      {opportunity.is_remote && " (Remote)"}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground col-span-3 text-center py-8">
                No opportunities available at the moment
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
