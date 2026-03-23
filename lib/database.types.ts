export type UserRole = 'student' | 'coach' | 'admin'
export type SkillCategory = 'technical' | 'soft' | 'industry'
export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'
export type ExperienceType = 'internship' | 'project' | 'certification' | 'extracurricular'
export type OpportunityType = 'job' | 'internship' | 'entrepreneurship'
export type ApplicationStatus = 'pending' | 'reviewed' | 'interview' | 'accepted' | 'rejected'

export interface Profile {
  id: string
  first_name: string | null
  last_name: string | null
  role: UserRole
  university: string | null
  major: string | null
  graduation_year: number | null
  phone: string | null
  linkedin_url: string | null
  github_url: string | null
  portfolio_url: string | null
  bio: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  user_id: string
  name: string
  category: SkillCategory
  proficiency: ProficiencyLevel
  verified: boolean
  verified_by: string | null
  created_at: string
}

export interface Experience {
  id: string
  user_id: string
  type: ExperienceType
  title: string
  organization: string | null
  description: string | null
  start_date: string | null
  end_date: string | null
  is_current: boolean
  location: string | null
  certificate_url: string | null
  created_at: string
}

export interface Opportunity {
  id: string
  title: string
  company: string
  type: OpportunityType
  location: string | null
  is_remote: boolean
  description: string | null
  requirements: string | null
  salary_range: string | null
  application_url: string | null
  deadline: string | null
  posted_by: string | null
  is_active: boolean
  created_at: string
}

export interface Application {
  id: string
  user_id: string
  opportunity_id: string
  status: ApplicationStatus
  cover_letter: string | null
  resume_url: string | null
  applied_at: string
  updated_at: string
  opportunity?: Opportunity
}

export interface CoachAssignment {
  id: string
  coach_id: string
  student_id: string
  assigned_at: string
  notes: string | null
  student?: Profile
  coach?: Profile
}

export interface Feedback {
  id: string
  coach_id: string
  student_id: string
  content: string
  created_at: string
  coach?: Profile
}

export interface CareerReadinessScore {
  id: string
  user_id: string
  overall_score: number
  skills_score: number
  experience_score: number
  profile_score: number
  calculated_at: string
}

export interface SkillCatalog {
  id: string
  name: string
  category: SkillCategory
  description: string | null
  created_at: string
}
