import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Adhkar (Islamic Remembrance) Table
export const adhkar = pgTable("adhkar", {
  id: serial("id").primaryKey(),
  arabicText: text("arabic_text").notNull(),
  transliteration: text("transliteration"),
  translation: text("translation").notNull(),
  category: text("category").notNull(), // morning, evening, after_prayer, before_sleep, travel, food, etc.
  source: text("source").notNull(), // Quran or Hadith reference
  repetitions: integer("repetitions").default(1),
  benefits: text("benefits"),
  tags: text("tags").array().notNull().default([]),
});

// Beautiful Names of Allah (Asma ul Husna)
export const asmaUlHusna = pgTable("asma_ul_husna", {
  id: serial("id").primaryKey(),
  arabicName: text("arabic_name").notNull(),
  transliteration: text("transliteration").notNull(),
  meaning: text("meaning").notNull(),
  explanation: text("explanation").notNull(),
  order: integer("order").notNull(), // 1-99
  benefits: text("benefits"),
  quranicReferences: text("quranic_references").array().default([]),
});

// Quran Verses
export const quranVerses = pgTable("quran_verses", {
  id: serial("id").primaryKey(),
  surahNumber: integer("surah_number").notNull(),
  surahName: text("surah_name").notNull(),
  surahNameArabic: text("surah_name_arabic").notNull(),
  verseNumber: integer("verse_number").notNull(),
  arabicText: text("arabic_text").notNull(),
  translation: text("translation").notNull(),
  transliteration: text("transliteration"),
  revelationType: text("revelation_type"), // meccan or medinan
  juz: integer("juz"),
  page: integer("page"),
});

// Prayer Times
export const prayerTimes = pgTable("prayer_times", {
  id: serial("id").primaryKey(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  latitude: text("latitude"),
  longitude: text("longitude"),
  fajr: text("fajr").notNull(),
  sunrise: text("sunrise").notNull(),
  dhuhr: text("dhuhr").notNull(),
  asr: text("asr").notNull(),
  maghrib: text("maghrib").notNull(),
  isha: text("isha").notNull(),
  date: text("date").notNull(),
  hijriDate: text("hijri_date"),
});

// Islamic Calendar Events
export const islamicEvents = pgTable("islamic_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleArabic: text("title_arabic"),
  description: text("description").notNull(),
  hijriDate: text("hijri_date").notNull(),
  gregorianDate: text("gregorian_date"),
  category: text("category").notNull(), // religious, historical, cultural
  significance: text("significance"),
  isRecurring: boolean("is_recurring").default(false),
});

// User Preferences and Settings
export const userSettings = pgTable("user_settings", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  prayerNotifications: boolean("prayer_notifications").default(true),
  adhkarReminders: boolean("adhkar_reminders").default(true),
  preferredQari: text("preferred_qari").default("mishary"),
  darkMode: boolean("dark_mode").default(false),
  language: text("language").default("ar"), // ar, en, fr, tr, etc.
  location: jsonb("location"), // {latitude, longitude, city, country}
  prayerMethod: integer("prayer_method").default(2), // calculation method
  favoriteAdhkar: text("favorite_adhkar").array().default([]),
  tasbihCount: integer("tasbih_count").default(0),
  dailyAdhkarGoal: integer("daily_adhkar_goal").default(100),
});

// Tasbih Counter
export const tasbihSessions = pgTable("tasbih_sessions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  dhikrText: text("dhikr_text").notNull(),
  count: integer("count").notNull(),
  targetCount: integer("target_count").default(33),
  startTime: timestamp("start_time").defaultNow(),
  endTime: timestamp("end_time"),
  completed: boolean("completed").default(false),
});

// Create insert schemas
export const insertAdhkarSchema = createInsertSchema(adhkar).omit({ id: true });
export const insertAsmaUlHusnaSchema = createInsertSchema(asmaUlHusna).omit({ id: true });
export const insertQuranVerseSchema = createInsertSchema(quranVerses).omit({ id: true });
export const insertPrayerTimesSchema = createInsertSchema(prayerTimes).omit({ id: true });
export const insertIslamicEventSchema = createInsertSchema(islamicEvents).omit({ id: true });
export const insertUserSettingsSchema = createInsertSchema(userSettings).omit({ id: true });
export const insertTasbihSessionSchema = createInsertSchema(tasbihSessions).omit({ id: true });

// Types
export type Adhkar = typeof adhkar.$inferSelect;
export type InsertAdhkar = z.infer<typeof insertAdhkarSchema>;

export type AsmaUlHusna = typeof asmaUlHusna.$inferSelect;
export type InsertAsmaUlHusna = z.infer<typeof insertAsmaUlHusnaSchema>;

export type QuranVerse = typeof quranVerses.$inferSelect;
export type InsertQuranVerse = z.infer<typeof insertQuranVerseSchema>;

export type PrayerTimes = typeof prayerTimes.$inferSelect;
export type InsertPrayerTimes = z.infer<typeof insertPrayerTimesSchema>;

export type IslamicEvent = typeof islamicEvents.$inferSelect;
export type InsertIslamicEvent = z.infer<typeof insertIslamicEventSchema>;

export type UserSettings = typeof userSettings.$inferSelect;
export type InsertUserSettings = z.infer<typeof insertUserSettingsSchema>;

export type TasbihSession = typeof tasbihSessions.$inferSelect;
export type InsertTasbihSession = z.infer<typeof insertTasbihSessionSchema>;
