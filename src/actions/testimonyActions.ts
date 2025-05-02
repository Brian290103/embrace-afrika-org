"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { testimonies } from "@/db/schema";
import { TestimonyType } from "@/typings"; // Import the testimonies schema

// Get a single testimony by ID
export const getTestimonyById = async (
  id: string,
): Promise<TestimonyType | null> => {
  try {
    const testimony = await db
      .select()
      .from(testimonies)
      .where(eq(testimonies.id, id))
      .limit(1);
    if (!testimony) {
      return null;
    }
    return testimony[0]; // Changed to return testimony[0]
  } catch (error: any) {
    console.error("Error fetching testimony by ID:", error);
    throw new Error(`Failed to fetch testimony by ID: ${error.message}`);
  }
};

// Add a new testimony
export const addTestimony = async (
  username: string,
  occupation: string,
  message: string,
  profileImageUrl: string | null,
) => {
  try {
    await db.insert(testimonies).values({
      username,
      occupation,
      message,
      profileImageUrl,
    });
    revalidatePath("/admin/testimonies"); // Adjust the path as needed
  } catch (error: any) {
    console.error("Error adding testimony:", error);
    throw new Error(`Failed to add testimony: ${error.message}`);
  }
};

// Update an existing testimony
export const updateTestimony = async (
  id: string,
  updates: Partial<Omit<Testimony, "id" | "createdAt">>,
) => {
  try {
    await db.update(testimonies).set(updates).where(eq(testimonies.id, id));
    revalidatePath("/admin/testimonies"); // Adjust the path as needed
  } catch (error: any) {
    console.error("Error updating testimony:", error);
    throw new Error(`Failed to update testimony: ${error.message}`);
  }
};

// Delete a testimony
export const deleteTestimony = async (id: string) => {
  try {
    await db.delete(testimonies).where(eq(testimonies.id, id));
    revalidatePath("/admin/testimonies"); // Adjust the path as needed
  } catch (error: any) {
    console.error("Error deleting testimony:", error);
    throw new Error(`Failed to delete testimony: ${error.message}`);
  }
};

// Get all testimonies
export const getTestimonies = async (): Promise<Testimony[]> => {
  try {
    const testimoniesList = await db.select().from(testimonies);
    return testimoniesList;
  } catch (error: any) {
    console.error("Error fetching testimonies:", error);
    throw new Error(`Failed to fetch testimonies: ${error.message}`);
  }
};
