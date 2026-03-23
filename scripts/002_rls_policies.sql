-- Row Level Security Policies for CareerReady Platform
-- Run this after creating the schema

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coach_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_readiness_scores ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
-- Users can view all profiles (needed for coach/admin views)
CREATE POLICY "profiles_select_all" ON public.profiles 
  FOR SELECT USING (true);

-- Users can only update their own profile
CREATE POLICY "profiles_update_own" ON public.profiles 
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "profiles_insert_own" ON public.profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

-- SKILLS POLICIES
-- Users can view their own skills, coaches/admins can view all
CREATE POLICY "skills_select" ON public.skills 
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('coach', 'admin'))
  );

-- Users can insert their own skills
CREATE POLICY "skills_insert_own" ON public.skills 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own skills
CREATE POLICY "skills_update_own" ON public.skills 
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own skills
CREATE POLICY "skills_delete_own" ON public.skills 
  FOR DELETE USING (auth.uid() = user_id);

-- EXPERIENCES POLICIES
-- Users can view their own experiences, coaches/admins can view all
CREATE POLICY "experiences_select" ON public.experiences 
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('coach', 'admin'))
  );

-- Users can insert their own experiences
CREATE POLICY "experiences_insert_own" ON public.experiences 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own experiences
CREATE POLICY "experiences_update_own" ON public.experiences 
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own experiences
CREATE POLICY "experiences_delete_own" ON public.experiences 
  FOR DELETE USING (auth.uid() = user_id);

-- OPPORTUNITIES POLICIES
-- Everyone can view active opportunities
CREATE POLICY "opportunities_select_active" ON public.opportunities 
  FOR SELECT USING (is_active = true OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('coach', 'admin')));

-- Only coaches and admins can insert opportunities
CREATE POLICY "opportunities_insert_staff" ON public.opportunities 
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('coach', 'admin'))
  );

-- Only coaches and admins can update opportunities
CREATE POLICY "opportunities_update_staff" ON public.opportunities 
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('coach', 'admin'))
  );

-- APPLICATIONS POLICIES
-- Users can view their own applications, coaches/admins can view all
CREATE POLICY "applications_select" ON public.applications 
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('coach', 'admin'))
  );

-- Users can insert their own applications
CREATE POLICY "applications_insert_own" ON public.applications 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own applications, coaches/admins can update any
CREATE POLICY "applications_update" ON public.applications 
  FOR UPDATE USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('coach', 'admin'))
  );

-- COACH ASSIGNMENTS POLICIES
-- Coaches can view their assignments, admins can view all
CREATE POLICY "coach_assignments_select" ON public.coach_assignments 
  FOR SELECT USING (
    auth.uid() = coach_id OR 
    auth.uid() = student_id OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Only admins can insert coach assignments
CREATE POLICY "coach_assignments_insert_admin" ON public.coach_assignments 
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Only admins can delete coach assignments
CREATE POLICY "coach_assignments_delete_admin" ON public.coach_assignments 
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- FEEDBACK POLICIES
-- Students can view feedback about them, coaches can view their own feedback
CREATE POLICY "feedback_select" ON public.feedback 
  FOR SELECT USING (
    auth.uid() = student_id OR 
    auth.uid() = coach_id OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Coaches can insert feedback
CREATE POLICY "feedback_insert_coach" ON public.feedback 
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('coach', 'admin'))
  );

-- CAREER READINESS SCORES POLICIES
-- Users can view their own scores, coaches/admins can view all
CREATE POLICY "scores_select" ON public.career_readiness_scores 
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('coach', 'admin'))
  );

-- System can insert/update scores (using service role)
CREATE POLICY "scores_insert" ON public.career_readiness_scores 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "scores_update" ON public.career_readiness_scores 
  FOR UPDATE USING (auth.uid() = user_id);
