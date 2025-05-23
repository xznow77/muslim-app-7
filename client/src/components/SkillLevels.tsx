import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Sprout, TrendingUp, Crown } from 'lucide-react';
import type { SkillLevelPath } from '@shared/schema';

export function SkillLevels() {
  const { data: skillLevels, isLoading, error } = useQuery<SkillLevelPath[]>({
    queryKey: ['/api/skill-levels'],
    enabled: true,
  });

  const getIcon = (iconClass: string) => {
    if (iconClass.includes('seedling')) return Sprout;
    if (iconClass.includes('chart-line')) return TrendingUp;
    if (iconClass.includes('crown')) return Crown;
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

  // Mock progress data - in a real app this would come from user progress API
  const getProgress = (level: string) => {
    const progressMap: Record<string, number> = {
      'beginner': 0,
      'intermediate': 0,
      'advanced': 0
    };
    return progressMap[level] || 0;
  };

  if (error) {
    return (
      <section className="py-16 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold text-charcoal mb-4">
              Unable to Load Skill Levels
            </h2>
            <p className="text-gray-600">
              There was an error loading the skill level information. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal mb-4">
            Learn at Your Own Pace
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our structured learning paths ensure you build skills progressively, from fundamental concepts to advanced mastery
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-8">
                <div className="text-center mb-6">
                  <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-32 mx-auto mb-2" />
                  <Skeleton className="h-4 w-48 mx-auto" />
                </div>
                <div className="space-y-4 mb-6">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="flex items-start">
                      <Skeleton className="w-5 h-5 rounded-full mr-3 mt-1" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-20 w-full mb-6" />
                <Skeleton className="h-10 w-full" />
              </Card>
            ))}
          </div>
        ) : skillLevels?.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-charcoal mb-2">No skill levels available</h3>
            <p className="text-gray-600">Please check back later for learning paths.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {skillLevels?.map((skillLevel, index) => {
              const IconComponent = getIcon(skillLevel.icon);
              const colors = getColorClasses(skillLevel.color);
              const progress = getProgress(skillLevel.level);
              const isPopular = index === 1; // Make intermediate the most popular

              return (
                <Card 
                  key={skillLevel.id} 
                  className={`p-8 hover:shadow-xl transition-all hover-lift ${
                    isPopular ? 'border-2 border-accent' : ''
                  }`}
                >
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <h3 className="text-2xl font-heading font-semibold text-charcoal mb-2">
                      {skillLevel.title}
                    </h3>
                    <p className="text-gray-600">{skillLevel.description}</p>
                    {isPopular && (
                      <span className="inline-block bg-accent text-white px-3 py-1 rounded-full text-sm font-medium mt-2">
                        Most Popular
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {skillLevel.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <CheckCircle className={`w-5 h-5 ${colors.text} mr-3 mt-1 flex-shrink-0`} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-600">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <Link href={`/skill-level/${skillLevel.level}`}>
                    <Button className={`w-full ${colors.button} text-white py-3`}>
                      Start {skillLevel.title} Path
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
