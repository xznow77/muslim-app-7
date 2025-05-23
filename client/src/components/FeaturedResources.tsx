import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Clock } from 'lucide-react';
import type { Resource } from '@shared/schema';

interface FeaturedResourcesProps {
  searchQuery?: string;
}

export function FeaturedResources({ searchQuery }: FeaturedResourcesProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');

  const { data: resources, isLoading, error } = useQuery<Resource[]>({
    queryKey: ['/api/resources', { 
      featured: !searchQuery ? 'true' : undefined, 
      search: searchQuery 
    }],
    enabled: true,
  });

  const categories = [
    { id: 'all', label: 'All', count: resources?.length || 0 },
    { id: 'painting', label: 'Painting', count: resources?.filter(r => r.category === 'painting').length || 0 },
    { id: 'drawing', label: 'Drawing', count: resources?.filter(r => r.category === 'drawing').length || 0 },
    { id: 'digital', label: 'Digital Art', count: resources?.filter(r => r.category === 'digital').length || 0 },
    { id: 'sculpture', label: 'Sculpture', count: resources?.filter(r => r.category === 'sculpture').length || 0 },
    { id: 'supplies', label: 'Supplies', count: resources?.filter(r => r.category === 'supplies').length || 0 },
  ];

  const filteredResources = resources?.filter(resource => {
    if (activeFilter === 'all') return true;
    return resource.category === activeFilter;
  }) || [];

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortOption) {
      case 'popular':
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      case 'rating':
        return parseFloat(b.rating) - parseFloat(a.rating);
      case 'duration':
        const aDuration = parseFloat(a.duration);
        const bDuration = parseFloat(b.duration);
        return aDuration - bDuration;
      default: // newest
        return b.id - a.id;
    }
  });

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
              Unable to Load Resources
            </h2>
            <p className="text-gray-600">
              There was an error loading the educational resources. Please try again later.
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
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Learning Resources'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {searchQuery 
              ? `Found ${sortedResources.length} resource${sortedResources.length !== 1 ? 's' : ''} matching your search`
              : 'Curated collection of high-quality educational materials to accelerate your artistic growth'
            }
          </p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
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
                {category.count > 0 && (
                  <span className="ml-1 text-xs">({category.count})</span>
                )}
              </Button>
            ))}
          </div>
          
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="duration">Shortest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Resource Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : sortedResources.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-charcoal mb-2">
              {searchQuery ? 'No resources found' : 'No resources available'}
            </h3>
            <p className="text-gray-600">
              {searchQuery 
                ? 'Try adjusting your search terms or browse our featured content.'
                : 'Please check back later for new educational resources.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {sortedResources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 hover-lift">
                <img 
                  src={resource.imageUrl} 
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getSkillLevelColor(resource.skillLevel)}>
                      {resource.skillLevel.charAt(0).toUpperCase() + resource.skillLevel.slice(1)}
                    </Badge>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{resource.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-charcoal mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {resource.duration}
                    </span>
                    <Button className="bg-accent hover:bg-accent/90 text-white">
                      Start Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && !searchQuery && sortedResources.length > 0 && (
          <div className="text-center">
            <Button className="bg-primary hover:bg-secondary text-white px-8 py-3">
              Load More Resources
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
