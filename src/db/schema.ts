import { text, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const news = pgTable("news", {
    id: uuid("id").primaryKey().defaultRandom(), // Use uuid and gen_random_uuid()
    title: text("title").notNull(),
    content: text("content").notNull(),
    caption: text("caption").notNull(), // Make caption not null
    slug: text("slug").notNull().unique(),
    featuredImageUrl: text("featured_image_url"),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .default(sql`now()`),
});
