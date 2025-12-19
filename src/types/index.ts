export type UserRole = 'farmer' | 'distributor' | 'retailer' | 'consumer' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  phone?: string;
  email?: string;
  location?: string;
  verified: boolean;
}

export interface Product {
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

export interface ProductWithChain extends Product {
  chainLogs: ChainLog[];
}
