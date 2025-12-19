import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QrCode, Search, ArrowRight, Camera } from 'lucide-react';
import { toast } from 'sonner';

interface QRScannerProps {
  onScan: (productId: string) => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

const QRScanner = ({ onScan, title, description, isLoading }: QRScannerProps) => {
  const [productId, setProductId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productId.trim()) {
      toast.error('Please enter a product ID');
      return;
    }

    onScan(productId.trim().toUpperCase());
  };

  const handleCameraClick = () => {
    toast.info('Camera scanning coming soon! For now, enter the code manually.');
  };

  return (
    <Card variant="glass" className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <QrCode className="w-8 h-8 text-primary" />
        </div>
        <CardTitle>{title || 'Scan Product'}</CardTitle>
        <CardDescription>
          {description || 'Enter the product ID to continue'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Enter product ID (e.g., AGR-...)"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="pl-10 h-12 text-base uppercase"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleCameraClick}
            >
              <Camera className="w-4 h-4" />
              Scan QR
            </Button>
            <Button
              type="submit"
              variant="default"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                'Loading...'
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default QRScanner;
