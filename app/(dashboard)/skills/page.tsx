"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { mockSkills, type Skill } from "@/lib/mock-data"
import {
  Plus,
  Search,
  CheckCircle2,
  Circle,
  Code,
  Users,
  Briefcase,
  Filter,
  TrendingUp,
} from "lucide-react"

const levelColors = {
  beginner: "bg-chart-5/10 text-chart-5 border-chart-5/30",
  intermediate: "bg-chart-4/10 text-chart-4 border-chart-4/30",
  advanced: "bg-chart-1/10 text-chart-1 border-chart-1/30",
  expert: "bg-primary/10 text-primary border-primary/30",
}

const levelProgress = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 100,
}

const categoryIcons = {
  technical: Code,
  soft: Users,
  industry: Briefcase,
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(mockSkills)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "technical" as Skill["category"],
    level: "beginner" as Skill["level"],
  })

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || skill.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddSkill = () => {
    const skill: Skill = {
      id: String(skills.length + 1),
      ...newSkill,
      verified: false,
    }
    setSkills([...skills, skill])
    setNewSkill({ name: "", category: "technical", level: "beginner" })
    setIsAddDialogOpen(false)
  }

  const categories = ["technical", "soft", "industry"] as const
  const skillsByCategory = categories.map((cat) => ({
    category: cat,
    skills: filteredSkills.filter((s) => s.category === cat),
    count: skills.filter((s) => s.category === cat).length,
  }))

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Skills</h1>
          <p className="text-muted-foreground mt-1">Track and manage your professional skills.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
              <DialogDescription>Add a new skill to track your progress.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="skillName">Skill Name</Label>
                <Input
                  id="skillName"
                  placeholder="e.g., React.js"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewSkill({ ...newSkill, category: cat })}
                      className={`p-3 rounded-lg border text-sm font-medium capitalize transition-colors ${
                        newSkill.category === cat
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Proficiency Level</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(["beginner", "intermediate", "advanced", "expert"] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setNewSkill({ ...newSkill, level })}
                      className={`p-3 rounded-lg border text-sm font-medium capitalize transition-colors ${
                        newSkill.level === level
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={handleAddSkill} className="w-full" disabled={!newSkill.name}>
                Add Skill
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{skills.length}</p>
                <p className="text-sm text-muted-foreground">Total Skills</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold">{skills.filter((s) => s.verified).length}</p>
                <p className="text-sm text-muted-foreground">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Code className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">{skills.filter((s) => s.category === "technical").length}</p>
                <p className="text-sm text-muted-foreground">Technical</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">{skills.filter((s) => s.category === "soft").length}</p>
                <p className="text-sm text-muted-foreground">Soft Skills</p>
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
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            <Filter className="h-4 w-4 mr-2" />
            All
          </Button>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat]
            return (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="capitalize"
              >
                <Icon className="h-4 w-4 mr-2" />
                {cat}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Skills by Category */}
      <div className="space-y-6">
        {skillsByCategory.map(({ category, skills: categorySkills, count }) => {
          const Icon = categoryIcons[category]
          if (categorySkills.length === 0 && selectedCategory) return null
          return (
            <Card key={category} className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="capitalize">{category} Skills</CardTitle>
                    <CardDescription>{count} skills tracked</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {categorySkills.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-4 text-center">
                    No {category} skills found. Add your first one!
                  </p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            {skill.verified ? (
                              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                            )}
                            <div>
                              <p className="font-medium">{skill.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {skill.verified ? "Verified" : "Pending verification"}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className={`${levelColors[skill.level]} capitalize`}>
                            {skill.level}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Proficiency</span>
                            <span className="font-medium">{levelProgress[skill.level]}%</span>
                          </div>
                          <Progress value={levelProgress[skill.level]} className="h-1.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
