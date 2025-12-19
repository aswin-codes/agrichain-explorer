import { Product, ChainLog, ProductWithChain } from '@/types';

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    qrCode: 'AGR-2024-001',
    cropType: 'Organic Tomatoes',
    variety: 'Roma',
    quantity: 500,
    unit: 'kg',
    harvestDate: '2024-12-15',
    farmerId: 'farmer-001',
    farmerName: 'Rajesh Kumar',
    farmLocation: 'Punjab, India',
    initialPrice: 25,
    currentPrice: 45,
    status: 'at-retailer',
    createdAt: '2024-12-15T08:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
  },
  {
    id: 'prod-002',
    qrCode: 'AGR-2024-002',
    cropType: 'Basmati Rice',
    variety: 'Premium',
    quantity: 1000,
    unit: 'kg',
    harvestDate: '2024-12-10',
    farmerId: 'farmer-002',
    farmerName: 'Priya Sharma',
    farmLocation: 'Haryana, India',
    initialPrice: 80,
    currentPrice: 120,
    status: 'in-transit',
    createdAt: '2024-12-10T10:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
  },
  {
    id: 'prod-003',
    qrCode: 'AGR-2024-003',
    cropType: 'Alphonso Mangoes',
    variety: 'Ratnagiri',
    quantity: 200,
    unit: 'kg',
    harvestDate: '2024-12-18',
    farmerId: 'farmer-003',
    farmerName: 'Amit Patil',
    farmLocation: 'Maharashtra, India',
    initialPrice: 150,
    currentPrice: 150,
    status: 'at-farm',
    createdAt: '2024-12-18T06:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
  },
];

export const mockChainLogs: ChainLog[] = [
  // Product 1 chain
  {
    id: 'log-001',
    productId: 'prod-001',
    handlerId: 'farmer-001',
    handlerName: 'Rajesh Kumar',
    handlerRole: 'farmer',
    action: 'Harvested & Packaged',
    location: 'Green Valley Farm, Punjab',
    timestamp: '2024-12-15T08:00:00Z',
    price: 25,
    notes: 'Freshly harvested organic Roma tomatoes. Pesticide-free cultivation.',
    verified: true,
  },
  {
    id: 'log-002',
    productId: 'prod-001',
    handlerId: 'dist-001',
    handlerName: 'FreshMove Logistics',
    handlerRole: 'distributor',
    action: 'Picked up for transport',
    location: 'Punjab Hub Center',
    timestamp: '2024-12-16T06:30:00Z',
    price: 32,
    notes: 'Loaded in refrigerated truck. Temperature maintained at 4°C.',
    qualityCheck: { grade: 'A', notes: 'Fresh, no damage' },
    verified: true,
  },
  {
    id: 'log-003',
    productId: 'prod-001',
    handlerId: 'dist-001',
    handlerName: 'FreshMove Logistics',
    handlerRole: 'distributor',
    action: 'Delivered to retailer',
    location: 'Delhi Distribution Center',
    timestamp: '2024-12-17T14:00:00Z',
    price: 38,
    verified: true,
  },
  {
    id: 'log-004',
    productId: 'prod-001',
    handlerId: 'retail-001',
    handlerName: 'Nature Fresh Store',
    handlerRole: 'retailer',
    action: 'Received & Shelved',
    location: 'Nature Fresh, Connaught Place, Delhi',
    timestamp: '2024-12-17T16:00:00Z',
    price: 45,
    notes: 'Available for customers. Best before Dec 25.',
    qualityCheck: { grade: 'A', notes: 'Excellent condition' },
    verified: true,
  },
  // Product 2 chain
  {
    id: 'log-005',
    productId: 'prod-002',
    handlerId: 'farmer-002',
    handlerName: 'Priya Sharma',
    handlerRole: 'farmer',
    action: 'Harvested & Processed',
    location: 'Golden Fields, Haryana',
    timestamp: '2024-12-10T10:00:00Z',
    price: 80,
    notes: 'Premium Basmati rice, aged for 6 months.',
    verified: true,
  },
  {
    id: 'log-006',
    productId: 'prod-002',
    handlerId: 'dist-002',
    handlerName: 'AgriExpress',
    handlerRole: 'distributor',
    action: 'In transit',
    location: 'NH-44, en route to Mumbai',
    timestamp: '2024-12-18T08:00:00Z',
    price: 95,
    notes: 'Expected delivery in 2 days.',
    verified: true,
  },
  // Product 3 chain
  {
    id: 'log-007',
    productId: 'prod-003',
    handlerId: 'farmer-003',
    handlerName: 'Amit Patil',
    handlerRole: 'farmer',
    action: 'Harvested',
    location: 'Patil Orchards, Ratnagiri',
    timestamp: '2024-12-18T06:00:00Z',
    price: 150,
    notes: 'Premium Alphonso mangoes, naturally ripened.',
    verified: true,
  },
];

export const getProductWithChain = (productId: string): ProductWithChain | null => {
  const product = mockProducts.find(p => p.id === productId);
  if (!product) return null;
  
  const chainLogs = mockChainLogs
    .filter(log => log.productId === productId)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  
  return { ...product, chainLogs };
};

export const getProductByQR = (qrCode: string): ProductWithChain | null => {
  const product = mockProducts.find(p => p.qrCode === qrCode);
  if (!product) return null;
  return getProductWithChain(product.id);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(
    p =>
      p.cropType.toLowerCase().includes(lowerQuery) ||
      p.farmLocation.toLowerCase().includes(lowerQuery) ||
      p.farmerName.toLowerCase().includes(lowerQuery) ||
      p.qrCode.toLowerCase().includes(lowerQuery)
  );
};
