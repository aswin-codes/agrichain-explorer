import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QrCode, Search, ArrowRight, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getProductByQR } from '@/data/mockData';

const ScannerInput = () => {
  const [qrCode, setQrCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!qrCode.trim()) {
      toast.error('Please enter a QR code or product ID');
      return;
    }

    setIsSearching(true);
    
    // Simulate lookup
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const product = getProductByQR(qrCode.trim().toUpperCase());
    
    if (product) {
      navigate(`/trace/${product.qrCode}`);
    } else {
      toast.error('Product not found. Please check the code and try again.');
    }
    
    setIsSearching(false);
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
        <CardTitle>Scan or Enter Product Code</CardTitle>
        <CardDescription>
          Enter the QR code from the product label to see its complete journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Enter code (e.g., AGR-2024-001)"
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
              className="pl-10 h-12 text-base"
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
              disabled={isSearching}
            >
              {isSearching ? (
                'Searching...'
              ) : (
                <>
                  Trace
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            Try these sample codes:{' '}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => setQrCode('AGR-2024-001')}
            >
              AGR-2024-001
            </button>
            {', '}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => setQrCode('AGR-2024-002')}
            >
              AGR-2024-002
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScannerInput;
