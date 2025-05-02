"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { registerForEvent } from "@/actions/client/eventRegistrationActions"; // Import the server action

// Define the schema for the form using Zod
const formSchema = z.object({
  eventId: z.string().uuid(), // Add eventId,
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    // Basic phone validation
    message: "Phone number must be at least 10 digits.",
  }),
  dateOfBirth: z.date().optional(),
  heightCm: z.string().optional(),
  country: z.string().min(2, { message: "Country is required" }),
  city: z.string().min(2, { message: "City is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  instagramProfile: z.string().optional(),
  profileImage1: z.string().optional(), //  You might want to use a more specific schema for file uploads
  profileImage2: z.string().optional(),
});

const EventRegistrationForm = ({ eventId }: { eventId: string }) => {
  // Receive eventId as a prop
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form using useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventId: eventId, // Set the eventId
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: undefined,
      heightCm: "",
      country: "",
      city: "",
      address: "",
      instagramProfile: "",
      profileImage1: "",
      profileImage2: "",
    },
  });

  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      // Call the server action
      await registerForEvent(values);
      toast.success("Successfully registered for the event!");
      form.reset(); // Clear form after successful submission
    } catch (error: any) {
      toast.error(error.message || "An error occurred during registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields: (keyof z.infer<typeof formSchema>)[] = [
    // Array of field names
    "firstName",
    "lastName",
    "email",
    "phone",
    "dateOfBirth",
    "heightCm",
    "country",
    "city",
    "address",
    "instagramProfile",
    "profileImage1",
    "profileImage2",
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white py-8 rounded-lg shadow-md w-full ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((fieldName) => {
              if (fieldName === "dateOfBirth") {
                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                        <FormDescription>
                          Select your date of birth. You must be at least 18
                          years old to register.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                );
              }
              if (
                fieldName === "profileImage1" ||
                fieldName === "profileImage2"
              ) {
                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {fieldName === "profileImage1"
                            ? "Profile Image 1"
                            : "Profile Image 2"}
                        </FormLabel>
                        <FormControl>
                          <Input type="file" {...field} />
                        </FormControl>
                        <FormDescription>
                          Upload an image for your profile.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              }
              if (fieldName === "address") {
                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your full address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              }

              return (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`Enter your ${fieldName}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EventRegistrationForm;
