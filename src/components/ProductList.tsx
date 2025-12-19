import { Product, STAGE_NAMES } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QRCodeSVG } from 'qrcode.react';
import { Package, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductListProps {
  products: Product[];
  showQR?: boolean;
}

const ProductList = ({ products, showQR = false }: ProductListProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => {
        const firstEntry = product.timeline?.[0];
        const latestEntry = product.timeline?.[product.timeline.length - 1];

        return (
          <Link
            to={`/consumer?id=${product.id}`}
            key={product.id}
            className="block animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-foreground line-clamp-1">
                      {product.crop}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {product.quantity} kg
                    </p>
                  </div>
                  {showQR && (
                    <div className="flex-shrink-0 p-2 bg-background rounded-lg border">
                      <QRCodeSVG
                        value={product.id}
                        size={48}
                        level="L"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  {firstEntry?.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="line-clamp-1">{firstEntry.location}</span>
                    </div>
                  )}
                  {firstEntry?.date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(firstEntry.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <Badge
                    variant={product.current_stage === 4 ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {STAGE_NAMES[product.current_stage] || 'Unknown'}
                  </Badge>
                  {latestEntry && (
                    <span className="text-sm font-semibold text-primary">
                      ₹{latestEntry.price}/kg
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductList;
