import { useEffect } from 'react';
import type { SEOData } from '@/lib/seo';

interface SEOHeadProps {
  seo: SEOData;
}

export function SEOHead({ seo }: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = seo.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', seo.description);
    if (seo.keywords) {
      updateMetaTag('keywords', seo.keywords);
    }

    // Open Graph tags
    updateMetaTag('og:title', seo.ogTitle || seo.title, true);
    updateMetaTag('og:description', seo.ogDescription || seo.description, true);
    updateMetaTag('og:type', seo.ogType || 'website', true);
    
    if (typeof window !== 'undefined') {
      updateMetaTag('og:url', seo.canonical || window.location.href, true);
    }
    
    if (seo.ogImage) {
      updateMetaTag('og:image', seo.ogImage, true);
    }

    // Twitter tags
    updateMetaTag('twitter:card', seo.twitterCard || 'summary_large_image', true);
    updateMetaTag('twitter:title', seo.twitterTitle || seo.title, true);
    updateMetaTag('twitter:description', seo.twitterDescription || seo.description, true);
    
    if (seo.twitterImage || seo.ogImage) {
      updateMetaTag('twitter:image', seo.twitterImage || seo.ogImage!, true);
    }

    // Canonical URL
    if (seo.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = seo.canonical;
    }

    // Structured data
    if (seo.structuredData) {
      let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.type = 'application/ld+json';
        document.head.appendChild(structuredDataScript);
      }
      structuredDataScript.textContent = JSON.stringify(seo.structuredData);
    }
  }, [seo]);

  return null;
}
