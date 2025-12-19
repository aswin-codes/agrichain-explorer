import { useState } from 'react';
import StageNavbar from '@/components/StageNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';
import { Tractor, Download, Package, Loader2 } from 'lucide-react';
import { createProduct, getAllProducts } from '@/lib/supabase-helpers';
import { Product } from '@/types';
import ProductList from '@/components/ProductList';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const FarmerPage = () => {
  const queryClient = useQueryClient();
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    crop: '',
    quantity: '',
    price: '',
    location: '',
    harvestDate: new Date().toISOString().split('T')[0],
    notes: '',
    photo: ''
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (product) => {
      if (product) {
        setGeneratedId(product.id);
        toast.success('Product created! QR code generated.');
        setFormData({
          crop: '',
          quantity: '',
          price: '',
          location: '',
          harvestDate: new Date().toISOString().split('T')[0],
          notes: '',
          photo: ''
        });
        queryClient.invalidateQueries({ queryKey: ['products'] });
      }
    },
    onError: () => {
      toast.error('Failed to create product');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.crop || !formData.quantity || !formData.price || !formData.location) {
      toast.error('Please fill all required fields');
      return;
    }

    createMutation.mutate({
      crop: formData.crop,
      quantity: parseFloat(formData.quantity),
      price: parseFloat(formData.price),
      location: formData.location,
      harvestDate: formData.harvestDate,
      notes: formData.notes,
      photo: formData.photo
    });
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('qr-code');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `agritrace-${generatedId}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StageNavbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Tractor className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Farmer Upload
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Register your produce and generate a unique QR code for tracking
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display">Add New Produce</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="crop">Crop Name *</Label>
                    <Input
                      id="crop"
                      placeholder="e.g., Organic Tomatoes"
                      value={formData.crop}
                      onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (kg) *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="e.g., 500"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹/kg) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="e.g., 25"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="harvestDate">Harvest Date *</Label>
                    <Input
                      id="harvestDate"
                      type="date"
                      value={formData.harvestDate}
                      onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Farm Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Green Valley Farm, Punjab"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional details..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Package className="w-4 h-4" />
                      Generate QR Code
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* QR Code Display */}
          <Card className={generatedId ? '' : 'opacity-50'}>
            <CardHeader>
              <CardTitle className="font-display">Generated QR Code</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              {generatedId ? (
                <>
                  <div className="p-6 bg-background rounded-2xl border shadow-lg mb-6">
                    <QRCodeSVG
                      id="qr-code"
                      value={generatedId}
                      size={200}
                      level="H"
                      includeMargin
                    />
                  </div>
                  <p className="font-mono text-lg font-semibold text-foreground mb-4">
                    {generatedId}
                  </p>
                  <Button onClick={handleDownloadQR} variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download QR
                  </Button>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Fill the form to generate a QR code
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Products List */}
        <div className="mt-12 max-w-5xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Your Products
          </h2>
          {productsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <ProductList products={products} showQR />
          )}
        </div>
      </main>
    </div>
  );
};

export default FarmerPage;
