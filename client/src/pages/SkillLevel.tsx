import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { SEOHead } from '@/components/SEOHead';
import { Header } from '@/components/Header';
import { FeaturedResources } from '@/components/FeaturedResources';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Sprout, TrendingUp, Crown } from 'lucide-react';
import { generateSkillLevelSEO } from '@/lib/seo';
import type { SkillLevelPath, Resource } from '@shared/schema';

export function SkillLevel() {
  const [match, params] = useRoute('/skill-level/:level');
  const level = params?.level || '';

  const { data: skillLevel, isLoading: skillLevelLoading, error: skillLevelError } = useQuery<SkillLevelPath>({
    queryKey: [`/api/skill-levels/${level}`],
    enabled: !!level,
  });

  const { data: resources, isLoading: resourcesLoading } = useQuery<Resource[]>({
    queryKey: ['/api/resources', { skillLevel: level }],
    enabled: !!level,
  });

  const getIcon = (iconClass: string) => {
    if (iconClass?.includes('seedling')) return Sprout;
    if (iconClass?.includes('chart-line')) return TrendingUp;
    if (iconClass?.includes('crown')) return Crown;
    return Sprout; // fallback
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'success':
        return {
          bg: 'bg-success bg-opacity-10',
          text: 'text-success',
          button: 'bg-success hover:bg-success/90',
          progress: 'bg-success'
        };
      case 'accent':
        return {
          bg: 'bg-accent bg-opacity-10',
          text: 'text-accent',
          button: 'bg-accent hover:bg-accent/90',
          progress: 'bg-accent'
        };
      case 'yellow-600':
        return {
          bg: 'bg-yellow-500 bg-opacity-10',
          text: 'text-yellow-600',
          button: 'bg-yellow-600 hover:bg-yellow-600/90',
          progress: 'bg-yellow-600'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          button: 'bg-gray-600 hover:bg-gray-600/90',
          progress: 'bg-gray-600'
        };
    }
  };

  if (!match) {
    return null;
  }

  if (skillLevelError) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-heading font-bold text-charcoal mb-4">
              Skill Level Not Found
            </h1>
            <p className="text-gray-600">
              The requested skill level could not be found. Please check the URL and try again.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const seoData = skillLevel ? 
    generateSkillLevelSEO(skillLevel.level, skillLevel.title, skillLevel.description) :
    { title: 'Loading...', description: 'Loading skill level information' };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead seo={seoData} />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {skillLevelLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-16 w-16 rounded-full mx-auto" />
                <Skeleton className="h-12 w-80 mx-auto" />
                <Skeleton className="h-6 w-96 mx-auto" />
              </div>
            ) : skillLevel ? (
              <>
                <div className={`w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  {(() => {
                    const IconComponent = getIcon(skillLevel.icon);
                    return <IconComponent className="w-10 h-10 text-white" />;
                  })()}
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                  {skillLevel.title}
                </h1>
                <p className="text-xl text-neutral max-w-2xl mx-auto">
                  {skillLevel.description}
                </p>
              </>
            ) : null}
          </div>
        </section>

        {/* Skill Level Details */}
        {skillLevel && (
          <section className="py-16 bg-neutral">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Features */}
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-charcoal mb-6">
                      What You'll Learn
                    </h2>
                    <div className="space-y-4">
                      {skillLevel.features.map((feature, index) => {
                        const colors = getColorClasses(skillLevel.color);
                        return (
                          <div key={index} className="flex items-start">
                            <CheckCircle className={`w-5 h-5 ${colors.text} mr-3 mt-1 flex-shrink-0`} />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Progress & Action */}
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-charcoal mb-6">
                      Your Progress
                    </h2>
                    
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium text-gray-700">Overall Progress</span>
                        <span className="text-lg text-gray-600">0%</span>
                      </div>
                      <Progress value={0} className="h-3 mb-4" />
                      <p className="text-sm text-gray-600">
                        Start your {skillLevel.level} journey to track your progress
                      </p>
                    </div>

                    <div className="space-y-4">
                      {(() => {
                        const colors = getColorClasses(skillLevel.color);
                        return (
                          <>
                            <Button className={`w-full ${colors.button} text-white py-3 text-lg`}>
                              Start Learning Path
                            </Button>
                            <Button variant="outline" className="w-full">
                              View All {skillLevel.title} Resources
                            </Button>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Related Resources */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal mb-4">
                {skillLevel?.title} Resources
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Curated learning materials specifically designed for the {level} level
              </p>
            </div>

            {resourcesLoading ? (
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
            ) : resources?.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-charcoal mb-2">No resources available</h3>
                <p className="text-gray-600">
                  Resources for this skill level are currently being prepared. Please check back soon.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources?.slice(0, 6).map((resource) => (
                  <Card key={resource.id} className="overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
                    <img 
                      src={resource.imageUrl} 
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <h3 className="text-xl font-heading font-semibold text-charcoal mb-2">{resource.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{resource.duration}</span>
                        <Button className="bg-accent hover:bg-accent/90 text-white">
                          Start Learning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {resources && resources.length > 6 && (
              <div className="text-center mt-12">
                <Button className="bg-primary hover:bg-secondary text-white px-8 py-3">
                  View All {skillLevel?.title} Resources
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
