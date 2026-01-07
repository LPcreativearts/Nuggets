-- Create the nuggets_progress table to store user game data
CREATE TABLE IF NOT EXISTS public.nuggets_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  collection jsonb DEFAULT '[]'::jsonb,
  word_collection jsonb DEFAULT '[]'::jsonb,
  star_dust integer DEFAULT 0,
  crumbs integer DEFAULT 0,
  inventory jsonb DEFAULT '[]'::jsonb,
  equipped jsonb DEFAULT '{"space": null, "sky": null}'::jsonb,
  dark_mode boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.nuggets_progress ENABLE ROW LEVEL SECURITY;

-- Create policies to allow users to only access their own data
CREATE POLICY "Users can view their own progress" 
  ON public.nuggets_progress 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" 
  ON public.nuggets_progress 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
  ON public.nuggets_progress 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create an index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS nuggets_progress_user_id_idx ON public.nuggets_progress(user_id);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to call the function
CREATE TRIGGER update_nuggets_progress_updated_at 
  BEFORE UPDATE ON public.nuggets_progress 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
