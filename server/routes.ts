import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAdhkarSchema, insertTasbihSessionSchema, insertUserSettingsSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Adhkar endpoints
  app.get("/api/adhkar", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let adhkar;
      if (search) {
        adhkar = await storage.searchAdhkar(search as string);
      } else if (category) {
        adhkar = await storage.getAdhkarByCategory(category as string);
      } else {
        adhkar = await storage.getAdhkar();
      }
      
      res.json(adhkar);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch adhkar" });
    }
  });

  app.get("/api/adhkar/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const adhkar = await storage.getAdhkar(id);
      
      if (!adhkar) {
        return res.status(404).json({ message: "Adhkar not found" });
      }
      
      res.json(adhkar);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch adhkar" });
    }
  });

  // Asma ul Husna endpoints
  app.get("/api/asma-ul-husna", async (req, res) => {
    try {
      const { search } = req.query;
      
      let asmaUlHusna;
      if (search) {
        asmaUlHusna = await storage.searchAsmaUlHusna(search as string);
      } else {
        asmaUlHusna = await storage.getAsmaUlHusna();
      }
      
      res.json(asmaUlHusna);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Asma ul Husna" });
    }
  });

  app.get("/api/asma-ul-husna/:order", async (req, res) => {
    try {
      const order = parseInt(req.params.order);
      const asma = await storage.getAsmaUlHusnaByOrder(order);
      
      if (!asma) {
        return res.status(404).json({ message: "Name not found" });
      }
      
      res.json(asma);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Asma" });
    }
  });

  // Prayer Times endpoints
  app.get("/api/prayer-times", async (req, res) => {
    try {
      const { city, date } = req.query;
      
      if (!city || !date) {
        return res.status(400).json({ message: "City and date are required" });
      }
      
      const prayerTimes = await storage.getPrayerTimes(city as string, date as string);
      
      if (!prayerTimes) {
        return res.status(404).json({ message: "Prayer times not found" });
      }
      
      res.json(prayerTimes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prayer times" });
    }
  });

  // Islamic Events endpoints
  app.get("/api/islamic-events", async (req, res) => {
    try {
      const { date, category } = req.query;
      
      let events;
      if (date) {
        events = await storage.getIslamicEventsByDate(date as string);
      } else if (category) {
        events = await storage.getIslamicEventsByCategory(category as string);
      } else {
        events = await storage.getIslamicEvents();
      }
      
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Islamic events" });
    }
  });

  // Tasbih endpoints
  app.get("/api/tasbih/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const sessions = await storage.getTasbihSessions(userId);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tasbih sessions" });
    }
  });

  app.post("/api/tasbih", async (req, res) => {
    try {
      const validatedData = insertTasbihSessionSchema.parse(req.body);
      const session = await storage.createTasbihSession(validatedData);
      res.status(201).json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid tasbih data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create tasbih session" });
    }
  });

  app.put("/api/tasbih/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const session = await storage.updateTasbihSession(id, updates);
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to update tasbih session" });
    }
  });

  // User Settings endpoints
  app.get("/api/settings/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const settings = await storage.getUserSettings(userId);
      
      if (!settings) {
        return res.status(404).json({ message: "User settings not found" });
      }
      
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user settings" });
    }
  });

  app.post("/api/settings", async (req, res) => {
    try {
      const validatedData = insertUserSettingsSchema.parse(req.body);
      const settings = await storage.createUserSettings(validatedData);
      res.status(201).json(settings);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid settings data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user settings" });
    }
  });

  app.put("/api/settings/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const updates = req.body;
      const settings = await storage.updateUserSettings(userId, updates);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user settings" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
