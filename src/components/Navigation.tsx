import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, QrCode, Search, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = [
    { to: '/farmer', label: 'Farmer Dashboard', icon: LayoutDashboard },
    { to: '/scan', label: 'Scan QR', icon: QrCode },
    { to: '/search', label: 'Search', icon: Search },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isHome ? "bg-transparent" : "bg-background/80 backdrop-blur-md border-b border-border"
    )}>
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
              isHome ? "bg-primary-foreground/20" : "bg-primary"
            )}>
              <Leaf className={cn(
                "w-5 h-5 transition-colors",
                isHome ? "text-primary-foreground" : "text-primary-foreground"
              )} />
            </div>
            <span className={cn(
              "font-display text-xl font-bold transition-colors",
              isHome ? "text-primary-foreground" : "text-foreground"
            )}>
              AgriTrace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors",
                  isHome
                    ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    : location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden",
              isHome && "text-primary-foreground hover:bg-primary-foreground/10"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors",
                    isHome
                      ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                      : location.pathname === link.to
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
