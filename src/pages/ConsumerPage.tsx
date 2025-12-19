import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import StageNavbar from '@/components/StageNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ScanLine, Loader2, Package } from 'lucide-react';
import { getProductById } from '@/lib/supabase-helpers';
import { Product, STAGE_NAMES } from '@/types';
import QRScanner from '@/components/QRScanner';
import ProductTimeline from '@/components/ProductTimeline';
import PriceChart from '@/components/PriceChart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QRCodeSVG } from 'qrcode.react';

const ConsumerPage = () => {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for product ID in URL
  useEffect(() => {
    const productId = searchParams.get('id');
    if (productId) {
      handleScan(productId);
    }
  }, [searchParams]);

  const handleScan = async (productId: string) => {
    setIsLoading(true);
    const foundProduct = await getProductById(productId);
    setIsLoading(false);
    
    if (foundProduct) {
      setProduct(foundProduct);
      toast.success('Product found! Viewing full trace.');
    } else {
      toast.error('Product not found');
    }
  };

  const getShareUrl = () => {
    return `${window.location.origin}/consumer?id=${product?.id}`;
  };

  const handleShare = async () => {
    if (!product) return;
    
    const shareUrl = getShareUrl();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `AgriTrace: ${product.crop}`,
          text: `Check out the journey of this ${product.crop}!`,
          url: shareUrl
        });
      } catch (err) {
        // User cancelled or error
        navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StageNavbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-leaf/20 flex items-center justify-center mx-auto mb-4">
            <ScanLine className="w-8 h-8 text-leaf" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Consumer Trace
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Scan any product QR to see its complete journey from farm to store
          </p>
        </div>

        {!product ? (
          <QRScanner
            onScan={handleScan}
            isLoading={isLoading}
            title="Trace Product Journey"
            description="Enter the product ID to see its complete history"
          />
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Product Header */}
            <Card className="overflow-hidden">
              <div className="hero-gradient p-6 text-primary-foreground">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-1">
                      {product.crop}
                    </h2>
                    <p className="opacity-90">{product.quantity} kg • ID: {product.id}</p>
                  </div>
                  <Badge 
                    variant={product.current_stage === 4 ? 'default' : 'secondary'}
                    className="text-sm px-3 py-1"
                  >
                    {STAGE_NAMES[product.current_stage]}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* QR Code */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-background rounded-xl border">
                      <QRCodeSVG value={product.id} size={120} level="H" />
                    </div>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      Share Product
                    </Button>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Farm Price</p>
                      <p className="font-display text-xl font-bold text-primary">
                        ₹{product.timeline?.[0]?.price || 0}/kg
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Current Price</p>
                      <p className="font-display text-xl font-bold text-secondary">
                        ₹{product.timeline?.[product.timeline.length - 1]?.price || 0}/kg
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Origin</p>
                      <p className="font-semibold text-foreground line-clamp-1">
                        {product.timeline?.[0]?.location || 'Unknown'}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Harvest Date</p>
                      <p className="font-semibold text-foreground">
                        {product.timeline?.[0]?.date ? 
                          new Date(product.timeline[0].date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          }) : 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Chart */}
            <PriceChart product={product} />

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Complete Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProductTimeline product={product} />
              </CardContent>
            </Card>

            {/* Scan another */}
            <div className="text-center">
              <Button variant="outline" onClick={() => setProduct(null)}>
                Scan Another Product
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ConsumerPage;
