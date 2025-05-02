import {
  boolean,
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

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

export const eventRegistrations = pgTable("event_registrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }), // Foreign key to events table
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  dateOfBirth: date("date_of_birth"),
  heightCm: text("height_cm"), // Changed to text to handle non-numeric input if needed
  country: text("country").notNull(),
  city: text("city").notNull(),
  address: text("address").notNull(),
  instagramProfile: text("instagram_profile"),
  profileImage1: text("profile_image_1"),
  profileImage2: text("profile_image_2"),
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

export const schema = { user, session, account, verification };
