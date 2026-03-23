"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface SetupResult {
  email: string
  status: string
  error?: string
}

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SetupResult[]>([])
  const [completed, setCompleted] = useState(false)

  const handleSetup = async () => {
    setLoading(true)
    setResults([])
    
    try {
      const response = await fetch("/api/setup-users", {
        method: "POST",
      })
      
      const data = await response.json()
      
      if (data.results) {
        setResults(data.results)
        setCompleted(true)
      }
    } catch (error) {
      console.error("Setup failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CareerReady</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Database Setup</CardTitle>
            <CardDescription>
              Initialize the database with test users and sample data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!completed ? (
              <>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <h3 className="font-medium mb-2">This will create:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        Student: T. Sibo (t.sibo@alustudent.com)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-chart-2" />
                        Coach: Mugisha Chris (c.mugisha@alustaff.com)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-chart-3" />
                        Admin: Manzi Nick (n.manzi@adminalu.com)
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm">
                      <strong>Note:</strong> This requires the SUPABASE_SERVICE_ROLE_KEY environment variable to be set.
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={handleSetup} 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    "Initialize Test Users"
                  )}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <h3 className="font-medium">Setup Results:</h3>
                  {results.map((result, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        result.status === "created successfully" || result.status === "already exists"
                          ? "bg-primary/10"
                          : "bg-destructive/10"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {result.status === "created successfully" || result.status === "already exists" ? (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                        <span className="text-sm font-medium">{result.email}</span>
                      </div>
                      <span className="text-xs text-muted-foreground capitalize">
                        {result.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-muted">
                    <h3 className="font-medium mb-2">Login Credentials:</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Student:</strong> t.sibo@alustudent.com / Bigstepper16961!
                      </li>
                      <li>
                        <strong>Coach:</strong> c.mugisha@alustaff.com / Mugisha@123
                      </li>
                      <li>
                        <strong>Admin:</strong> n.manzi@adminalu.com / NickM@123
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <Button asChild className="flex-1">
                      <Link href="/login">Go to Login</Link>
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <Link href="/">Back to Home</Link>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
