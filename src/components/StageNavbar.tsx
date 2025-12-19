import { Link, useLocation } from 'react-router-dom';
import { Leaf, Tractor, Truck, Store, ScanLine, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const StageNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const stages = [
    { to: '/farmer', label: 'Farmer Upload', icon: Tractor, stage: 1 },
    { to: '/middleman', label: 'Middleman Buy', icon: Truck, stage: 2 },
    { to: '/retailer', label: 'Retailer Buy', icon: Store, stage: 3 },
    { to: '/consumer', label: 'Consumer Trace', icon: ScanLine, stage: 4 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              AgriTrace
            </span>
          </Link>

          {/* Desktop Navigation - Stage Links */}
          <div className="hidden lg:flex items-center gap-1">
            {stages.map((stage) => {
              const isActive = location.pathname === stage.to;
              return (
                <Link
                  key={stage.to}
                  to={stage.to}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <stage.icon className="w-4 h-4" />
                  <span className="hidden xl:inline">{stage.label}</span>
                  <span className="xl:hidden">{stage.label.split(' ')[0]}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {stages.map((stage) => {
                const isActive = location.pathname === stage.to;
                return (
                  <Link
                    key={stage.to}
                    to={stage.to}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <stage.icon className="w-5 h-5" />
                    {stage.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default StageNavbar;
