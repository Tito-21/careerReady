"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Camera, Mail, User, GraduationCap, MapPin, Calendar, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MockProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Tito",
    email: "tito@alu.edu",
    bio: "Passionate software engineering student with a focus on building impactful technology solutions for Africa.",
    university: "African Leadership University",
    program: "Software Engineering",
    year: "Year 3",
    location: "Kigali, Rwanda",
    linkedin: "linkedin.com/in/tito",
    github: "github.com/tito",
    interests: ["Web Development", "Machine Learning", "FinTech", "EdTech"],
  })

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        
        // Update profile data based on logged-in user
        if (parsedUser.name === "Tito") {
          setProfileData(prev => ({
            ...prev,
            name: "Tito",
            email: "tito@alu.edu"
          }))
        } else if (parsedUser.name === "Mugisha Chris") {
          setProfileData(prev => ({
            ...prev,
            name: "Mugisha Chris",
            email: "mugisha.chris@alu.edu",
            program: "Career Services",
            year: "Staff"
          }))
        } else if (parsedUser.name === "Admin User") {
          setProfileData(prev => ({
            ...prev,
            name: "Admin User",
            email: "admin@alu.edu",
            program: "Administration",
            year: "Staff"
          }))
        }
      } catch (error) {
        router.push('/login-mock')
      }
    } else {
      router.push('/login-mock')
    }
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    setIsEditing(false)
    // In a real app, this would save to the backend
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard-mock">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <span className="text-xl font-bold text-foreground">Profile</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                localStorage.removeItem('user')
                router.push('/login-mock')
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8 max-w-4xl">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your personal information and career profile.</p>
          </div>

          {/* Profile Header Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {profileData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">{profileData.name}</h2>
                        <Badge variant="outline" className="capitalize">
                          {user.role}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{profileData.program} {profileData.year === "Staff" ? "" : "Student"}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          {profileData.university}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {profileData.location}
                        </span>
                      </div>
                    </div>
                    <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
                      {isEditing ? (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      ) : (
                        "Edit Profile"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Academic Year</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="year"
                      value={profileData.year}
                      onChange={(e) => setProfileData({ ...profileData, year: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>Your academic background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    value={profileData.university}
                    onChange={(e) => setProfileData({ ...profileData, university: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="program">Program</Label>
                  <Input
                    id="program"
                    value={profileData.program}
                    onChange={(e) => setProfileData({ ...profileData, program: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Connect your professional profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={profileData.linkedin}
                    onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                    disabled={!isEditing}
                    placeholder="linkedin.com/in/username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={profileData.github}
                    onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                    disabled={!isEditing}
                    placeholder="github.com/username"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career Interests */}
          <Card>
            <CardHeader>
              <CardTitle>Career Interests</CardTitle>
              <CardDescription>Areas you are interested in pursuing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest: string, index: number) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {interest}
                  </Badge>
                ))}
                {isEditing && (
                  <Button variant="outline" size="sm">
                    + Add Interest
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
