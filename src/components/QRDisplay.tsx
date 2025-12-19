import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface QRDisplayProps {
  value: string;
  productName: string;
  size?: number;
}

const QRDisplay = ({ value, productName, size = 200 }: QRDisplayProps) => {
  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = size * 2;
      canvas.height = size * 2;
      ctx?.drawImage(img, 0, 0, size * 2, size * 2);
      
      const link = document.createElement('a');
      link.download = `${value}-qr.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast.success('QR Code downloaded successfully!');
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleShare = async () => {
    const traceUrl = `${window.location.origin}/trace/${value}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `AgriTrace - ${productName}`,
          text: `Track the journey of ${productName} from farm to your table`,
          url: traceUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard(traceUrl);
        }
      }
    } else {
      copyToClipboard(traceUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Trace link copied to clipboard!');
  };

  return (
    <Card variant="elevated" className="max-w-sm mx-auto">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg">Product QR Code</CardTitle>
        <p className="text-sm text-muted-foreground">{value}</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="p-4 bg-primary-foreground rounded-xl shadow-inner">
          <QRCodeSVG
            id="qr-code-svg"
            value={`${window.location.origin}/trace/${value}`}
            size={size}
            level="H"
            includeMargin
            fgColor="hsl(152, 55%, 35%)"
            bgColor="transparent"
          />
        </div>
        
        <p className="text-center text-sm text-muted-foreground">
          Scan this code to view the complete trace of{' '}
          <span className="font-medium text-foreground">{productName}</span>
        </p>

        <div className="flex gap-3 w-full">
          <Button variant="outline" className="flex-1" onClick={handleDownload}>
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button variant="default" className="flex-1" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRDisplay;
