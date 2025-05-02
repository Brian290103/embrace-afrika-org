"use server";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { db } from "@/db/drizzle";
import { pageantExperiences } from "@/db/schema"; // Import the pageantExperiences schema
import { PageantExperience } from "@/typings"; // Import the PageantExperience type

const PAGEANT_EXPERIENCES_TAG = "pageant-experiences";

// Get a single pageant experience by ID
export const getPageantExperienceById = async (
  id: string,
): Promise<PageantExperience | null> => {
  try {
    const experience = await db
      .select()
      .from(pageantExperiences)
      .where(eq(pageantExperiences.id, id))
      .limit(1);
    if (!experience) {
      return null;
    }
    return experience[0];
  } catch (error: any) {
    console.error("Error fetching pageant experience by ID:", error);
    throw new Error(
      `Failed to fetch pageant experience by ID: ${error.message}`,
    );
  }
};

// Add a new pageant experience
export const addPageantExperience = async (
  modelId: string,
  eventName: string,
  location: string,
  eventDate: string,
) => {
  try {
    await db.insert(pageantExperiences).values({
      modelId,
      eventName,
      location,
      eventDate,
    });
    revalidateTag(PAGEANT_EXPERIENCES_TAG); // Revalidate by tag
  } catch (error: any) {
    console.error("Error adding pageant experience:", error);
    throw new Error(`Failed to add pageant experience: ${error.message}`);
  }
};

// Update an existing pageant experience
export const updatePageantExperience = async (
  id: string,
  updates: Partial<Omit<PageantExperience, "id" | "createdAt">>,
) => {
  try {
    await db
      .update(pageantExperiences)
      .set(updates)
      .where(eq(pageantExperiences.id, id));
    revalidateTag(PAGEANT_EXPERIENCES_TAG); // Revalidate by tag
  } catch (error: any) {
    console.error("Error updating pageant experience:", error);
    throw new Error(`Failed to update pageant experience: ${error.message}`);
  }
};

// Delete a pageant experience
export const deletePageantExperience = async (id: string) => {
  try {
    await db.delete(pageantExperiences).where(eq(pageantExperiences.id, id));
    revalidateTag(PAGEANT_EXPERIENCES_TAG); // Revalidate by tag
  } catch (error: any) {
    console.error("Error deleting pageant experience:", error);
    throw new Error(`Failed to delete pageant experience: ${error.message}`);
  }
};

// Get all pageant experiences
export const getPageantExperiences = async (): Promise<PageantExperience[]> => {
  try {
    const experiences = await db.select().from(pageantExperiences);
    return experiences;
  } catch (error: any) {
    console.error("Error fetching pageant experiences:", error);
    throw new Error(`Failed to fetch pageant experiences: ${error.message}`);
  }
};

// Get pageant experiences by model ID
export const getPageantExperiencesByModelId = async (
  modelId: string,
): Promise<PageantExperience[]> => {
  try {
    const experiences = await db
      .select()
      .from(pageantExperiences)
      .where(eq(pageantExperiences.modelId, modelId));
    return experiences;
  } catch (error: any) {
    console.error("Error fetching pageant experiences by model ID:", error);
    throw new Error(
      `Failed to fetch pageant experiences by model ID: ${error.message}`,
    );
  }
};
