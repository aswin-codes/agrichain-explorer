import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/mockData';
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Farmers Onboarded', value: '500+', icon: Users },
              { label: 'Products Traced', value: '10,000+', icon: Shield },
              { label: 'States Covered', value: '12', icon: TrendingUp },
              { label: 'Consumer Scans', value: '50,000+', icon: Shield },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-muted/50 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
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

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Recently Traced Products
              </h2>
              <p className="text-muted-foreground">
                Explore the journey of fresh produce from farms across India
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/search">
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product, i) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How AgriTrace Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple, transparent process that connects farmers directly with consumers
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Farmer Logs', desc: 'Farmer registers produce details and gets a unique QR code' },
              { step: '02', title: 'Chain Updates', desc: 'Each handler scans and adds their step with verification' },
              { step: '03', title: 'Quality Checks', desc: 'Independent verification at each stage ensures authenticity' },
              { step: '04', title: 'Consumer Scans', desc: 'End consumers see the complete journey with fair pricing' },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to trace your produce?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join thousands of farmers, distributors, and consumers building trust in agriculture
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/farmer">Start as Farmer</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/scan">Scan a Product</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-80">
              © 2024 AgriTrace. Empowering transparent agriculture.
            </p>
            <div className="flex items-center gap-4 text-sm opacity-80">
              <span>SDG 2: Zero Hunger</span>
              <span>•</span>
              <span>SDG 12: Responsible Consumption</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
