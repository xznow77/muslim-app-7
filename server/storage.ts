import { 
  resources, 
  galleryItems, 
  skillLevelPaths,
  type Resource, 
  type InsertResource,
  type GalleryItem,
  type InsertGalleryItem,
  type SkillLevelPath,
  type InsertSkillLevelPath
} from "@shared/schema";

export interface IStorage {
  // Resources
  getResources(): Promise<Resource[]>;
  getFeaturedResources(): Promise<Resource[]>;
  getResourcesByCategory(category: string): Promise<Resource[]>;
  getResourcesBySkillLevel(skillLevel: string): Promise<Resource[]>;
  searchResources(query: string): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;

  // Gallery
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemsByCategory(category: string): Promise<GalleryItem[]>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;

  // Skill Level Paths
  getSkillLevelPaths(): Promise<SkillLevelPath[]>;
  getSkillLevelPath(level: string): Promise<SkillLevelPath | undefined>;
}

export class MemStorage implements IStorage {
  private resources: Map<number, Resource>;
  private galleryItems: Map<number, GalleryItem>;
  private skillLevelPaths: Map<string, SkillLevelPath>;
  private currentResourceId: number;
  private currentGalleryId: number;

  constructor() {
    this.resources = new Map();
    this.galleryItems = new Map();
    this.skillLevelPaths = new Map();
    this.currentResourceId = 1;
    this.currentGalleryId = 1;
    this.initializeData();
  }

