import Navigation from '@/components/Navigation';
import ScannerInput from '@/components/ScannerInput';
import { QrCode, Smartphone, Shield } from 'lucide-react';

const ScanPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <QrCode className="w-4 h-4" />
              Product Scanner
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trace Any Product
            </h1>
            <p className="text-muted-foreground">
              Scan the QR code or enter the product ID to view its complete journey from farm to you
            </p>
          </div>

          {/* Scanner */}
          <div className="max-w-md mx-auto mb-16">
            <ScannerInput />
          </div>

          {/* Benefits */}
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-xl font-semibold text-center mb-8 text-foreground">
              Why Trace Your Food?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'Verify Authenticity',
                  desc: 'Ensure your produce is genuine and comes from verified farms',
                },
                {
                  icon: Smartphone,
                  title: 'See Fair Pricing',
                  desc: 'Understand how prices change at each step of the supply chain',
                },
                {
                  icon: QrCode,
                  title: 'Know the Journey',
                  desc: 'View the complete path your food took from harvest to shelf',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="text-center p-6 rounded-xl bg-card border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScanPage;
