"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { EventRegistrationType } from "@/typings"; // Adjust the path if needed

// Server Action for Event Registration
export const registerForEvent = async (
  registrationData: Omit<EventRegistrationType, "id" | "createdAt">,
) => {
  try {
    // 1.  Basic Validation (Optional, but recommended)
    //     You can use Zod here for more robust validation if needed
    if (
      !registrationData.eventId ||
      !registrationData.firstName ||
      !registrationData.lastName ||
      !registrationData.email ||
      !registrationData.phone ||
      !registrationData.country ||
      !registrationData.city ||
      !registrationData.address
    ) {
      throw new Error("Missing required fields for event registration.");
    }

    // 2.  Insert the registration data into the database
    await db.insert(eventRegistrations).values(registrationData);

    // 3.  Revalidate relevant paths (Optional, but usually desired)
    //     Adjust these paths to match your application's routing structure
    revalidatePath(`/events/${registrationData.eventId}`); //  Event detail page
    revalidatePath("/events"); //  Events listing page
    revalidatePath("/profile"); //  User profile page (if applicable)
  } catch (error: any) {
    console.error("Error registering for event:", error);
    throw new Error(`Failed to register for event: ${error.message}`);
  }
};

// Get registrations for a specific event
export const getRegistrationsForEvent = async (eventId: string) => {
  try {
    const registrations = await db
      .select()
      .from(eventRegistrations)
      .where(eq(eventRegistrations.eventId, eventId));
    return registrations;
  } catch (error: any) {
    console.error("Error fetching registrations for event:", error);
    throw new Error(`Failed to fetch registrations: ${error.message}`);
  }
};
