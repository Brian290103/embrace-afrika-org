"use client";

import React, { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { ImageDialog } from "@/components/image-dialog";
import { addEvent, updateEvent } from "@/actions/eventAction"; // Import both addEvent and updateEvent actions
import { Loader2 } from "lucide-react";
import { cn, slugify } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Block } from "@blocknote/core";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

// Define schema
const EventFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  caption: z
    .string()
    .min(2, { message: "Caption must be at least 2 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  eventDate: z.date(),
  eventLocation: z
    .string()
    .min(2, { message: "Event Location must be at least 2 characters" }),
  featuredImageUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal("")), // Make it optional
});

type EventFormValues = z.infer<typeof EventFormSchema>;

const formFields = [
  {
    name: "title",
    label: "Title",
    placeholder: "Event Title",
    element: "input",
  },
  {
    name: "caption",
    label: "Caption",
    placeholder: "Short description",
    element: "textarea",
  },
  {
    name: "eventLocation",
    label: "Event Location",
    placeholder: "Enter event location",
    element: "input",
  },
  {
    name: "eventDate",
    label: "Event Date",
    placeholder: "Select the date",
    element: "date",
  },
  {
    name: "featuredImageUrl",
    label: "Featured Image",
    placeholder: "Select Image",
    element: "custom",
  },
  {
    name: "content",
    label: "Content",
    placeholder: "Event details",
    element: "custom",
  },
] as const;

interface EventFormProps {
  event?: {
    id: string;
    title: string;
    caption: string;
    content: string;
    eventDate: Date;
    eventLocation: string;
    featuredImageUrl: string | null;
  };
}

const EventForm: React.FC<EventFormProps> = ({ event }) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: {
      title: "",
      caption: "",
      content: "",
      eventLocation: "",
      eventDate: new Date(),
      featuredImageUrl: "",
    },
  });

  useEffect(() => {
    if (event) {
      setIsUpdateMode(true);
      setSelectedImageUrl(event.featuredImageUrl || ""); // set default image
      setDate(event.eventDate);

      form.setValue("title", event.title);
      form.setValue("caption", event.caption);
      form.setValue("content", event.content);
      form.setValue("eventDate", event.eventDate);
      form.setValue("eventLocation", event.eventLocation);
      form.setValue("featuredImageUrl", event.featuredImageUrl || "");
    } else {
      setDate(new Date());
    }
  }, [event, form]);

  const onSubmit = async (values: EventFormValues) => {
    setIsLoading(true);
    try {
      if (isUpdateMode && event?.id) {
        // Handle Update
        await updateEvent(event.id, {
          title: values.title,
          caption: values.caption,
          content: values.content,
          eventDate: values.eventDate,
          eventLocation: values.eventLocation,
          featuredImageUrl: values.featuredImageUrl,
        });
        toast.success("Event updated successfully!");
      } else {
        // Handle Add
        await addEvent(
          values.title,
          values.caption,
          values.content,
          slugify(values.title), // Generate slug from title
          values.eventDate,
          values.eventLocation,
          values.featuredImageUrl,
        );
        toast.success("Event data submitted successfully!");
        form.reset();
        setSelectedImageUrl("");
        setDate(new Date());
      }
    } catch (error: any) {
      toast.error(
        `Failed to ${isUpdateMode ? "update" : "submit"} event: ${error.message}`,
      );
      console.error(
        `Error ${isUpdateMode ? "updating" : "submitting"} form:`,
        error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = useCallback(
    (selectedDate?: Date) => {
      if (selectedDate) {
        setDate(selectedDate);
        form.setValue("eventDate", selectedDate);
      }
    },
    [form],
  );

  const handleImageSelect = useCallback(
    (url: string) => {
      setSelectedImageUrl(url);
      form.setValue("featuredImageUrl", url);
    },
    [form],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="w-full flex sticky top-14 relative z-20 left-0 right-0 items-center justify-end pb-4 md:pb-6">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isUpdateMode ? "Update Event" : "Submit Event"}
          </Button>
        </div>

        {formFields.map((field) => {
          if (field.name === "featuredImageUrl") {
            return (
              <FormItem key={field.name}>
                {/*<FormLabel>{field.label}</FormLabel>*/}
                <FormControl>
                  <div className="flex flex-col relative items-center h-[300px] justify-center bg-muted rounded-xl gap-2">
                    <div className="relative z-10">
                      <ImageDialog onSelect={handleImageSelect} />
                    </div>
                    {selectedImageUrl && (
                      <Image
                        src={selectedImageUrl}
                        alt="Selected Preview"
                        width={1000}
                        height={1000}
                        className="rounded-md absolute top-0 left-0 object-cover right-0 bottom-0 h-full w-full"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }
          if (field.name === "eventDate") {
            return (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formFieldProps }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{field.label}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !date && "text-muted-foreground",
                            )}
                          >
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateSelect}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          return (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formFieldProps }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    {field.element === "input" ? (
                      <Input
                        placeholder={field.placeholder}
                        {...formFieldProps}
                      />
                    ) : field.name === "content" ? (
                      <>
                        {event ? (
                          <Editor
                            value={JSON.parse(event?.content as string)}
                            onChange={(blocks: Block[]) => {
                              form.setValue("content", JSON.stringify(blocks));
                            }}
                          />
                        ) : (
                          <Editor
                            onChange={(blocks: Block[]) => {
                              form.setValue("content", JSON.stringify(blocks));
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <Textarea
                        placeholder={field.placeholder}
                        rows={5}
                        cols={5}
                        {...formFieldProps}
                      />
                    )}
                  </FormControl>
                  {field.description && (
                    <FormDescription>{field.description}</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
      </form>
    </Form>
  );
};

export default EventForm;
