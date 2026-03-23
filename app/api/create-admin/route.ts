import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// This endpoint creates an admin user
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

  try {
    // Create admin user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@careerready.com',
      password: 'Admin@123',
      email_confirm: true,
      user_metadata: {
        first_name: 'Admin',
        last_name: 'User',
        role: 'admin',
        university: 'CareerReady'
      }
    })

    if (authError) {
      if (authError.message.includes('already been registered')) {
        return NextResponse.json({ 
          message: 'Admin user already exists',
          email: 'admin@careerready.com',
          password: 'Admin@123'
        })
      }
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (authData.user) {
      // Create profile record
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: authData.user.id,
          first_name: 'Admin',
          last_name: 'User',
          role: 'admin',
          university: 'CareerReady'
        })

      if (profileError) {
        return NextResponse.json(
          { error: `User created but profile failed: ${profileError.message}` },
          { status: 400 }
        )
      }

      return NextResponse.json({ 
        message: 'Admin user created successfully',
        email: 'admin@careerready.com',
        password: 'Admin@123',
        user_id: authData.user.id
      })
    }

  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
