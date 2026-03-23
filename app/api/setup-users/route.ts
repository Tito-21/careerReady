import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// This endpoint creates the initial test users
// It uses the service role key to bypass RLS and create users directly
export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: 'Missing Supabase credentials' },
      { status: 500 }
    )
  }

  // Create admin client with service role key
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  const users = [
    {
      email: 't.sibo@alustudent.com',
      password: 'Bigstepper16961!',
      first_name: 'T',
      last_name: 'Sibo',
      role: 'student',
      university: 'African Leadership University',
      major: 'Software Engineering',
      graduation_year: 2025
    },
    {
      email: 'c.mugisha@alustaff.com',
      password: 'Mugisha@123',
      first_name: 'Mugisha',
      last_name: 'Chris',
      role: 'coach',
      university: 'African Leadership University'
    },
    {
      email: 'n.manzi@adminalu.com',
      password: 'NickM@123',
      first_name: 'Manzi',
      last_name: 'Nick',
      role: 'admin',
      university: 'African Leadership University'
    }
  ]

  const results = []

  for (const user of users) {
    try {
      // Create user in auth
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true, // Auto-confirm email for test users
        user_metadata: {
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          university: user.university
        }
      })

      if (authError) {
        // If user already exists, try to get their ID
        if (authError.message.includes('already been registered')) {
          results.push({ email: user.email, status: 'already exists' })
          continue
        }
        results.push({ email: user.email, status: 'error', error: authError.message })
        continue
      }

      if (authData.user) {
        // Update profile with additional data
        const { error: profileError } = await supabaseAdmin
          .from('profiles')
          .update({
            major: user.major || null,
            graduation_year: user.graduation_year || null
          })
          .eq('id', authData.user.id)

        if (profileError) {
          results.push({ 
            email: user.email, 
            status: 'created with profile error', 
            error: profileError.message 
          })
        } else {
          results.push({ email: user.email, status: 'created successfully' })
        }

        // If student, add default skills
        if (user.role === 'student') {
          const defaultSkills = [
            { name: 'Python', category: 'technical', proficiency: 'intermediate' },
            { name: 'JavaScript', category: 'technical', proficiency: 'intermediate' },
            { name: 'UI/UX Design', category: 'technical', proficiency: 'beginner' },
            { name: 'Data Analysis', category: 'technical', proficiency: 'beginner' }
          ]

          for (const skill of defaultSkills) {
            await supabaseAdmin.from('skills').insert({
              user_id: authData.user.id,
              name: skill.name,
              category: skill.category,
              proficiency: skill.proficiency,
              verified: false
            })
          }

          // Create initial career readiness score
          await supabaseAdmin.from('career_readiness_scores').insert({
            user_id: authData.user.id,
            overall_score: 45,
            skills_score: 50,
            experience_score: 30,
            profile_score: 55
          })
        }
      }
    } catch (err) {
      results.push({ 
        email: user.email, 
        status: 'error', 
        error: err instanceof Error ? err.message : 'Unknown error' 
      })
    }
  }

  // If coach was created, assign them to the student
  const studentResult = results.find(r => r.email === 't.sibo@alustudent.com')
  const coachResult = results.find(r => r.email === 'c.mugisha@alustaff.com')
  
  if (studentResult?.status === 'created successfully' && coachResult?.status === 'created successfully') {
    // Get user IDs
    const { data: studentData } = await supabaseAdmin.auth.admin.listUsers()
    const student = studentData?.users.find(u => u.email === 't.sibo@alustudent.com')
    const coach = studentData?.users.find(u => u.email === 'c.mugisha@alustaff.com')

    if (student && coach) {
      await supabaseAdmin.from('coach_assignments').insert({
        coach_id: coach.id,
        student_id: student.id,
        notes: 'Initial assignment for career guidance'
      })
    }
  }

  return NextResponse.json({ 
    message: 'User setup complete', 
    results 
  })
}
