import { useState } from 'react';
import { useLocation } from 'wouter';
import { SEOHead } from '@/components/SEOHead';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeaturedResources } from '@/components/FeaturedResources';
import { SkillLevels } from '@/components/SkillLevels';
import { Gallery } from '@/components/Gallery';
import { EducationalTools } from '@/components/EducationalTools';
import { Footer } from '@/components/Footer';
import { homeSEO } from '@/lib/seo';

export function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Scroll to resources section
    const resourcesSection = document.querySelector('#resources');
    if (resourcesSection) {
      resourcesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead seo={homeSEO} />
      <Header onSearch={handleSearch} />
      <main>
        <Hero onSearch={handleSearch} />
        <div id="resources">
          <FeaturedResources searchQuery={searchQuery} />
        </div>
        <div id="skill-levels">
          <SkillLevels />
        </div>
        <div id="gallery">
          <Gallery />
        </div>
        <EducationalTools />
      </main>
      <Footer />
    </div>
  );
}
