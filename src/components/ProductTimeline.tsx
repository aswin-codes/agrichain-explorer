import { Product, TimelineEntry, STAGE_NAMES } from '@/types';
import { Tractor, Truck, Store, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductTimelineProps {
  product: Product;
}

const stageIcons = {
  1: Tractor,
  2: Truck,
  3: Store,
  4: CheckCircle2
};

const stageColors = {
  1: 'bg-primary',
  2: 'bg-secondary',
  3: 'bg-harvest-gold',
  4: 'bg-leaf'
};

const ProductTimeline = ({ product }: ProductTimelineProps) => {
  const timeline = product.timeline || [];

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

      <div className="space-y-6">
        {timeline.map((entry: TimelineEntry, index: number) => {
          const Icon = stageIcons[entry.stage as keyof typeof stageIcons] || Tractor;
          const bgColor = stageColors[entry.stage as keyof typeof stageColors] || 'bg-primary';

          return (
            <div
              key={index}
              className="relative pl-16 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Stage icon */}
              <div
                className={cn(
                  "absolute left-3 w-7 h-7 rounded-full flex items-center justify-center text-primary-foreground shadow-md z-10",
                  bgColor
                )}
              >
                <Icon className="w-4 h-4" />
              </div>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h4 className="font-display font-semibold text-foreground">
                        {entry.stageName}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {entry.location}
                      </p>
                    </div>
                    <Badge variant="secondary" className="font-semibold">
                      ₹{entry.price}/kg
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
                    <span>{new Date(entry.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</span>
                    {entry.handlerName && (
                      <>
                        <span>•</span>
                        <span>{entry.handlerName}</span>
                      </>
                    )}
                    {entry.quality && (
                      <>
                        <span>•</span>
                        <span>Quality: {entry.quality}</span>
                      </>
                    )}
                  </div>

                  {entry.notes && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {entry.notes}
                    </p>
                  )}

                  {entry.photo && (
                    <div className="mt-3">
                      <img
                        src={entry.photo}
                        alt={`Stage ${entry.stage}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {entry.expiryDate && (
                    <p className="text-xs text-destructive mt-2">
                      Best before: {new Date(entry.expiryDate).toLocaleDateString('en-IN')}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          );
        })}

        {/* Pending stages */}
        {[1, 2, 3, 4].filter(stage => !timeline.some((e: TimelineEntry) => e.stage === stage)).map((stage) => {
          const Icon = stageIcons[stage as keyof typeof stageIcons];
          return (
            <div key={stage} className="relative pl-16 opacity-40">
              <div className="absolute left-3 w-7 h-7 rounded-full flex items-center justify-center bg-muted text-muted-foreground border-2 border-dashed border-border z-10">
                <Icon className="w-4 h-4" />
              </div>
              <Card className="border-dashed">
                <CardContent className="p-4">
                  <h4 className="font-display font-semibold text-muted-foreground">
                    {STAGE_NAMES[stage]}
                  </h4>
                  <p className="text-sm text-muted-foreground">Pending...</p>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductTimeline;
