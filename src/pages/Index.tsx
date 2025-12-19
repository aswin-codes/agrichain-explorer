import { Link } from 'react-router-dom';
import StageNavbar from '@/components/StageNavbar';
import { Button } from '@/components/ui/button';
import { Tractor, Truck, Store, ScanLine, ArrowRight, Leaf, Shield, TrendingUp } from 'lucide-react';
import ProductList from '@/components/ProductList';
import { getAllProducts } from '@/lib/supabase-helpers';
import { useQuery } from '@tanstack/react-query';

const Index = () => {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts
  });

  const stages = [
    { 
      to: '/farmer', 
      label: 'Farmer Upload', 
      icon: Tractor, 
      color: 'bg-primary',
      description: 'Register produce & generate QR'
    },
    { 
      to: '/middleman', 
      label: 'Middleman Buy', 
      icon: Truck, 
      color: 'bg-secondary',
      description: 'Add transport & buy details'
    },
    { 
      to: '/retailer', 
      label: 'Retailer Buy', 
      icon: Store, 
      color: 'bg-harvest-gold',
      description: 'Set retail price & stock'
    },
    { 
      to: '/consumer', 
      label: 'Consumer Trace', 
      icon: ScanLine, 
      color: 'bg-leaf',
      description: 'View complete journey'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <StageNavbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Leaf className="w-8 h-8" />
              <span className="font-display text-2xl font-bold">AgriTrace</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transparent Farm-to-Table Tracking
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Follow your food's journey from harvest to store. Full transparency, fair pricing, zero fraud.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="hero-outline" asChild className="text-base">
                <Link to="/farmer">
                  <Tractor className="w-5 h-5" />
                  I'm a Farmer
                </Link>
              </Button>
              <Button size="lg" variant="hero-outline" asChild className="text-base">
                <Link to="/consumer">
                  <ScanLine className="w-5 h-5" />
                  Scan a Product
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stages Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              4 Simple Stages
            </h2>
            <p className="text-muted-foreground">
              Each step in the supply chain adds transparency
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stages.map((stage, index) => (
              <Link
                key={stage.to}
                to={stage.to}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-xl ${stage.color} flex items-center justify-center mb-4`}>
                    <stage.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {stage.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {stage.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            {[
              { icon: Leaf, value: products.length || '0', label: 'Products Tracked' },
              { icon: Shield, value: '100%', label: 'Transparency' },
              { icon: TrendingUp, value: 'Fair', label: 'Pricing' },
            ].map((stat, i) => (
              <div key={i} className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-display text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Products */}
      {products.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Recent Products
              </h2>
              <Button variant="outline" asChild>
                <Link to="/consumer">View All</Link>
              </Button>
            </div>
            <ProductList products={products.slice(0, 6)} />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              <span className="font-display font-bold">AgriTrace</span>
            </div>
            <p className="text-sm opacity-70">
              Built for transparency in agriculture • No authentication required
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
