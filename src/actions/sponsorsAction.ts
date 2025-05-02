"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { sponsors } from "@/db/schema";
import { SponsorType } from "@/typings";

// Get a single sponsor by ID
export const getSponsorById = async (
  id: string,
): Promise<SponsorType | null> => {
  try {
    const sponsor = await db
      .select()
      .from(sponsors)
      .where(eq(sponsors.id, id))
      .limit(1);
    if (!sponsor) {
      return null;
    }
    return sponsor;
  } catch (error: any) {
    console.error("Error fetching sponsor by ID:", error);
    throw new Error(`Failed to fetch sponsor by ID: ${error.message}`);
  }
};

// Add a new sponsor
export const addSponsor = async (
  name: string,
  logoUrl: string | null,
  websiteUrl: string | null,
) => {
  try {
    await db.insert(sponsors).values({
      name,
      logoUrl,
      websiteUrl,
    });
    revalidatePath("/admin/sponsors");
  } catch (error: any) {
    console.error("Error adding sponsor:", error);
    throw new Error(`Failed to add sponsor: ${error.message}`);
  }
};

// Update an existing sponsor
export const updateSponsor = async (
  id: string,
  updates: Partial<Omit<SponsorType, "id" | "createdAt">>,
) => {
  try {
    await db.update(sponsors).set(updates).where(eq(sponsors.id, id));
    revalidatePath("/admin/sponsors");
  } catch (error: any) {
    console.error("Error updating sponsor:", error);
    throw new Error(`Failed to update sponsor: ${error.message}`);
  }
};

// Delete a sponsor
export const deleteSponsor = async (id: string) => {
  try {
    await db.delete(sponsors).where(eq(sponsors.id, id));
    revalidatePath("/admin/sponsors");
  } catch (error: any) {
    console.error("Error deleting sponsor:", error);
    throw new Error(`Failed to delete sponsor: ${error.message}`);
  }
};

// Get all sponsors
export const getSponsors = async (): Promise<Sponsor[]> => {
  try {
    const sponsorsList = await db.select().from(sponsors);
    return sponsorsList;
  } catch (error: any) {
    console.error("Error fetching sponsors:", error);
    throw new Error(`Failed to fetch sponsors: ${error.message}`);
  }
};
