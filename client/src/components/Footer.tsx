import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Palette, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // In a real app, this would make an API call
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing! Check your email for confirmation.",
      });
      setEmail('');
    }
  };

  const footerSections = [
    {
      title: 'Learning Paths',
      links: [
        { label: 'Beginner Fundamentals', href: '/skill-level/beginner' },
        { label: 'Intermediate Techniques', href: '/skill-level/intermediate' },
        { label: 'Advanced Mastery', href: '/skill-level/advanced' },
        { label: 'Digital Art', href: '/resources?category=digital' },
        { label: 'Traditional Media', href: '/resources?category=painting' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Video Tutorials', href: '/resources' },
        { label: 'Practice Exercises', href: '/resources' },
        { label: 'Art Supplies Guide', href: '/resources?category=supplies' },
        { label: 'Community Gallery', href: '/gallery' },
        { label: 'Blog & Articles', href: '/blog' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Accessibility', href: '/accessibility' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/artlearnhub', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/artlearnhub', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/artlearnhub', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/artlearnhub', label: 'YouTube' },
  ];

  return (
    <footer className="bg-charcoal text-white py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-primary mb-4 flex items-center">
              <Palette className="mr-2" size={24} />
              ArtLearn Hub
            </h3>
            <p className="text-gray-300 mb-4">
              Empowering artists worldwide with comprehensive educational resources and structured learning paths.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-accent transition-colors"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-300">Get the latest tutorials and art tips delivered to your inbox</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-charcoal flex-grow md:w-64 rounded-r-none focus:ring-accent"
                required
                aria-label="Email for newsletter"
              />
              <Button 
                type="submit"
                className="bg-accent hover:bg-accent/90 text-white rounded-l-none"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 ArtLearn Hub. All rights reserved. |{' '}
            <a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a> |{' '}
            <a href="/terms" className="hover:text-accent transition-colors">Terms</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
