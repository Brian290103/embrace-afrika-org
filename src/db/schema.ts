import {
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const sponsors = pgTable("sponsors", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  websiteUrl: text("website_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export const news = pgTable("news", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  caption: text("caption").notNull(),
  slug: text("slug").notNull().unique(),
  featuredImageUrl: text("featured_image_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export const countries = pgTable("countries", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  flagUrl: text("flag_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export const visits = pgTable("visits", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  caption: text("caption").notNull(),
  content: text("content").notNull(),
  slug: text("slug").notNull().unique(),
  placeOfVisit: text("place_of_visit").notNull(),
  featuredImageUrl: text("featured_image_url"),
  dateOfVisit: date("date_of_visit").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  caption: text("caption").notNull(),
  content: text("content").notNull(),
  eventDate: date("event_date").notNull(),
  featuredImageUrl: text("featured_image_url"),
  eventLocation: text("event_location").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export const models = pgTable("models", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  countryId: uuid("country_id")
    .notNull()
    .references(() => countries.id, { onDelete: "restrict" }), // Foreign key to countries table
  slug: text("slug").notNull().unique(),
  featuredProfileImageUrl: text("featured_profile_image_url"),
  bio: text("bio"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export const pageantExperiences = pgTable("pageant_experiences", {
  id: uuid("id").primaryKey().defaultRandom(),
  modelId: uuid("model_id")
    .notNull()
    .references(() => models.id, { onDelete: "cascade" }), // Foreign key to models table
  eventName: text("event_name").notNull(),
  location: text("location").notNull(),
  eventDate: date("event_date").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export const mediaTypeEnum = pgEnum("media_type", ["image", "video"]);

export const gallery = pgTable("gallery", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  caption: text("caption").notNull(),
  mediaUrl: text("media_url").notNull(),
  type: mediaTypeEnum("type").notNull(),
  modelId: uuid("model_id").references(() => models.id, {
    onDelete: "set null",
  }),
  eventId: uuid("event_id").references(() => events.id, {
    onDelete: "set null",
  }),
  visitsId: uuid("visits_id").references(() => visits.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

// New table for testimonies
export const testimonies = pgTable("testimonies", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull(),
  occupation: text("occupation").notNull(),
  message: text("message").notNull(),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});
