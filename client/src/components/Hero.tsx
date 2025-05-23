import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, Sprout, TrendingUp, Crown } from 'lucide-react';

interface HeroProps {
  onSearch?: (query: string) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const skillLevels = [
    {
      level: 'beginner',
      title: 'Beginner',
      description: 'Start your artistic journey with fundamental techniques and basic concepts',
      icon: Sprout,
      color: 'bg-success',
      textColor: 'text-success'
    },
    {
      level: 'intermediate', 
      title: 'Intermediate',
      description: 'Develop your skills with advanced techniques and creative exploration',
      icon: TrendingUp,
      color: 'bg-accent',
      textColor: 'text-accent'
    },
    {
      level: 'advanced',
      title: 'Advanced', 
      description: 'Master complex techniques and develop your unique artistic voice',
      icon: Crown,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-accent py-20 overflow-hidden artistic-overlay">
      {/* Background artistic pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Unlock Your <span className="text-neutral">Artistic</span> Potential
          </h1>
          <p className="text-xl md:text-2xl text-neutral mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover comprehensive art education resources organized by skill level. From beginner basics to advanced masterpiece techniques.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search art tutorials, techniques, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-6 py-4 pl-14 text-lg rounded-full border-0 shadow-xl focus:ring-4 focus:ring-white focus:ring-opacity-50 focus:outline-none"
                aria-label="Search art resources"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <Button 
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-full transition-all"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Skill Level Quick Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {skillLevels.map((skill) => {
              const IconComponent = skill.icon;
              return (
                <Link key={skill.level} href={`/skill-level/${skill.level}`}>
                  <Card className="bg-white bg-opacity-10 backdrop-blur-sm p-6 hover:bg-opacity-20 transition-all cursor-pointer transform hover:scale-105 border-0">
                    <IconComponent className={`w-12 h-12 mx-auto mb-4 ${skill.textColor}`} />
                    <h3 className="text-xl font-heading font-semibold text-white mb-2">{skill.title}</h3>
                    <p className="text-neutral">{skill.description}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
