"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { visits } from "@/db/schema"; // Import the visits schema
import { slugify } from "@/lib/utils"; // Import the slugify function

// Visits Actions
export const getVisits = async () => {
  try {
    const visitsData = await db.select().from(visits);
    return visitsData;
  } catch (error: any) {
    console.error("Error fetching visits:", error);
    throw new Error(`Failed to fetch visits: ${error.message}`);
  }
};

export const getVisitsBySlug = async (slug: string) => {
  try {
    const visit = await db
      .select()
      .from(visits)
      .where(eq(visits.slug, slug))
      .limit(1);
    if (!visit || visit.length === 0) {
      return null;
    }
    return visit[0];
  } catch (error: any) {
    console.error("Error fetching visit by slug:", error);
    throw new Error(`Failed to fetch visit: ${error.message}`);
  }
};

export const getVisitsById = async (id: string) => {
  try {
    const visit = await db
      .select()
      .from(visits)
      .where(eq(visits.id, id))
      .limit(1);
    if (!visit || visit.length === 0) {
      return null;
    }
    return visit[0];
  } catch (error: any) {
    console.error("Error fetching visit by id:", error);
    throw new Error(`Failed to fetch visit: ${error.message}`);
  }
};

export const addVisits = async (
  title: string,
  caption: string,
  content: string,
  slug: string,
  placeOfVisit: string,
  dateOfVisit: Date,
  featuredImageUrl?: string,
) => {
  try {
    await db.insert(visits).values({
      title,
      caption,
      content,
      slug,
      placeOfVisit,
      dateOfVisit,
      featuredImageUrl,
    });
    revalidatePath("/admin/visits");
    revalidatePath("/");
  } catch (error: any) {
    console.error("Error adding visit:", error);
    throw new Error(`Failed to add visit: ${error.message}`);
  }
};

export const updateVisits = async (
  id: string,
  updates: {
    title?: string;
    caption?: string;
    content?: string;
    slug?: string;
    placeOfVisit?: string;
    dateOfVisit?: Date;
    featuredImageUrl?: string;
  },
) => {
  try {
    let finalSlug = updates.slug;
    if (updates.title && !updates.slug) {
      finalSlug = slugify(updates.title);
    }
    const updatedData = { ...updates, slug: finalSlug };
    await db.update(visits).set(updatedData).where(eq(visits.id, id));
    revalidatePath("/");
    revalidatePath(`/visits/${finalSlug}`);
  } catch (error: any) {
    console.error("Error updating visit:", error);
    throw new Error(`Failed to update visit: ${error.message}`);
  }
};

export const deleteVisits = async (id: string) => {
  console.log("reached");
  try {
    await db.delete(visits).where(eq(visits.id, id));
    revalidatePath("/admin/visits");
    revalidatePath("/");
  } catch (error: any) {
    console.error("Error deleting visit:", error);
    throw new Error(`Failed to delete visit: ${error.message}`);
  }
};
