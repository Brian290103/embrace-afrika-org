"use server";
import { and, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { gallery } from "@/db/schema";

// Get all gallery items
export const getGallery = async () => {
  try {
    const galleryItems = await db.select().from(gallery);
    return galleryItems;
  } catch (error: any) {
    console.error("Error fetching gallery:", error);
    throw new Error(`Failed to fetch gallery: ${error.message}`);
  }
};

// Get a single gallery item by ID.  Slugs are not relevant for gallery items in the same way as News.
export const getGalleryById = async (id: string) => {
  try {
    const galleryItem = await db
      .select()
      .from(gallery)
      .where(eq(gallery.id, id))
      .limit(1);
    if (!galleryItem || galleryItem.length === 0) {
      return null;
    }
    return galleryItem[0];
  } catch (error: any) {
    console.error("Error fetching gallery by id:", error);
    throw new Error(`Failed to fetch gallery item: ${error.message}`);
  }
};

// Add a new gallery item
export const addGallery = async (
  title: string,
  caption: string,
  mediaUrl: string,
  type: "image" | "video",
  modelId?: string | null,
  eventId?: string | null,
  visitsId?: string | null,
) => {
  try {
    await db.insert(gallery).values({
      title,
      caption,
      mediaUrl,
      type,
      modelId,
      eventId,
      visitsId,
    });
    revalidatePath("/admin/gallery");
    revalidatePath("/");
    visitsId && revalidatePath(`/admin/visits/${visitsId}`);
  } catch (error: any) {
    console.error("Error adding gallery item:", error);
    throw new Error(`Failed to add gallery item: ${error.message}`);
  }
};

// Delete a gallery item
export const deleteGallery = async (id: string) => {
  try {
    await db.delete(gallery).where(eq(gallery.id, id));
    revalidatePath("/admin/gallery");
    revalidatePath("/");
  } catch (error: any) {
    console.error("Error deleting gallery item:", error);
    throw new Error(`Failed to delete gallery item: ${error.message}`);
  }
};

// Update an existing gallery item
export const updateGallery = async (
  id: string,
  updates: {
    title?: string;
    caption?: string;
    mediaUrl?: string;
    type?: "image" | "video";
    modelId?: string | null;
    eventId?: string | null;
    visitsId?: string | null;
  },
) => {
  try {
    await db.update(gallery).set(updates).where(eq(gallery.id, id));
    revalidatePath("/admin/gallery");
    revalidatePath("/");
  } catch (error: any) {
    console.error("Error updating gallery item:", error);
    throw new Error(`Failed to update gallery item: ${error.message}`);
  }
};

/**
 * Retrieves gallery items based on the specified relation.
 *
 * @param type The type of gallery item ('image' or 'video').
 * @param relationName The name of the relation ('modelId', 'eventId', or 'visitsId').
 * @param relationId The ID of the related entity.
 * @returns An array of gallery items matching the criteria.
 * @throws Error if an invalid relation name is provided.
 */
export const getGalleryByRelationAndType = async (
  type: "image" | "video",
  relationName: "model" | "event" | "visit",
  relationId: string,
) => {
  try {
    let whereClause;
    switch (relationName) {
      case "model":
        whereClause = eq(gallery.modelId, relationId);
        break;
      case "event":
        whereClause = eq(gallery.eventId, relationId);
        break;
      case "visit":
        whereClause = eq(gallery.visitsId, relationId);
        break;
      default:
        throw new Error(`Invalid relation name: ${relationName}`);
    }

    const galleryItems = await db
      .select()
      .from(gallery)
      .where(
        and(
          eq(gallery.type, type), // type must match
          whereClause, // and relation must match
        ),
      );

    return galleryItems;
  } catch (error: any) {
    console.error(
      `Error fetching gallery by relation (${relationName}):`,
      error,
    );
    throw new Error(
      `Failed to fetch gallery items by relation (${relationName}): ${error.message}`,
    );
  }
};
export const getGalleryByRelation = async (
  relationName: "model" | "event" | "visit",
  relationId: string,
) => {
  try {
    let whereClause;
    switch (relationName) {
      case "model":
        whereClause = eq(gallery.modelId, relationId);
        break;
      case "event":
        whereClause = eq(gallery.eventId, relationId);
        break;
      case "visit":
        whereClause = eq(gallery.visitsId, relationId);
        break;
      default:
        throw new Error(`Invalid relation name: ${relationName}`);
    }

    const galleryItems = await db.select().from(gallery).where(
      and(
        whereClause, // and relation must match
      ),
    );

    return galleryItems;
  } catch (error: any) {
    console.error(
      `Error fetching gallery by relation (${relationName}):`,
      error,
    );
    throw new Error(
      `Failed to fetch gallery items by relation (${relationName}): ${error.message}`,
    );
  }
};

export const getAllGalleryItems = async () => {
  try {
    const galleryItems = await db
      .select()
      .from(gallery)
      .orderBy(desc(gallery.createdAt));
    console.log({ galleryItems });
    return galleryItems;
  } catch (error: any) {
    console.error("Error fetching all gallery items:", error);
    throw new Error(`Failed to fetch all gallery items: ${error.message}`);
  }
};
