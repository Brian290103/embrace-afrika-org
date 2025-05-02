"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { countries } from "@/db/schema"; // Import the news schema
import { slugify } from "@/lib/utils";
import { CountriesType } from "@/typings"; // Import the slugify function

// Get a single country by ID
export const getCountryById = async (
  id: string,
): Promise<CountriesType | null> => {
  try {
    const country = await db
      .select()
      .from(countries)
      .where(eq(countries.id, id))
      .limit(1);
    if (!country) {
      return null;
    }
    return country;
  } catch (error: any) {
    console.error("Error fetching country by ID:", error);
    throw new Error(`Failed to fetch country by ID: ${error.message}`);
  }
};

// Get a single country by Slug
export const getCountryBySlug = async (
  slug: string,
): Promise<CountriesType | null> => {
  try {
    const country = await db
      .select()
      .from(countries)
      .where(eq(countries.slug, slug))
      .limit(1)
      .get(); // Use .get()
    if (!country) {
      return null;
    }
    return country;
  } catch (error: any) {
    console.error("Error fetching country by slug:", error);
    throw new Error(`Failed to fetch country by slug: ${error.message}`);
  }
};

// Add a new country
export const addCountry = async (name: string, flagUrl: string) => {
  try {
    const slug = slugify(name); // Generate slug from name
    await db.insert(countries).values({
      name,
      slug, // Save the slug
      flagUrl,
    });
    revalidatePath("/admin/countries");
  } catch (error: any) {
    console.error("Error adding country:", error);
    throw new Error(`Failed to add country: ${error.message}`);
  }
};

// Update an existing country
export const updateCountry = async (
  id: string,
  updates: Partial<
    Omit<CountriesType, "id" | "createdAt" | "updatedAt" | "slug">
  >,
) => {
  try {
    let finalSlug = updates.slug;
    if (updates.name && !updates.slug) {
      finalSlug = slugify(updates.name);
    }
    const updatedData = { ...updates, slug: finalSlug, updatedAt: new Date() };
    await db.update(countries).set(updatedData).where(eq(countries.id, id));
    revalidatePath("/admin/countries");
  } catch (error: any) {
    console.error("Error updating country:", error);
    throw new Error(`Failed to update country: ${error.message}`);
  }
};

// Delete a country
export const deleteCountry = async (id: string) => {
  try {
    await db.delete(countries).where(eq(countries.id, id));
    revalidatePath("/admin/countries");
  } catch (error: any) {
    console.error("Error deleting country:", error);
    throw new Error(`Failed to delete country: ${error.message}`);
  }
};

// Get all countries
export const getCountries = async (): Promise<CountriesType[]> => {
  try {
    const countriesList = await db.select().from(countries);
    return countriesList;
  } catch (error: any) {
    console.error("Error fetching countries:", error);
    throw new Error(`Failed to fetch countries: ${error.message}`);
  }
};
