import { Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, IndianRupee, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const statusColors = {
  'at-farm': 'bg-farm-green/10 text-farm-green border-farm-green/20',
  'in-transit': 'bg-sky-blue/10 text-sky-blue border-sky-blue/20',
  'at-distributor': 'bg-harvest-gold/10 text-harvest-gold border-harvest-gold/20',
  'at-retailer': 'bg-primary/10 text-primary border-primary/20',
  'sold': 'bg-muted text-muted-foreground border-border',
};

const statusLabels = {
  'at-farm': 'At Farm',
  'in-transit': 'In Transit',
  'at-distributor': 'At Distributor',
  'at-retailer': 'At Retailer',
  'sold': 'Sold',
};

const ProductCard = ({ product }: ProductCardProps) => {
  const priceChange = product.currentPrice - product.initialPrice;
  const priceChangePercent = ((priceChange / product.initialPrice) * 100).toFixed(0);

  return (
    <Link to={`/trace/${product.qrCode}`}>
      <Card variant="elevated" className="overflow-hidden group cursor-pointer">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.cropType}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-farm-green-light to-accent flex items-center justify-center">
              <span className="text-4xl">🌾</span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge className={cn("border", statusColors[product.status])}>
              {statusLabels[product.status]}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5">
          {/* Title & Variety */}
          <div className="mb-3">
            <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {product.cropType}
            </h3>
            {product.variety && (
              <p className="text-sm text-muted-foreground">{product.variety}</p>
            )}
          </div>

          {/* Details */}
          <div className="space-y-2 text-sm mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-farm-green" />
              <span>{product.farmLocation}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-harvest-gold" />
              <span>Harvested {format(new Date(product.harvestDate), 'MMM dd, yyyy')}</span>
            </div>
          </div>

          {/* Price info */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Current Price</p>
              <div className="flex items-center gap-2">
                <span className="flex items-center text-lg font-semibold text-foreground">
                  <IndianRupee className="w-4 h-4" />
                  {product.currentPrice}
                </span>
                <span className="text-xs text-muted-foreground">/{product.unit}</span>
                {priceChange > 0 && (
                  <span className="text-xs text-harvest-gold font-medium">
                    +{priceChangePercent}%
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
              View trace
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
