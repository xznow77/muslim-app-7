import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // painting, drawing, digital, sculpture, etc.
  skillLevel: text("skill_level").notNull(), // beginner, intermediate, advanced
  duration: text("duration").notNull(), // "2.5 hours"
  rating: text("rating").notNull(), // "4.8"
  imageUrl: text("image_url").notNull(),
  tags: text("tags").array().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  popular: boolean("popular").notNull().default(false),
  metadata: jsonb("metadata"), // Additional SEO and content metadata
});

export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  skillLevel: text("skill_level").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description"),
});

export const skillLevelPaths = pgTable("skill_level_paths", {
  id: serial("id").primaryKey(),
  level: text("level").notNull(), // beginner, intermediate, advanced
  title: text("title").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  color: text("color").notNull(), // CSS color class
  icon: text("icon").notNull(), // Font Awesome icon class
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
});

export const insertGalleryItemSchema = createInsertSchema(galleryItems).omit({
  id: true,
});

export const insertSkillLevelPathSchema = createInsertSchema(skillLevelPaths).omit({
  id: true,
});

export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;

export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;
export type GalleryItem = typeof galleryItems.$inferSelect;

export type InsertSkillLevelPath = z.infer<typeof insertSkillLevelPathSchema>;
export type SkillLevelPath = typeof skillLevelPaths.$inferSelect;
