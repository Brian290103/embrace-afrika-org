"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { countries, models } from "@/db/schema"; // Import the models schema
import { slugify } from "@/lib/utils"; // Import the slugify function

// Get all models
export const getModels = async () => {
  try {
    const modelsItems = await db
      .select({
        id: models.id,
        name: models.name,
        slug: models.slug,
        featuredProfileImageUrl: models.featuredProfileImageUrl,
        bio: models.bio,
        createdAt: models.createdAt,
        country: {
          id: countries.id,
          name: countries.name,
        },
      })
      .from(models)
      .leftJoin(countries, eq(models.countryId, countries.id));
    return modelsItems;
  } catch (error: any) {
    console.error("Error fetching models:", error);
    throw new Error(`Failed to fetch models: ${error.message}`);
  }
};

// Get a single model by slug
export const getModelBySlug = async (slug: string) => {
  try {
    const modelItem = await db
      .select({
        id: models.id,
        name: models.name,
        slug: models.slug,
        featuredProfileImageUrl: models.featuredProfileImageUrl,
        bio: models.bio,
        createdAt: models.createdAt,
        country: {
          id: countries.id,
          name: countries.name,
        },
      })
      .from(models)
      .leftJoin(countries, eq(models.countryId, countries.id))
      .where(eq(models.slug, slug))
      .limit(1);

    if (!modelItem || modelItem.length === 0) {
      return null;
    }
    return modelItem[0];
  } catch (error: any) {
    console.error("Error fetching model by slug:", error);
    throw new Error(`Failed to fetch model: ${error.message}`);
  }
};

// Get a single model by ID
export const getModelById = async (id: string) => {
  try {
    const modelItem = await db
      .select({
        id: models.id,
        name: models.name,
        slug: models.slug,
        featuredProfileImageUrl: models.featuredProfileImageUrl,
        bio: models.bio,
        createdAt: models.createdAt,
        country: {
          id: countries.id,
          name: countries.name,
        },
      })
      .from(models)
      .leftJoin(countries, eq(models.countryId, countries.id))
      .where(eq(models.id, id))
      .limit(1);

    if (!modelItem || modelItem.length === 0) {
      return null;
    }
    return modelItem[0];
  } catch (error: any) {
    console.error("Error fetching model by id:", error);
    throw new Error(`Failed to fetch model: ${error.message}`);
  }
};

// Add a new model
export const addModel = async (
  name: string,
  countryId: string,
  featuredProfileImageUrl?: string, // Optional
  bio?: string, // Optional
) => {
  try {
    const slug = slugify(name);

    await db.insert(models).values({
      name,
      countryId,
      slug,
      featuredProfileImageUrl,
      bio,
    });
    revalidatePath("/admin/models"); // Revalidate the appropriate path
    revalidatePath("/models");
  } catch (error: any) {
    console.error("Error adding model:", error);
    throw new Error(`Failed to add model: ${error.message}`);
  }
};

// Delete a model by ID
export const deleteModel = async (id: string) => {
  try {
    await db.delete(models).where(eq(models.id, id));
    revalidatePath("/admin/models");
    revalidatePath("/models");
  } catch (error: any) {
    console.error("Error deleting model:", error);
    throw new Error(`Failed to delete model: ${error.message}`);
  }
};

// Update an existing model
export const updateModel = async (
  id: string,
  updates: {
    name?: string;
    countryId?: string;
    slug?: string;
    featuredProfileImageUrl?: string;
    bio?: string;
  },
) => {
  try {
    let finalSlug = updates.slug;
    if (updates.name && !updates.slug) {
      finalSlug = slugify(updates.name);
    }
    const updatedData = { ...updates, slug: finalSlug };

    await db.update(models).set(updatedData).where(eq(models.id, id));
    revalidatePath("/models");
    revalidatePath(`/models/${updatedData.slug}`);
  } catch (error: any) {
    console.error("Error updating model:", error);
    throw new Error(`Failed to update model: ${error.message}`);
  }
};
