export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: any;
}

export const defaultSEO: SEOData = {
  title: "ArtLearn Hub - Educational Art Resources for Every Skill Level",
  description: "Discover comprehensive art education resources organized by skill level. From beginner tutorials to advanced techniques, find the perfect learning materials for your artistic journey.",
  keywords: "art education, art tutorials, painting lessons, drawing techniques, art resources, beginner art, advanced art",
  ogType: "website",
  twitterCard: "summary_large_image",
};

export const homeSEO: SEOData = {
  ...defaultSEO,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "ArtLearn Hub",
    "description": "Educational art resources platform organized by skill level",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "sameAs": [
      "https://facebook.com/artlearnhub",
      "https://instagram.com/artlearnhub", 
      "https://twitter.com/artlearnhub"
    ],
    "educationalCredentialAwarded": "Art Education Certificates",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Art Education Resources",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Beginner Art Fundamentals",
          "description": "Essential art skills for beginners",
          "provider": {
            "@type": "Organization",
            "name": "ArtLearn Hub"
          }
        },
        {
          "@type": "Course", 
          "name": "Intermediate Art Techniques",
          "description": "Advanced techniques for developing artists",
          "provider": {
            "@type": "Organization",
            "name": "ArtLearn Hub"
          }
        },
        {
          "@type": "Course",
          "name": "Advanced Art Mastery", 
          "description": "Professional-level art instruction",
          "provider": {
            "@type": "Organization",
            "name": "ArtLearn Hub"
          }
        }
      ]
    }
  }
};

export const resourcesSEO: SEOData = {
  title: "Art Learning Resources - Tutorials, Guides & Courses | ArtLearn Hub",
  description: "Browse our extensive collection of art learning resources including video tutorials, practice exercises, and comprehensive guides for all skill levels.",
  keywords: "art tutorials, art courses, painting guides, drawing lessons, art education resources",
  ogTitle: "Art Learning Resources - ArtLearn Hub",
  ogDescription: "Browse our extensive collection of art learning resources including video tutorials, practice exercises, and comprehensive guides for all skill levels.",
  twitterTitle: "Art Learning Resources - ArtLearn Hub",
  twitterDescription: "Browse our extensive collection of art learning resources including video tutorials, practice exercises, and comprehensive guides for all skill levels.",
};

export const gallerySEO: SEOData = {
  title: "Student Art Gallery - Inspiring Artwork | ArtLearn Hub", 
  description: "Explore amazing artwork created by our learning community. Get inspired by student creations across all skill levels and artistic mediums.",
  keywords: "student art gallery, art inspiration, student artwork, art community, creative showcase",
  ogTitle: "Student Art Gallery - ArtLearn Hub",
  ogDescription: "Explore amazing artwork created by our learning community. Get inspired by student creations across all skill levels and artistic mediums.",
  twitterTitle: "Student Art Gallery - ArtLearn Hub", 
  twitterDescription: "Explore amazing artwork created by our learning community. Get inspired by student creations across all skill levels and artistic mediums.",
};

export function generateResourceSEO(title: string, description: string, skillLevel: string): SEOData {
  return {
    title: `${title} - ${skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)} Art Tutorial | ArtLearn Hub`,
    description: description,
    keywords: `${title.toLowerCase()}, ${skillLevel} art, art tutorial, art education`,
    ogTitle: `${title} - ${skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)} Art Tutorial`,
    ogDescription: description,
    twitterTitle: `${title} - ${skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)} Art Tutorial`,
    twitterDescription: description,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": title,
      "description": description,
      "provider": {
        "@type": "Organization", 
        "name": "ArtLearn Hub"
      },
      "educationalLevel": skillLevel,
      "teaches": title
    }
  };
}

export function generateSkillLevelSEO(level: string, title: string, description: string): SEOData {
  return {
    title: `${title} - Art Education Path | ArtLearn Hub`,
    description: `${description} Explore our structured ${level} learning path with curated resources and guided progression.`,
    keywords: `${level} art, art education, ${level} drawing, ${level} painting, art skill development`,
    ogTitle: `${title} - Art Education Path`,
    ogDescription: `${description} Explore our structured ${level} learning path with curated resources and guided progression.`,
    twitterTitle: `${title} - Art Education Path`,
    twitterDescription: `${description} Explore our structured ${level} learning path with curated resources and guided progression.`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      "name": title,
      "description": description,
      "educationalLevel": level,
      "provider": {
        "@type": "Organization",
        "name": "ArtLearn Hub"
      }
    }
  };
}
