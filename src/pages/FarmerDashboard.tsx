import Navigation from '@/components/Navigation';
import FarmerForm from '@/components/FarmerForm';
import { Leaf, Award, TrendingUp, Shield } from 'lucide-react';

const FarmerDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-farm-green/10 text-farm-green text-sm mb-4">
              <Leaf className="w-4 h-4" />
              Farmer Dashboard
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Welcome, Farmer!
            </h1>
            <p className="text-muted-foreground">
              Log your produce and generate QR codes for transparent supply chain tracking
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            {[
              { icon: Award, label: 'Products Logged', value: '24' },
              { icon: TrendingUp, label: 'Total Scans', value: '1,250' },
              { icon: Shield, label: 'Verified Sales', value: '18' },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-xl bg-card border border-border"
              >
                <stat.icon className="w-5 h-5 text-farm-green mx-auto mb-2" />
                <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-xl mx-auto">
            <FarmerForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmerDashboard;
