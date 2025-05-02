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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageDialog } from "@/components/image-dialog";
import { VideoDialog } from "@/components/video-dialog"; // Import VideoDialog
import { addGallery } from "@/actions/galleryAction";
import { Loader2 } from "lucide-react";
import Image from "next/image";

// Define schema for gallery form
const GalleryFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  caption: z
    .string()
    .min(2, { message: "Caption must be at least 2 characters." }),
  mediaUrl: z.string().url({ message: "Please enter a valid media URL." }),
});

type GalleryFormValues = z.infer<typeof GalleryFormSchema>;

const GalleryForm = ({
  relationName,
  relationId,
  type,
}: {
  relationName?: "model" | "event" | "visit";
  relationId?: string;
  type: "image" | "video";
}) => {
  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(GalleryFormSchema),
    defaultValues: {
      title: "",
      caption: "",
      mediaUrl: "",
    },
  });

  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: GalleryFormValues) => {
    setIsLoading(true);
    try {
      let modelId: string | null = null;
      let eventId: string | null = null;
      let visitsId: string | null = null;

      if (relationName === "model") {
        modelId = relationId ?? null;
      } else if (relationName === "event") {
        eventId = relationId ?? null;
      } else if (relationName === "visit") {
        visitsId = relationId ?? null;
      }

      await addGallery(
        values.title,
        values.caption,
        values.mediaUrl,
        type,
        modelId,
        eventId,
        visitsId,
      );
      toast.success("Gallery item submitted successfully!");
      form.reset();
      setSelectedMediaUrl("");
    } catch (error: any) {
      toast.error(`Failed to submit gallery item: ${error.message}`);
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMediaSelect = useCallback(
    (url: string) => {
      setSelectedMediaUrl(url);
      form.setValue("mediaUrl", url);
    },
    [form],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="w-full flex sticky top-14 relative z-20 left-0 right-0 items-center justify-end pb-4 md:pb-6">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Gallery Item
          </Button>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Gallery Item Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea placeholder="Short description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mediaUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Media</FormLabel>
              <FormControl>
                <div className="flex flex-col relative items-center h-[200px] justify-center bg-muted rounded-xl gap-2">
                  {type === "image" ? (
                    <ImageDialog onSelect={handleMediaSelect} />
                  ) : (
                    <VideoDialog onSelect={handleMediaSelect} />
                  )}
                  {selectedMediaUrl &&
                    (type === "image" ? (
                      <Image
                        src={selectedMediaUrl}
                        alt="Selected Preview"
                        width={1000}
                        height={1000}
                        className="rounded-md absolute top-0 left-0 object-cover right-0 bottom-0 h-full w-full"
                      />
                    ) : (
                      <video
                        src={selectedMediaUrl}
                        controls
                        className="rounded-md absolute top-0 left-0 object-cover right-0 bottom-0 h-full w-full"
                      />
                    ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default GalleryForm;
