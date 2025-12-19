import { Leaf, QrCode, Truck, Store, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-95" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-harvest-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-16 lg:pt-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-sm mb-8 animate-fade-in">
            <ShieldCheck className="w-4 h-4" />
            <span>Trusted by 500+ farmers across India</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            From Farm to Fork,{' '}
            <span className="relative">
              <span className="relative z-10">Transparently</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-harvest-gold/30 -z-0" />
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            AgriTrace empowers farmers, distributors, and consumers with complete visibility into the agricultural supply chain. Scan, track, and trust every step.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/farmer">
                <Leaf className="w-5 h-5" />
                I'm a Farmer
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/scan">
                <QrCode className="w-5 h-5" />
                Scan Product
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
          {[
            { icon: Leaf, title: 'For Farmers', desc: 'Log your produce and generate QR codes instantly', delay: '0.4s' },
            { icon: Truck, title: 'For Supply Chain', desc: 'Track and verify each step with photo uploads', delay: '0.5s' },
            { icon: Store, title: 'For Consumers', desc: 'Scan and see the complete journey of your food', delay: '0.6s' },
          ].map((item, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: item.delay }}
            >
              <div className="w-12 h-12 rounded-xl bg-harvest-gold/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-harvest-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-primary-foreground/70 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
