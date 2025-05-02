"use server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { countries, gallery, models, pageantExperiences } from "@/db/schema"; // Import the models schema

// Get all models

export const getClientModels = async () => {
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
          flagUrl: countries.flagUrl,
        },
        pageantExperiences: sql`
          (
            SELECT COALESCE(
              json_agg(
                json_build_object(
                  'id', ${pageantExperiences.id},
                  'eventName', ${pageantExperiences.eventName},
                  'location', ${pageantExperiences.location},
                  'eventDate', ${pageantExperiences.eventDate}
                )
              ), '[]'::json
            )
            FROM ${pageantExperiences}
            WHERE ${pageantExperiences.modelId} = ${models.id}
          )
        `.as("pageantExperiences"),
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
            WHERE ${gallery.modelId} = ${models.id}
          )
        `.as("gallery"),
      })
      .from(models)
      .leftJoin(countries, eq(models.countryId, countries.id));

    return modelsItems;
  } catch (error: any) {
    console.error("Error fetching models:", error);
    throw new Error(`Failed to fetch models: ${error.message}`);
  }
};

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
          flagUrl: countries.flagUrl,
        },
        pageantExperiences: sql`
          (
            SELECT COALESCE(
              json_agg(
                json_build_object(
                  'id', ${pageantExperiences.id},
                  'eventName', ${pageantExperiences.eventName},
                  'location', ${pageantExperiences.location},
                  'eventDate', ${pageantExperiences.eventDate}
                )
              ), '[]'::json
            )
            FROM ${pageantExperiences}
            WHERE ${pageantExperiences.modelId} = ${models.id}
          )
        `.as("pageantExperiences"),
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
            WHERE ${gallery.modelId} = ${models.id}
          )
        `.as("gallery"),
      })
      .from(models)
      .leftJoin(countries, eq(models.countryId, countries.id))
      .where(eq(models.slug, slug))
      .limit(1); // Add limit 1 to ensure only one model is returned

    return modelItem[0] || null; // Return the first model or null if not found
  } catch (error: any) {
    console.error("Error fetching model by slug:", error);
    throw new Error(`Failed to fetch model: ${error.message}`);
  }
};