  private initializeData() {
    // Initialize skill level paths
    const skillPaths: InsertSkillLevelPath[] = [
      {
        level: "beginner",
        title: "Beginner Level",
        description: "Perfect for those starting their artistic journey",
        features: [
          "Basic drawing fundamentals",
          "Color theory essentials", 
          "Tool selection and care",
          "Simple composition rules"
        ],
        color: "success",
        icon: "fas fa-seedling"
      },
      {
        level: "intermediate", 
        title: "Intermediate Level",
        description: "Expand your skills with advanced techniques",
        features: [
          "Advanced shading and lighting",
          "Complex composition techniques",
          "Mixed media exploration", 
          "Style development"
        ],
        color: "accent",
        icon: "fas fa-chart-line"
      },
      {
        level: "advanced",
        title: "Advanced Level", 
        description: "Master professional techniques and concepts",
        features: [
          "Professional portfolio development",
          "Advanced digital techniques",
          "Art business and marketing",
          "Master class techniques"
        ],
        color: "yellow-600",
        icon: "fas fa-crown"
      }
    ];

    skillPaths.forEach(path => {
      const skillPath: SkillLevelPath = { ...path, id: this.skillLevelPaths.size + 1 };
      this.skillLevelPaths.set(path.level, skillPath);
    });

    // Initialize sample resources
    const sampleResources: InsertResource[] = [
      {
        title: "Watercolor Fundamentals",
        description: "Learn the essential techniques of watercolor painting from color mixing to brush control.",
        category: "painting",
        skillLevel: "beginner",
        duration: "2.5 hours",
        rating: "4.8",
        imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        tags: ["watercolor", "fundamentals", "basics"],
        featured: true,
        popular: true,
        metadata: {
          seoTitle: "Watercolor Fundamentals - Beginner Art Tutorial",
          seoDescription: "Master watercolor painting basics with our comprehensive beginner tutorial covering color mixing, brush techniques, and essential skills."
        }
      },
      {
        title: "Advanced Shading Techniques", 
        description: "Master light, shadow, and form to create realistic three-dimensional drawings.",
        category: "drawing",
        skillLevel: "intermediate",
        duration: "3.2 hours",
        rating: "4.9",
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        tags: ["shading", "light", "shadow", "3d"],
        featured: true,
        popular: true,
        metadata: {
          seoTitle: "Advanced Shading Techniques - Intermediate Drawing Course",
          seoDescription: "Learn professional shading techniques to create realistic three-dimensional drawings with proper light and shadow."
        }
      },
      {
        title: "Digital Art Mastery",
        description: "Comprehensive guide to digital painting tools, techniques, and professional workflows.",
        category: "digital",
        skillLevel: "advanced", 
        duration: "4.1 hours",
        rating: "4.7",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        tags: ["digital", "painting", "professional", "workflow"],
        featured: true,
        popular: false,
        metadata: {
          seoTitle: "Digital Art Mastery - Professional Digital Painting Course",
          seoDescription: "Master digital painting with professional tools, techniques, and workflows used by industry artists."
        }
      },
      {
        title: "Art Supplies Guide",
        description: "Everything you need to know about choosing the right tools for your artistic medium.",
        category: "supplies",
        skillLevel: "beginner",
        duration: "1.8 hours", 
        rating: "4.6",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        tags: ["supplies", "tools", "guide", "equipment"],
        featured: true,
        popular: false,
        metadata: {
          seoTitle: "Complete Art Supplies Guide - Choose the Right Tools",
          seoDescription: "Comprehensive guide to selecting the perfect art supplies and tools for every medium and skill level."
        }
      },
      {
        title: "Portrait Drawing Secrets",
        description: "Capture likeness and expression with professional portrait drawing techniques.",
        category: "drawing",
        skillLevel: "intermediate",
        duration: "2.9 hours",
        rating: "4.8", 
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        tags: ["portrait", "drawing", "likeness", "expression"],
        featured: true,
        popular: true,
        metadata: {
          seoTitle: "Portrait Drawing Secrets - Professional Portrait Techniques",
          seoDescription: "Learn professional portrait drawing techniques to capture perfect likeness and authentic expression."
        }
      },
      {
        title: "Abstract Expressionism",
        description: "Explore non-representational art and develop your unique creative voice.",
        category: "painting",
        skillLevel: "advanced",
        duration: "3.7 hours",
        rating: "4.9",
        imageUrl: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", 
        tags: ["abstract", "expressionism", "creative", "style"],
        featured: true,
        popular: false,
        metadata: {
          seoTitle: "Abstract Expressionism - Develop Your Artistic Voice",
          seoDescription: "Explore abstract expressionism techniques and develop your unique creative voice in non-representational art."
        }
      }
    ];

    sampleResources.forEach(resource => {
      const resourceItem: Resource = { ...resource, id: this.currentResourceId++ };
      this.resources.set(resourceItem.id, resourceItem);
    });

    // Initialize sample gallery items
    const sampleGalleryItems: InsertGalleryItem[] = [
      {
        title: "Mountain Serenity",
        artist: "Sarah M.",
        skillLevel: "beginner", 
        category: "painting",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
        description: "Beautiful watercolor landscape"
      },
      {
        title: "Self Portrait Study",
        artist: "Michael R.",
        skillLevel: "intermediate",
        category: "drawing", 
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        description: "Detailed charcoal portrait"
      },
      {
        title: "Cosmic Dreams",
        artist: "Alex K.",
        skillLevel: "advanced",
        category: "digital",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=900",
        description: "Digital art masterpiece"
      },
      {
        title: "Color Symphony", 
        artist: "Emma L.",
        skillLevel: "intermediate",
        category: "painting",
        imageUrl: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
        description: "Abstract acrylic painting"
      },
      {
        title: "Urban Geometry",
        artist: "David W.",
        skillLevel: "advanced", 
        category: "drawing",
        imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
        description: "Architectural sketch"
      },
      {
        title: "Nature's Collage",
        artist: "Lisa T.",
        skillLevel: "intermediate",
        category: "mixed",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        description: "Mixed media artwork"
      }
    ];

    sampleGalleryItems.forEach(item => {
      const galleryItem: GalleryItem = { ...item, id: this.currentGalleryId++ };
      this.galleryItems.set(galleryItem.id, galleryItem);
    });
  }

  async getResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getFeaturedResources(): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(resource => resource.featured);
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(resource => resource.category === category);
  }

  async getResourcesBySkillLevel(skillLevel: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(resource => resource.skillLevel === skillLevel);
  }

  async searchResources(query: string): Promise<Resource[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.resources.values()).filter(resource => 
      resource.title.toLowerCase().includes(lowerQuery) ||
      resource.description.toLowerCase().includes(lowerQuery) ||
      resource.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  async getResource(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.currentResourceId++;
    const resource: Resource = { ...insertResource, id };
    this.resources.set(id, resource);
    return resource;
  }

  async getGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values());
  }

  async getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values()).filter(item => item.category === category);
  }

  async createGalleryItem(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    const id = this.currentGalleryId++;
    const item: GalleryItem = { ...insertItem, id };
    this.galleryItems.set(id, item);
    return item;
  }

  async getSkillLevelPaths(): Promise<SkillLevelPath[]> {
    return Array.from(this.skillLevelPaths.values());
  }

  async getSkillLevelPath(level: string): Promise<SkillLevelPath | undefined> {
    return this.skillLevelPaths.get(level);
  }
}

export const storage = new MemStorage();
