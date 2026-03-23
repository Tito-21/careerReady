"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { mockExperiences, type Experience } from "@/lib/mock-data"
import {
  Plus,
  Search,
  Briefcase,
  FolderGit2,
  Award,
  Users,
  Calendar,
  Building2,
  FileText,
  Upload,
  Filter,
  ExternalLink,
} from "lucide-react"

const typeIcons = {
  internship: Briefcase,
  project: FolderGit2,
  certification: Award,
  extracurricular: Users,
}

const typeColors = {
  internship: "bg-chart-1/10 text-chart-1 border-chart-1/30",
  project: "bg-chart-2/10 text-chart-2 border-chart-2/30",
  certification: "bg-chart-3/10 text-chart-3 border-chart-3/30",
  extracurricular: "bg-chart-4/10 text-chart-4 border-chart-4/30",
}

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>(mockExperiences)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newExperience, setNewExperience] = useState({
    type: "internship" as Experience["type"],
    title: "",
    organization: "",
    startDate: "",
    endDate: "",
    description: "",
    skills: "",
  })

  const filteredExperiences = experiences.filter((exp) => {
    const matchesSearch =
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.organization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !selectedType || exp.type === selectedType
    return matchesSearch && matchesType
  })

  const handleAddExperience = () => {
    const experience: Experience = {
      id: String(experiences.length + 1),
      type: newExperience.type,
      title: newExperience.title,
      organization: newExperience.organization,
      startDate: newExperience.startDate,
      endDate: newExperience.endDate || undefined,
      description: newExperience.description,
      skills: newExperience.skills.split(",").map((s) => s.trim()).filter(Boolean),
    }
    setExperiences([...experiences, experience])
    setNewExperience({
      type: "internship",
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      skills: "",
    })
    setIsAddDialogOpen(false)
  }

  const types = ["internship", "project", "certification", "extracurricular"] as const

  const stats = [
    { type: "internship", label: "Internships", icon: Briefcase, count: experiences.filter((e) => e.type === "internship").length },
    { type: "project", label: "Projects", icon: FolderGit2, count: experiences.filter((e) => e.type === "project").length },
    { type: "certification", label: "Certifications", icon: Award, count: experiences.filter((e) => e.type === "certification").length },
    { type: "extracurricular", label: "Activities", icon: Users, count: experiences.filter((e) => e.type === "extracurricular").length },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Experiences</h1>
          <p className="text-muted-foreground mt-1">Track your internships, projects, and achievements.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Experience</DialogTitle>
              <DialogDescription>Record a new experience to your career portfolio.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                <Label>Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {types.map((type) => {
                    const Icon = typeIcons[type]
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setNewExperience({ ...newExperience, type })}
                        className={`p-3 rounded-lg border text-sm font-medium capitalize transition-colors flex items-center gap-2 ${
                          newExperience.type === type
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {type}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Software Engineering Intern"
                  value={newExperience.title}
                  onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  placeholder="e.g., Tech Company Ltd"
                  value={newExperience.organization}
                  onChange={(e) => setNewExperience({ ...newExperience, organization: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newExperience.startDate}
                    onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newExperience.endDate}
                    onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your role and achievements..."
                  value={newExperience.description}
                  onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  placeholder="e.g., JavaScript, React, Node.js"
                  value={newExperience.skills}
                  onChange={(e) => setNewExperience({ ...newExperience, skills: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Upload Certificate (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click or drag to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG up to 5MB</p>
                </div>
              </div>
              <Button
                onClick={handleAddExperience}
                className="w-full"
                disabled={!newExperience.title || !newExperience.organization}
              >
                Add Experience
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ type, label, icon: Icon, count }) => (
          <Card key={type} className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${typeColors[type as keyof typeof typeColors].split(" ")[0]}`}>
                  <Icon className={`h-5 w-5 ${typeColors[type as keyof typeof typeColors].split(" ")[1]}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search experiences..."
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
                {type}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Experiences List */}
      <div className="space-y-4">
        {filteredExperiences.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No experiences found</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {searchQuery || selectedType
                  ? "Try adjusting your filters"
                  : "Start adding your experiences to build your career portfolio"}
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Experience
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredExperiences.map((experience) => {
            const Icon = typeIcons[experience.type]
            return (
              <Card key={experience.id} className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 ${typeColors[experience.type].split(" ")[0]}`}>
                      <Icon className={`h-6 w-6 ${typeColors[experience.type].split(" ")[1]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{experience.title}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Building2 className="h-4 w-4" />
                            <span>{experience.organization}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={`${typeColors[experience.type]} capitalize shrink-0`}>
                          {experience.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4" />
                        {new Date(experience.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                        {experience.endDate
                          ? ` - ${new Date(experience.endDate).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}`
                          : " - Present"}
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">{experience.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      {experience.certificate && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <Button variant="outline" size="sm">
                            <Award className="h-4 w-4 mr-2" />
                            View Certificate
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
