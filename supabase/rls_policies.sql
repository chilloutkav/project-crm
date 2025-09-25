-- Row Level Security (RLS) Policies for Supabase
-- Ensures users can only access their own data

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Profiles policies (users can manage their own profile)
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Companies policies
CREATE POLICY "Users can view own companies" ON public.companies
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own companies" ON public.companies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own companies" ON public.companies
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own companies" ON public.companies
  FOR DELETE USING (auth.uid() = user_id);

-- Contacts policies
CREATE POLICY "Users can view own contacts" ON public.contacts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own contacts" ON public.contacts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own contacts" ON public.contacts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own contacts" ON public.contacts
  FOR DELETE USING (auth.uid() = user_id);

-- Deals policies
CREATE POLICY "Users can view own deals" ON public.deals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own deals" ON public.deals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own deals" ON public.deals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own deals" ON public.deals
  FOR DELETE USING (auth.uid() = user_id);

-- Notes policies (users can access notes for their own deals)
CREATE POLICY "Users can view notes for own deals" ON public.notes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.deals
      WHERE deals.id = notes.deal_id
      AND deals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert notes for own deals" ON public.notes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.deals
      WHERE deals.id = notes.deal_id
      AND deals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update notes for own deals" ON public.notes
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.deals
      WHERE deals.id = notes.deal_id
      AND deals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete notes for own deals" ON public.notes
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.deals
      WHERE deals.id = notes.deal_id
      AND deals.user_id = auth.uid()
    )
  );