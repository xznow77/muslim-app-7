import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { SEOHead } from '@/components/SEOHead';
import { Header } from '@/components/Header';
import { FeaturedResources } from '@/components/FeaturedResources';
import { Footer } from '@/components/Footer';
import { resourcesSEO } from '@/lib/seo';

export function Resources() {
  const [, params] = useRoute('/resources');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract search query from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Update URL with search parameter
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('search', query);
    } else {
      url.searchParams.delete('search');
    }
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead seo={resourcesSEO} />
      <Header onSearch={handleSearch} />
      <main className="pt-8">
        <FeaturedResources searchQuery={searchQuery} />
      </main>
      <Footer />
    </div>
  );
}
