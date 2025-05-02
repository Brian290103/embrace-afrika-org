"use server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { events, gallery } from "@/db/schema"; // Import the events and gallery schema

// Get all events
export const getEvents = async () => {
  try {
    const eventsData = await db
      .select({
        id: events.id,
        slug: events.slug,
        title: events.title,
        caption: events.caption,
        content: events.content,
        eventDate: events.eventDate,
        featuredImageUrl: events.featuredImageUrl,
        eventLocation: events.eventLocation,
        createdAt: events.createdAt,
        gallery: sql`
          (
            SELECT COALESCE(
              json_agg(
                json_build_object(
                  'id', ${gallery.id},
                  'title', ${gallery.title},
                  'caption', ${gallery.caption},
                  'mediaUrl', ${gallery.mediaUrl},
                  'type', ${gallery.type}
                )
              ), '[]'::json
            )
            FROM ${gallery}
            WHERE ${gallery.eventId} = ${events.id}
          )
        `.as("gallery"),
      })
      .from(events);
    return eventsData;
  } catch (error: any) {
    console.error("Error fetching events:", error);
    throw new Error(`Failed to fetch events: ${error.message}`); // Improved error handling
  }
};

// Get a single event by slug
export const getEventBySlug = async (slug: string) => {
  try {
    const eventData = await db
      .select({
        id: events.id,
        slug: events.slug,
        title: events.title,
        caption: events.caption,
        content: events.content,
        eventDate: events.eventDate,
        featuredImageUrl: events.featuredImageUrl,
        eventLocation: events.eventLocation,
        createdAt: events.createdAt,
        gallery: sql`
          (
            SELECT COALESCE(
              json_agg(
                json_build_object(
                  'id', ${gallery.id},
                  'title', ${gallery.title},
                  'caption', ${gallery.caption},
                  'mediaUrl', ${gallery.mediaUrl},
                  'type', ${gallery.type}
                )
              ), '[]'::json
            )
            FROM ${gallery}
            WHERE ${gallery.eventId} = ${events.id}
          )
        `.as("gallery"),
      })
      .from(events)
      .where(eq(events.slug, slug))
      .limit(1);

    if (!eventData || eventData.length === 0) {
      return null;
    }
    return eventData[0];
  } catch (error: any) {
    console.error("Error fetching event by slug:", error);
    throw new Error(`Failed to fetch event: ${error.message}`);
  }
};
