"use server";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { events } from "@/db/schema"; // Import the events schema
import { slugify } from "@/lib/utils"; // Import the slugify function

// Get all events
export const getEvents = async () => {
  try {
    const eventsData = await db
      .select()
      .from(events)
      .orderBy(sql`event_date ASC`); // Order by event_date ascending
    return eventsData;
  } catch (error: any) {
    console.error("Error fetching events:", error);
    throw new Error(`Failed to fetch events: ${error.message}`);
  }
};

// Get a single event by slug
export const getEventBySlug = async (slug: string) => {
  try {
    const event = await db
      .select()
      .from(events)
      .where(eq(events.slug, slug))
      .limit(1);
    if (!event || event.length === 0) {
      return null; // Or throw an error, depending on your needs
    }
    return event[0];
  } catch (error: any) {
    console.error("Error fetching event by slug:", error);
    throw new Error(`Failed to fetch event: ${error.message}`);
  }
};

// Get a single event by ID
export const getEventById = async (id: string) => {
  try {
    const event = await db
      .select()
      .from(events)
      .where(eq(events.id, id))
      .limit(1);
    if (!event || event.length === 0) {
      return null;
    }
    return event[0];
  } catch (error: any) {
    console.error("Error fetching event by id:", error);
    throw new Error(`Failed to fetch event: ${error.message}`);
  }
};

// Add a new event
export const addEvent = async (
  title: string,
  caption: string,
  content: string,
  slug: string,
  eventDate: Date,
  eventLocation: string,
  featuredImageUrl?: string, // Optional
) => {
  try {
    await db.insert(events).values({
      title,
      caption,
      content,
      slug: slug, // Use the slugified title
      eventDate,
      eventLocation,
      featuredImageUrl,
    });
    revalidatePath("/admin/events"); // Revalidate the appropriate path
    revalidatePath("/");
  } catch (error: any) {
    console.error("Error adding event:", error);
    throw new Error(`Failed to add event: ${error.message}`);
  }
};

// Delete an event by ID
export const deleteEvent = async (id: string) => {
  try {
    await db.delete(events).where(eq(events.id, id));
    revalidatePath("/admin/events");
    revalidatePath("/");
  } catch (error: any) {
    console.error("Error deleting event:", error);
    throw new Error(`Failed to delete event: ${error.message}`);
  }
};

// Update an existing event
export const updateEvent = async (
  id: string,
  updates: {
    title?: string;
    caption?: string;
    content?: string;
    slug?: string;
    eventDate?: Date;
    eventLocation?: string;
    featuredImageUrl?: string;
  },
) => {
  try {
    let finalSlug = updates.slug;
    if (updates.title && !updates.slug) {
      finalSlug = slugify(updates.title);
    }
    const updatedData = { ...updates, slug: finalSlug };
    await db.update(events).set(updatedData).where(eq(events.id, id));
    revalidatePath("/");
    revalidatePath(`/events/${finalSlug}`);
  } catch (error: any) {
    console.error("Error updating event:", error);
    throw new Error(`Failed to update event: ${error.message}`);
  }
};
