-- Create products table for AgriTrace
CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  crop TEXT NOT NULL,
  quantity DECIMAL NOT NULL,
  current_stage INTEGER NOT NULL DEFAULT 1,
  timeline JSONB NOT NULL DEFAULT '[]'::jsonb,
  photos TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public access for demo purposes
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can read products"
ON public.products
FOR SELECT
USING (true);

-- Public insert access (for demo)
CREATE POLICY "Anyone can insert products"
ON public.products
FOR INSERT
WITH CHECK (true);

-- Public update access (for demo)
CREATE POLICY "Anyone can update products"
ON public.products
FOR UPDATE
USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();