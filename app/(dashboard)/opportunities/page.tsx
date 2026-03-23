"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockOpportunities, type Opportunity } from "@/lib/mock-data"
import {
  Search,
  Briefcase,
  GraduationCap,
  Lightbulb,
  MapPin,
  Calendar,
  Building2,
  Filter,
  Clock,
  ExternalLink,
  BookmarkPlus,
  ArrowUpRight,
} from "lucide-react"

const typeIcons = {
  job: Briefcase,
  internship: GraduationCap,
  entrepreneurship: Lightbulb,
}

const typeColors = {
  job: "bg-primary text-primary-foreground",
  internship: "bg-chart-1 text-white",
  entrepreneurship: "bg-chart-2 text-white",
}

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>([])

  const filteredOpportunities = mockOpportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !selectedType || opp.type === selectedType
    return matchesSearch && matchesType
  })

  const toggleSave = (id: string) => {
    setSavedOpportunities((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const types = ["job", "internship", "entrepreneurship"] as const

  const getDaysUntilDeadline = (deadline: string) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Opportunities</h1>
        <p className="text-muted-foreground mt-1">
          Discover jobs, internships, and entrepreneurship programs matched to your profile.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockOpportunities.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockOpportunities.filter((o) => o.type === "job").length}</p>
                <p className="text-sm text-muted-foreground">Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockOpportunities.filter((o) => o.type === "internship").length}</p>
                <p className="text-sm text-muted-foreground">Internships</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <BookmarkPlus className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">{savedOpportunities.length}</p>
                <p className="text-sm text-muted-foreground">Saved</p>
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
            placeholder="Search opportunities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedType === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType(null)}
          >
            <Filter className="h-4 w-4 mr-2" />
            All
          </Button>
          {types.map((type) => {
            const Icon = typeIcons[type]
            return (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="capitalize"
              >
                <Icon className="h-4 w-4 mr-2" />
                {type === "entrepreneurship" ? "Programs" : `${type}s`}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.length === 0 ? (
          <Card className="md:col-span-2 lg:col-span-3 border-border">
            <CardContent className="py-12 text-center">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No opportunities found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search or filters to find more opportunities.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredOpportunities.map((opportunity) => {
            const Icon = typeIcons[opportunity.type]
            const daysLeft = getDaysUntilDeadline(opportunity.deadline)
            const isSaved = savedOpportunities.includes(opportunity.id)
            const isUrgent = daysLeft <= 7

            return (
              <Card
                key={opportunity.id}
                className="border-border hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <Badge className={`${typeColors[opportunity.type]} capitalize`}>
                      <Icon className="h-3 w-3 mr-1" />
                      {opportunity.type}
                    </Badge>
                    <button
                      onClick={() => toggleSave(opportunity.id)}
                      className={`p-1.5 rounded-md transition-colors ${
                        isSaved
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <BookmarkPlus className="h-4 w-4" />
                    </button>
                  </div>
                  <CardTitle className="text-lg leading-tight mt-3">{opportunity.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {opportunity.company}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {opportunity.location}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{opportunity.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {opportunity.requirements.slice(0, 3).map((req, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                    {opportunity.requirements.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{opportunity.requirements.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Clock className={`h-4 w-4 ${isUrgent ? "text-destructive" : "text-muted-foreground"}`} />
                      <span className={isUrgent ? "text-destructive font-medium" : "text-muted-foreground"}>
                        {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
                      </span>
                    </div>
                    <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                      Apply
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Featured Opportunity */}
      {mockOpportunities.length > 0 && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Featured</Badge>
            </div>
            <CardTitle>Tony Elumelu Foundation Entrepreneurship Programme</CardTitle>
            <CardDescription>Pan-African opportunity for aspiring entrepreneurs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The Tony Elumelu Foundation Entrepreneurship Programme is the largest African philanthropy 
              empowering a new generation of African entrepreneurs. Selected entrepreneurs receive $5,000 
              seed capital, access to mentors, and business management training.
            </p>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Pan-African</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Deadline: May 31, 2026</span>
              </div>
            </div>
            <Button>
              Learn More
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
