import { ChainLog } from '@/types';
import { format } from 'date-fns';
import { Leaf, Truck, Store, ShieldCheck, MapPin, IndianRupee, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineProps {
  logs: ChainLog[];
}

const roleIcons = {
  farmer: Leaf,
  distributor: Truck,
  retailer: Store,
  consumer: ShieldCheck,
  admin: ShieldCheck,
};

const roleColors = {
  farmer: 'bg-farm-green text-primary-foreground',
  distributor: 'bg-sky-blue text-primary-foreground',
  retailer: 'bg-harvest-gold text-secondary-foreground',
  consumer: 'bg-muted text-muted-foreground',
  admin: 'bg-primary text-primary-foreground',
};

const Timeline = ({ logs }: TimelineProps) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-farm-green via-sky-blue to-harvest-gold" />

      <div className="space-y-6">
        {logs.map((log, index) => {
          const Icon = roleIcons[log.handlerRole];
          const colorClass = roleColors[log.handlerRole];
          
          return (
            <div
              key={log.id}
              className="relative pl-16 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={cn(
                "absolute left-3 w-7 h-7 rounded-full flex items-center justify-center ring-4 ring-background z-10",
                colorClass
              )}>
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Content card */}
              <div className="bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{log.action}</h4>
                    <p className="text-sm text-muted-foreground">{log.handlerName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {log.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-farm-green/10 text-farm-green text-xs font-medium">
                        <ShieldCheck className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                    {log.qualityCheck && (
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium",
                        log.qualityCheck.grade === 'A' && "bg-farm-green/10 text-farm-green",
                        log.qualityCheck.grade === 'B' && "bg-harvest-gold/10 text-harvest-gold",
                        log.qualityCheck.grade === 'C' && "bg-destructive/10 text-destructive"
                      )}>
                        Grade {log.qualityCheck.grade}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{log.location}</span>
                  </div>
                  
                  {log.price && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <IndianRupee className="w-4 h-4" />
                      <span>₹{log.price}/kg</span>
                    </div>
                  )}

                  {log.notes && (
                    <p className="text-muted-foreground mt-2 p-2 bg-muted/50 rounded-lg">
                      {log.notes}
                    </p>
                  )}

                  {log.photoUrl && (
                    <div className="flex items-center gap-2 text-primary mt-2">
                      <ImageIcon className="w-4 h-4" />
                      <span className="text-sm">Photo attached</span>
                    </div>
                  )}
                </div>

                {/* Timestamp */}
                <div className="mt-3 pt-3 border-t border-border">
                  <time className="text-xs text-muted-foreground">
                    {format(new Date(log.timestamp), 'MMM dd, yyyy • hh:mm a')}
                  </time>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
