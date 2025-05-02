"use client";

import React, { useCallback, useState } from "react";
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
import { addVisits } from "@/actions/visitAction"; // Import the addVisits action
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
const VisitFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  caption: z
    .string()
    .min(2, { message: "Caption must be at least 2 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  placeOfVisit: z
    .string()
    .min(2, { message: "Place of Visit must be at least 2 characters." }),
  dateOfVisit: z.date(),
  featuredImageUrl: z.string().url({ message: "Please enter a valid URL" }),
});

type VisitFormValues = z.infer<typeof VisitFormSchema>;

const formFields = [
  {
    name: "title",
    label: "Title",
    placeholder: "Visit Title",
    element: "input",
  },
  {
    name: "caption",
    label: "Caption",
    placeholder: "Short description",
    element: "textarea",
  },
  {
    name: "placeOfVisit",
    label: "Place of Visit",
    placeholder: "Enter the place of visit",
    element: "input",
  },
  {
    name: "dateOfVisit",
    label: "Date of Visit",
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
    placeholder: "Visit details",
    element: "custom",
  },
] as const;

const VisitForm = () => {
  const form = useForm<VisitFormValues>({
    resolver: zodResolver(VisitFormSchema),
    defaultValues: {
      title: "",
      caption: "",
      content: "",
      placeOfVisit: "",
      dateOfVisit: new Date(),
      featuredImageUrl: "",
    },
  });

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  const onSubmit = async (values: VisitFormValues) => {
    setIsLoading(true);
    try {
      await addVisits(
        values.title,
        values.caption,
        values.content,
        slugify(values.title), // Generate slug from title
        values.placeOfVisit,
        values.dateOfVisit,
        values.featuredImageUrl,
      );
      toast.success("Visit data submitted successfully!");
      form.reset();
      setSelectedImageUrl("");
      setDate(new Date());
    } catch (error: any) {
      toast.error(`Failed to submit visit: ${error.message}`);
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = useCallback(
    (selectedDate?: Date) => {
      if (selectedDate) {
        setDate(selectedDate);
        form.setValue("dateOfVisit", selectedDate);
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
            Submit Visit
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
          if (field.name === "dateOfVisit") {
            return (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field }) => (
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
                      <Editor
                        onChange={(blocks: Block[]) => {
                          form.setValue("content", JSON.stringify(blocks));
                        }}
                      />
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

export default VisitForm;
