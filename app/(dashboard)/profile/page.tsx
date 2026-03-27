"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to mock profile page
    router.replace("/profile-mock")
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="text-muted-foreground">Redirecting to profile...</p>
      </div>
    </div>
  )
}
