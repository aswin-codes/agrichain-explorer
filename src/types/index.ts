export interface TimelineEntry {
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
  [key: string]: string | number | undefined; // Index signature for JSON compatibility
}

export interface Product {
  id: string;
  crop: string;
  quantity: number;
  current_stage: number;
  timeline: TimelineEntry[];
  photos: string[];
  created_at: string;
  updated_at: string;
}

// Legacy types for old components (kept for compatibility)
export type UserRole = 'farmer' | 'distributor' | 'retailer' | 'consumer' | 'admin';

export interface ChainLog {
  id: string;
  productId: string;
  handlerId: string;
  handlerName: string;
  handlerRole: UserRole;
  action: string;
  location: string;
  timestamp: string;
  price?: number;
  notes?: string;
  photoUrl?: string;
  qualityCheck?: {
    grade: 'A' | 'B' | 'C';
    notes: string;
  };
  verified: boolean;
}

export interface LegacyProduct {
  id: string;
  qrCode: string;
  cropType: string;
  variety?: string;
  quantity: number;
  unit: string;
  harvestDate: string;
  farmerId: string;
  farmerName: string;
  farmLocation: string;
  initialPrice: number;
  currentPrice: number;
  status: 'at-farm' | 'in-transit' | 'at-distributor' | 'at-retailer' | 'sold';
  createdAt: string;
  imageUrl?: string;
}

export interface ProductWithChain extends LegacyProduct {
  chainLogs: ChainLog[];
}

export const STAGE_NAMES: Record<number, string> = {
  1: 'Farmer',
  2: 'Middleman',
  3: 'Retailer',
  4: 'Ready for Sale'
};

export const STAGE_ICONS = {
  1: 'Tractor',
  2: 'Truck',
  3: 'Store',
  4: 'ScanLine'
} as const;
