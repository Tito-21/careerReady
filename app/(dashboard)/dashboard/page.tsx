import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardClient } from "./dashboard-client"

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/login")
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  // Fetch skills
  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Fetch experiences
  const { data: experiences } = await supabase
    .from("experiences")
    .select("*")
    .eq("user_id", user.id)
    .order("start_date", { ascending: false })

  // Fetch career readiness score
  const { data: careerScore } = await supabase
    .from("career_readiness_scores")
    .select("*")
    .eq("user_id", user.id)
    .order("calculated_at", { ascending: false })
    .limit(1)
    .single()

  // Fetch opportunities
  const { data: opportunities } = await supabase
    .from("opportunities")
    .select("*")
    .eq("is_active", true)
    .order("deadline", { ascending: true })
    .limit(6)

  return (
    <DashboardClient
      profile={profile}
      skills={skills || []}
      experiences={experiences || []}
      careerScore={careerScore}
      opportunities={opportunities || []}
    />
  )
}
