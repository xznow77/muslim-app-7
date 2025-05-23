import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { GalleryItem } from '@shared/schema';

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');

  const { data: galleryItems, isLoading, error } = useQuery<GalleryItem[]>({
    queryKey: ['/api/gallery'],
    enabled: true,
  });

  const categories = [
    { id: 'all', label: 'All Artwork' },
    { id: 'painting', label: 'Paintings' },
    { id: 'drawing', label: 'Drawings' },
    { id: 'digital', label: 'Digital Art' },
    { id: 'mixed', label: 'Mixed Media' },
  ];

  const filteredItems = galleryItems?.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  }) || [];

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-success bg-opacity-10 text-success';
      case 'intermediate':
        return 'bg-accent bg-opacity-10 text-accent';
      case 'advanced':
        return 'bg-yellow-500 bg-opacity-10 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold text-charcoal mb-4">
              Unable to Load Gallery
            </h2>
            <p className="text-gray-600">
              There was an error loading the gallery items. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal mb-4">
            Student Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing artwork created by our learning community. Get inspired and see what's possible with dedication and practice.
          </p>
        </div>

        {/* Gallery Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(category.id)}
              className={`transition-all ${
                activeFilter === category.id
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-gray-200 text-charcoal hover:bg-gray-300'
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-64" />
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-charcoal mb-2">No artwork found</h3>
            <p className="text-gray-600">
              {activeFilter === 'all' 
                ? 'No gallery items are currently available.'
                : `No ${categories.find(c => c.id === activeFilter)?.label.toLowerCase()} found in the gallery.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden group hover:shadow-xl transition-all hover-lift">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={`${item.title} by ${item.artist}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={getSkillLevelColor(item.skillLevel)}>
                      {item.skillLevel.charAt(0).toUpperCase() + item.skillLevel.slice(1)}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-charcoal mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">by {item.artist}</p>
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* View More Button */}
        {!isLoading && filteredItems.length > 0 && (
          <div className="text-center">
            <Button className="bg-primary hover:bg-secondary text-white px-8 py-3">
              View Full Gallery
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
