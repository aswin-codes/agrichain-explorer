import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Timeline from '@/components/Timeline';
import QRDisplay from '@/components/QRDisplay';
import { getProductByQR } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Package, IndianRupee, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const statusColors: Record<string, string> = {
  'at-farm': 'bg-farm-green/10 text-farm-green border-farm-green/20',
  'in-transit': 'bg-sky-blue/10 text-sky-blue border-sky-blue/20',
  'at-distributor': 'bg-harvest-gold/10 text-harvest-gold border-harvest-gold/20',
  'at-retailer': 'bg-primary/10 text-primary border-primary/20',
  'sold': 'bg-muted text-muted-foreground border-border',
};

const statusLabels: Record<string, string> = {
  'at-farm': 'At Farm',
  'in-transit': 'In Transit',
  'at-distributor': 'At Distributor',
  'at-retailer': 'At Retailer',
  'sold': 'Sold',
};

const TracePage = () => {
  const { qrCode } = useParams<{ qrCode: string }>();
  const product = qrCode ? getProductByQR(qrCode) : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🔍</span>
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground mb-4">
                Product Not Found
              </h1>
              <p className="text-muted-foreground mb-8">
                We couldn't find a product with code "{qrCode}". Please check the code and try again.
              </p>
              <Button asChild>
                <Link to="/scan">
                  <ArrowLeft className="w-4 h-4" />
                  Try Another Code
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const priceChange = product.currentPrice - product.initialPrice;
  const priceChangePercent = ((priceChange / product.initialPrice) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/scan">
              <ArrowLeft className="w-4 h-4" />
              Back to Scanner
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left column - Product info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Product Card */}
              <Card variant="elevated" className="overflow-hidden">
                {product.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.cropType}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div>
                      <h1 className="font-display text-2xl font-bold text-foreground">
                        {product.cropType}
                      </h1>
                      {product.variety && (
                        <p className="text-muted-foreground">{product.variety}</p>
                      )}
                    </div>
                    <Badge className={`border ${statusColors[product.status]}`}>
                      {statusLabels[product.status]}
                    </Badge>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <User className="w-4 h-4 text-farm-green" />
                      <span>{product.farmerName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-farm-green" />
                      <span>{product.farmLocation}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-harvest-gold" />
                      <span>Harvested {format(new Date(product.harvestDate), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Package className="w-4 h-4 text-primary" />
                      <span>{product.quantity} {product.unit}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Price Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 text-center p-3 rounded-lg bg-farm-green/10">
                      <p className="text-xs text-muted-foreground mb-1">Farm Price</p>
                      <p className="flex items-center justify-center text-lg font-semibold text-farm-green">
                        <IndianRupee className="w-4 h-4" />
                        {product.initialPrice}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1 text-center p-3 rounded-lg bg-primary/10">
                      <p className="text-xs text-muted-foreground mb-1">Current Price</p>
                      <p className="flex items-center justify-center text-lg font-semibold text-primary">
                        <IndianRupee className="w-4 h-4" />
                        {product.currentPrice}
                      </p>
                    </div>
                  </div>
                  {priceChange > 0 && (
                    <p className="text-center text-sm text-muted-foreground mt-3">
                      Price increased by <span className="text-harvest-gold font-medium">+{priceChangePercent}%</span> through the supply chain
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* QR Code */}
              <QRDisplay value={product.qrCode} productName={product.cropType} size={160} />
            </div>

            {/* Right column - Timeline */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Supply Chain Journey</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {product.chainLogs.length} verified steps from farm to current location
                  </p>
                </CardHeader>
                <CardContent>
                  <Timeline logs={product.chainLogs} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TracePage;
