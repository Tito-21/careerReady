export interface Skill {
  id: string
  name: string
  category: "technical" | "soft" | "industry"
  level: "beginner" | "intermediate" | "advanced" | "expert"
  verified: boolean
}

export interface Experience {
  id: string
  type: "internship" | "project" | "certification" | "extracurricular"
  title: string
  organization: string
  startDate: string
  endDate?: string
  description: string
  skills: string[]
  certificate?: string
}

export interface Opportunity {
  id: string
  type: "job" | "internship" | "entrepreneurship"
  title: string
  company: string
  location: string
  description: string
  requirements: string[]
  deadline: string
  postedDate: string
}

export const mockSkills: Skill[] = [
  { id: "1", name: "JavaScript", category: "technical", level: "advanced", verified: true },
  { id: "2", name: "Python", category: "technical", level: "intermediate", verified: true },
  { id: "3", name: "React.js", category: "technical", level: "advanced", verified: false },
  { id: "4", name: "Communication", category: "soft", level: "advanced", verified: true },
  { id: "5", name: "Leadership", category: "soft", level: "intermediate", verified: false },
  { id: "6", name: "Project Management", category: "industry", level: "beginner", verified: false },
  { id: "7", name: "Data Analysis", category: "technical", level: "intermediate", verified: true },
  { id: "8", name: "UI/UX Design", category: "technical", level: "beginner", verified: false },
]

export const mockExperiences: Experience[] = [
  {
    id: "1",
    type: "internship",
    title: "Software Engineering Intern",
    organization: "Tech Africa Ltd",
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    description: "Developed web applications using React and Node.js. Collaborated with a team of 5 developers.",
    skills: ["JavaScript", "React.js", "Node.js"],
  },
  {
    id: "2",
    type: "project",
    title: "E-Commerce Platform",
    organization: "ALU Capstone Project",
    startDate: "2025-01-15",
    endDate: "2025-04-30",
    description: "Built a full-stack e-commerce platform for local artisans in Rwanda.",
    skills: ["Python", "Django", "PostgreSQL"],
  },
  {
    id: "3",
    type: "certification",
    title: "AWS Cloud Practitioner",
    organization: "Amazon Web Services",
    startDate: "2025-03-10",
    description: "Completed AWS Cloud Practitioner certification exam.",
    skills: ["Cloud Computing", "AWS"],
    certificate: "AWS-CCP-2025-12345",
  },
  {
    id: "4",
    type: "extracurricular",
    title: "Tech Club President",
    organization: "ALU Tech Society",
    startDate: "2024-09-01",
    description: "Led a team of 20 members organizing hackathons and tech workshops.",
    skills: ["Leadership", "Event Planning", "Communication"],
  },
]

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    type: "internship",
    title: "Data Science Intern",
    company: "Andela",
    location: "Remote - Africa",
    description: "Join our data science team to work on machine learning projects that impact millions of users across Africa.",
    requirements: ["Python", "Machine Learning", "SQL", "Strong analytical skills"],
    deadline: "2026-04-15",
    postedDate: "2026-03-01",
  },
  {
    id: "2",
    type: "job",
    title: "Junior Software Developer",
    company: "Flutterwave",
    location: "Lagos, Nigeria",
    description: "Build and maintain payment solutions serving businesses across Africa.",
    requirements: ["JavaScript", "Node.js", "React", "2+ years experience"],
    deadline: "2026-04-30",
    postedDate: "2026-03-05",
  },
  {
    id: "3",
    type: "entrepreneurship",
    title: "Tony Elumelu Foundation Grant",
    company: "Tony Elumelu Foundation",
    location: "Pan-African",
    description: "Seed funding and mentorship program for African entrepreneurs with innovative business ideas.",
    requirements: ["Business plan", "African citizenship", "Innovative idea"],
    deadline: "2026-05-31",
    postedDate: "2026-02-15",
  },
  {
    id: "4",
    type: "internship",
    title: "Product Management Intern",
    company: "Safaricom",
    location: "Nairobi, Kenya",
    description: "Work with product teams on M-PESA and other digital products.",
    requirements: ["Communication skills", "Analytical thinking", "Business acumen"],
    deadline: "2026-04-20",
    postedDate: "2026-03-10",
  },
  {
    id: "5",
    type: "job",
    title: "UX Designer",
    company: "Jumia",
    location: "Cairo, Egypt",
    description: "Design user experiences for Africa's leading e-commerce platform.",
    requirements: ["Figma", "User Research", "Prototyping", "Portfolio required"],
    deadline: "2026-04-25",
    postedDate: "2026-03-08",
  },
]

export const careerReadinessMetrics = {
  overallScore: 72,
  skillsScore: 78,
  experienceScore: 65,
  networkScore: 70,
  certificationsScore: 80,
}

export const mockStudents = [
  {
    id: "1",
    name: "Tito",
    email: "tito@alu.edu",
    program: "Software Engineering",
    year: 3,
    readinessScore: 72,
    skills: 8,
    experiences: 4,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@alu.edu",
    program: "Business Administration",
    year: 2,
    readinessScore: 65,
    skills: 6,
    experiences: 3,
  },
  {
    id: "3",
    name: "Michael Okonkwo",
    email: "michael.o@alu.edu",
    program: "Data Science",
    year: 4,
    readinessScore: 85,
    skills: 12,
    experiences: 6,
  },
  {
    id: "4",
    name: "Fatima Hassan",
    email: "fatima.h@alu.edu",
    program: "Computer Science",
    year: 3,
    readinessScore: 78,
    skills: 10,
    experiences: 5,
  },
]
