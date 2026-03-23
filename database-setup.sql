-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  role TEXT DEFAULT 'student',
  university TEXT,
  major TEXT,
  graduation_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency TEXT NOT NULL CHECK (proficiency IN ('beginner', 'intermediate', 'advanced')),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create career_readiness_scores table
CREATE TABLE IF NOT EXISTS career_readiness_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  overall_score INTEGER DEFAULT 0 CHECK (overall_score >= 0 AND overall_score <= 100),
  skills_score INTEGER DEFAULT 0 CHECK (skills_score >= 0 AND skills_score <= 100),
  experience_score INTEGER DEFAULT 0 CHECK (experience_score >= 0 AND experience_score <= 100),
  profile_score INTEGER DEFAULT 0 CHECK (profile_score >= 0 AND profile_score <= 100),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coach_assignments table
CREATE TABLE IF NOT EXISTS coach_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  coach_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_readiness_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_assignments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own skills" ON skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own skills" ON skills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own skills" ON skills FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own skills" ON skills FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own scores" ON career_readiness_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own scores" ON career_readiness_scores FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Coaches can view assigned students" ON coach_assignments FOR SELECT USING (auth.uid() = coach_id);
CREATE POLICY "Admins can manage assignments" ON coach_assignments FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
