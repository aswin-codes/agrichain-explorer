import { supabase } from '@/integrations/supabase/client';
import { Product, TimelineEntry } from '@/types';
import { Json } from '@/integrations/supabase/types';

// Generate unique product ID
export const generateProductId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AGR-${timestamp}-${random}`;
};

// Convert TimelineEntry to JSON-compatible format
const toJsonTimeline = (timeline: TimelineEntry[]): Json => {
  return timeline as unknown as Json;
};

// Create a new product (Farmer stage)
export const createProduct = async (data: {
  crop: string;
  quantity: number;
  price: number;
  location: string;
  harvestDate: string;
  notes?: string;
  photo?: string;
}): Promise<Product | null> => {
  const productId = generateProductId();
  
  const timelineEntry: TimelineEntry = {
    stage: 1,
    stageName: 'Farmer',
    price: data.price,
    date: data.harvestDate,
    location: data.location,
    notes: data.notes,
    photo: data.photo,
    handlerName: 'Farmer'
  };

  const { data: product, error } = await supabase
    .from('products')
    .insert({
      id: productId,
      crop: data.crop,
      quantity: data.quantity,
      current_stage: 1,
      timeline: toJsonTimeline([timelineEntry]),
      photos: data.photo ? [data.photo] : []
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    return null;
  }

  return product as unknown as Product;
};

// Update product with new stage info
export const updateProductStage = async (
  productId: string,
  stageData: {
    stage: number;
    stageName: string;
    price: number;
    date: string;
    location: string;
    notes?: string;
    photo?: string;
    handlerName?: string;
    quality?: string;
    expiryDate?: string;
  }
): Promise<Product | null> => {
  // First get the current product
  const { data: currentProduct, error: fetchError } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .maybeSingle();

  if (fetchError || !currentProduct) {
    console.error('Error fetching product:', fetchError);
    return null;
  }

  const newTimelineEntry: TimelineEntry = stageData;
  const existingTimeline = (currentProduct.timeline as unknown as TimelineEntry[]) || [];
  const updatedTimeline = [...existingTimeline, newTimelineEntry];
  const existingPhotos = currentProduct.photos || [];
  const updatedPhotos = stageData.photo ? [...existingPhotos, stageData.photo] : existingPhotos;

  const { data: product, error } = await supabase
    .from('products')
    .update({
      current_stage: stageData.stage,
      timeline: toJsonTimeline(updatedTimeline),
      photos: updatedPhotos
    })
    .eq('id', productId)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    return null;
  }

  return product as unknown as Product;
};

// Get product by ID
export const getProductById = async (productId: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data as unknown as Product;
};

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return (data || []) as unknown as Product[];
};

// Search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('crop', `%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching products:', error);
    return [];
  }

  return (data || []) as unknown as Product[];
};
