-- Auto-create profile when a new user signs up
-- This trigger runs with security definer privileges

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email,
    first_name, 
    last_name,
    role,
    university,
    major,
    graduation_year
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'student'),
    COALESCE(NEW.raw_user_meta_data ->> 'university', NULL),
    COALESCE(NEW.raw_user_meta_data ->> 'major', NULL),
    CASE 
      WHEN NEW.raw_user_meta_data ->> 'graduation_year' IS NOT NULL 
      THEN (NEW.raw_user_meta_data ->> 'graduation_year')::INTEGER 
      ELSE NULL 
    END
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
