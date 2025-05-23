import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, PenTool, BarChart3, Users } from 'lucide-react';

export function EducationalTools() {
  const tools = [
    {
      icon: Play,
      title: 'HD Video Lessons',
      description: 'Professional-quality video tutorials with close-up technique demonstrations',
      metric: '500+ Videos'
    },
    {
      icon: PenTool,
      title: 'Practice Exercises',
      description: 'Guided exercises with step-by-step instructions and feedback',
      metric: '200+ Exercises'
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'Track your improvement with detailed analytics and milestones',
      metric: 'Smart Tracking'
    },
    {
      icon: Users,
      title: 'Artist Community',
      description: 'Connect with fellow artists, share work, and get feedback',
      metric: '50k+ Members'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary to-secondary artistic-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Professional Learning Tools
          </h2>
          <p className="text-lg text-neutral max-w-2xl mx-auto">
            Access our comprehensive suite of educational tools designed to accelerate your artistic development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Card key={index} className="bg-white bg-opacity-10 backdrop-blur-sm p-6 text-center hover:bg-opacity-20 transition-all border-0 hover-lift">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-2">{tool.title}</h3>
                <p className="text-neutral text-sm mb-4">{tool.description}</p>
                <span className="text-accent font-semibold">{tool.metric}</span>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-medium transform hover:scale-105 transition-all">
            Start Your Free Trial
          </Button>
          <p className="text-neutral mt-3">No credit card required • 7-day free trial</p>
        </div>
      </div>
    </section>
  );
}
