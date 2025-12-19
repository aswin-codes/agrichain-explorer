import { useState } from 'react';
import StageNavbar from '@/components/StageNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Store, Loader2, CheckCircle, Package } from 'lucide-react';
import { getProductById, updateProductStage } from '@/lib/supabase-helpers';
import { Product, STAGE_NAMES } from '@/types';
import QRScanner from '@/components/QRScanner';
import ProductTimeline from '@/components/ProductTimeline';
import { Badge } from '@/components/ui/badge';

const RetailerPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [formData, setFormData] = useState({
    price: '',
    location: '',
    stockDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    notes: '',
    quality: '',
    photo: ''
  });

  const handleScan = async (productId: string) => {
    setIsLoading(true);
    const foundProduct = await getProductById(productId);
    setIsLoading(false);
    
    if (foundProduct) {
      if (foundProduct.current_stage < 2) {
        toast.error('This product needs to go through middleman first');
        return;
      }
      if (foundProduct.current_stage >= 3) {
        toast.error(`This product is already at ${STAGE_NAMES[foundProduct.current_stage]} stage`);
        return;
      }
      setProduct(foundProduct);
      const lastEntry = foundProduct.timeline?.[foundProduct.timeline.length - 1];
      if (lastEntry) {
        setFormData(prev => ({ ...prev, price: String(lastEntry.price + 10) }));
      }
      toast.success('Product loaded successfully!');
    } else {
      toast.error('Product not found');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product) return;
    
    if (!formData.price || !formData.location) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsUpdating(true);
    const updatedProduct = await updateProductStage(product.id, {
      stage: 3,
      stageName: 'Retailer',
      price: parseFloat(formData.price),
      date: formData.stockDate,
      location: formData.location,
      notes: formData.notes,
      quality: formData.quality,
      photo: formData.photo,
      expiryDate: formData.expiryDate,
      handlerName: 'Retailer'
    });
    setIsUpdating(false);

    if (updatedProduct) {
      toast.success('Product ready for sale! Consumers can now trace it.');
      setProduct(updatedProduct);
    } else {
      toast.error('Failed to update product');
    }
  };

  const handleMarkReady = async () => {
    if (!product) return;

    setIsUpdating(true);
    const updatedProduct = await updateProductStage(product.id, {
      stage: 4,
      stageName: 'Ready for Sale',
      price: product.timeline?.[product.timeline.length - 1]?.price || 0,
      date: new Date().toISOString(),
      location: product.timeline?.[product.timeline.length - 1]?.location || '',
      notes: 'Product is now available for consumers',
      handlerName: 'Retailer'
    });
    setIsUpdating(false);

    if (updatedProduct) {
      toast.success('Product marked as ready for sale!');
      setProduct(updatedProduct);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StageNavbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-harvest-gold/20 flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-harvest-gold" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Retailer Buy
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Receive products from middleman and prepare for consumer sale
          </p>
        </div>

        {!product ? (
          <QRScanner
            onScan={handleScan}
            isLoading={isLoading}
            title="Scan Product to Receive"
            description="Enter the middleman's product ID to proceed"
          />
        ) : (
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Product Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display">{product.crop}</CardTitle>
                  <Badge variant="secondary">{product.quantity} kg</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ProductTimeline product={product} />
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => setProduct(null)}
                >
                  Scan Different Product
                </Button>
              </CardContent>
            </Card>

            {/* Update Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Store className="w-5 h-5 text-harvest-gold" />
                  Add Retail Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {product.current_stage >= 3 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-foreground font-semibold mb-2">
                      {product.current_stage === 4 ? 'Product is ready for sale!' : 'Retailer details added'}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">Current stage: {STAGE_NAMES[product.current_stage]}</p>
                    
                    {product.current_stage === 3 && (
                      <Button onClick={handleMarkReady} disabled={isUpdating} className="gap-2">
                        {isUpdating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        Mark Ready for Sale
                      </Button>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Retail Price (₹/kg) *</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="e.g., 45"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stockDate">Stock Date *</Label>
                        <Input
                          id="stockDate"
                          type="date"
                          value={formData.stockDate}
                          onChange={(e) => setFormData({ ...formData, stockDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Store Location *</Label>
                        <Input
                          id="location"
                          placeholder="e.g., Fresh Mart, Delhi"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          type="date"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quality">Final Quality Check</Label>
                      <Input
                        id="quality"
                        placeholder="e.g., Grade A, Premium"
                        value={formData.quality}
                        onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="photo">Photo URL (optional)</Label>
                      <Input
                        id="photo"
                        placeholder="https://..."
                        value={formData.photo}
                        onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Shelf location, display info..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Add to Inventory
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default RetailerPage;
