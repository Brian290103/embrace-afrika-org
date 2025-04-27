"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { news } from "@/db/schema"; // Import the news schema
import { slugify } from "@/lib/utils"; // Import the slugify function

// Get all news items
export const getNews = async () => {
    try {
        const newsItems = await db.select().from(news);
        return newsItems;
    } catch (error: any) {
        console.error("Error fetching news:", error);
        throw new Error(`Failed to fetch news: ${error.message}`); // Improved error handling
    }
};

// Get a single news item by slug
export const getNewsBySlug = async (slug: string) => {
    try {
        const newsItem = await db.select().from(news).where(eq(news.slug, slug)).limit(1);
        if (!newsItem || newsItem.length === 0) {
            return null; // Or throw an error, depending on your needs
        }
        return newsItem[0];
    } catch (error: any) {
        console.error("Error fetching news by slug:", error);
        throw new Error(`Failed to fetch news: ${error.message}`);
    }
};

// Get a single news item by ID
export const getNewsById = async (id: string) => {
    try {
        const newsItem = await db.select().from(news).where(eq(news.id, id)).limit(1);
        if (!newsItem || newsItem.length === 0) {
            return null;
        }
        return newsItem[0];
    } catch (error: any) {
        console.error("Error fetching news by id:", error);
        throw new Error(`Failed to fetch news: ${error.message}`);
    }
};

// Add a new news item
export const addNews = async (
    title: string,
    content: string,
    caption: string,
    slug: string,
    featuredImageUrl?: string, // Optional
    publishedAt?: Date
) => {
    try {

        await db.insert(news).values({
            title,
            content,
            caption,
            slug, // Use the slugified title
            featuredImageUrl,
            publishedAt,
        });
        revalidatePath("/admin/news"); // Revalidate the appropriate path
        revalidatePath("/");
    } catch (error: any) {
        console.error("Error adding news:", error);
        throw new Error(`Failed to add news: ${error.message}`);
    }
};

// Delete a news item by ID
export const deleteNews = async (id: string) => {
    try {
        await db.delete(news).where(eq(news.id, id));
        revalidatePath("/admin/news");
        revalidatePath("/");
    } catch (error: any) {
        console.error("Error deleting news:", error);
        throw new Error(`Failed to delete news: ${error.message}`);
    }
};

// Update an existing news item
export const updateNews = async (
    id: string,
    updates: {
        title?: string;
        content?: string;
        caption?: string;
        slug?: string;
        featuredImageUrl?: string;
        publishedAt?: Date;
    }
) => {
    try {
        let finalSlug = updates.slug;
        if (updates.title && !updates.slug) {
            finalSlug = slugify(updates.title);
        }
        const updatedData = { ...updates, slug: finalSlug };


        await db.update(news).set(updatedData).where(eq(news.id, id));
        revalidatePath("/");
        revalidatePath(`/news/${updates.slug}`);
    } catch (error: any) {
        console.error("Error updating news:", error);
        throw new Error(`Failed to update news: ${error.message}`);
    }
};
