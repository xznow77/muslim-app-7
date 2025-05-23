import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertResourceSchema, insertGalleryItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Resources endpoints
  app.get("/api/resources", async (req, res) => {
    try {
      const { category, skillLevel, search, featured } = req.query;
      
      let resources;
      
      if (search) {
        resources = await storage.searchResources(search as string);
      } else if (featured === "true") {
        resources = await storage.getFeaturedResources();
      } else if (category) {
        resources = await storage.getResourcesByCategory(category as string);
      } else if (skillLevel) {
        resources = await storage.getResourcesBySkillLevel(skillLevel as string);
      } else {
        resources = await storage.getResources();
      }
      
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.get("/api/resources/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const resource = await storage.getResource(id);
      
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      res.json(resource);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resource" });
    }
  });

  app.post("/api/resources", async (req, res) => {
    try {
      const validatedData = insertResourceSchema.parse(req.body);
      const resource = await storage.createResource(validatedData);
      res.status(201).json(resource);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid resource data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create resource" });
    }
  });

  // Gallery endpoints
  app.get("/api/gallery", async (req, res) => {
    try {
      const { category } = req.query;
      
      let items;
      if (category) {
        items = await storage.getGalleryItemsByCategory(category as string);
      } else {
        items = await storage.getGalleryItems();
      }
      
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const validatedData = insertGalleryItemSchema.parse(req.body);
      const item = await storage.createGalleryItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid gallery item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create gallery item" });
    }
  });

  // Skill levels endpoints
  app.get("/api/skill-levels", async (req, res) => {
    try {
      const skillLevels = await storage.getSkillLevelPaths();
      res.json(skillLevels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skill levels" });
    }
  });

  app.get("/api/skill-levels/:level", async (req, res) => {
    try {
      const level = req.params.level;
      const skillLevel = await storage.getSkillLevelPath(level);
      
      if (!skillLevel) {
        return res.status(404).json({ message: "Skill level not found" });
      }
      
      res.json(skillLevel);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skill level" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
