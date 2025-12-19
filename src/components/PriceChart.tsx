import { Product, TimelineEntry } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PriceChartProps {
  product: Product;
}

const PriceChart = ({ product }: PriceChartProps) => {
  const timeline = product.timeline || [];

  const chartData = timeline.map((entry: TimelineEntry) => ({
    name: entry.stageName,
    price: entry.price,
    stage: entry.stage
  }));

  if (chartData.length === 0) return null;

  const initialPrice = chartData[0]?.price || 0;
  const finalPrice = chartData[chartData.length - 1]?.price || 0;
  const priceChange = finalPrice - initialPrice;
  const percentChange = initialPrice > 0 ? ((priceChange / initialPrice) * 100).toFixed(1) : 0;

  const getTrendIcon = () => {
    if (priceChange > 0) return <TrendingUp className="w-5 h-5 text-destructive" />;
    if (priceChange < 0) return <TrendingDown className="w-5 h-5 text-primary" />;
    return <Minus className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="font-display">Price Journey</span>
          <div className="flex items-center gap-2 text-sm font-normal">
            {getTrendIcon()}
            <span className={priceChange > 0 ? 'text-destructive' : 'text-primary'}>
              {priceChange > 0 ? '+' : ''}{percentChange}% markup
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [`₹${value}/kg`, 'Price']}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="hsl(var(--primary))" 
                fill="url(#colorPrice)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Fair Price Check */}
        <div className="mt-4 p-4 rounded-xl bg-muted/50">
          <h4 className="font-semibold text-sm mb-2">Fair Price Check</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Farm Price</p>
              <p className="font-display font-bold text-primary">₹{initialPrice}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Final Price</p>
              <p className="font-display font-bold text-secondary">₹{finalPrice}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Markup</p>
              <p className={`font-display font-bold ${Number(percentChange) > 100 ? 'text-destructive' : 'text-primary'}`}>
                {percentChange}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
