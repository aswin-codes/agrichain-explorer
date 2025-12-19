import { useState } from 'react';
import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchProducts, mockProducts } from '@/data/mockData';
import { Search, MapPin, Leaf } from 'lucide-react';
import { Product } from '@/types';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>(mockProducts);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setResults(searchProducts(query));
      setHasSearched(true);
    } else {
      setResults(mockProducts);
      setHasSearched(false);
    }
  };

  const quickFilters = ['Tomatoes', 'Rice', 'Punjab', 'Maharashtra'];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Search className="w-4 h-4" />
              Search Products
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Find Traced Products
            </h1>
            <p className="text-muted-foreground">
              Search by crop name, location, farmer, or product code
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search crops, locations, farmers..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button type="submit" size="lg">
                Search
              </Button>
            </form>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {quickFilters.map((filter) => (
                <Button
                  key={filter}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setQuery(filter);
                    setResults(searchProducts(filter));
                    setHasSearched(true);
                  }}
                  className="text-sm"
                >
                  {filter.includes('Punjab') || filter.includes('Maharashtra') ? (
                    <MapPin className="w-3 h-3" />
                  ) : (
                    <Leaf className="w-3 h-3" />
                  )}
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {hasSearched ? (
                  <>Found <span className="font-medium text-foreground">{results.length}</span> products for "{query}"</>
                ) : (
                  <>Showing all <span className="font-medium text-foreground">{results.length}</span> products</>
                )}
              </p>
            </div>

            {results.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((product, i) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🌾</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try a different search term or browse all products
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery('');
                    setResults(mockProducts);
                    setHasSearched(false);
                  }}
                >
                  Show All Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
