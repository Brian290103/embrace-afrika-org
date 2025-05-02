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
import { addModel } from "@/actions/modelsAction";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Block } from "@blocknote/core";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

// Define schema
const ModelFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
  featuredProfileImageUrl: z
    .string()
    .url({ message: "Please enter a valid URL" }),
  countryId: z.string().uuid({ message: "Please select a valid Country" }),
});

type ModelFormValues = z.infer<typeof ModelFormSchema>;

const formFields = [
  { name: "name", label: "Name", placeholder: "Model Name", element: "input" },
  {
    name: "countryId",
    label: "Country",
    placeholder: "Select Country",
    element: "select",
  },
  {
    name: "featuredProfileImageUrl",
    label: "Featured Profile Image",
    placeholder: "Select Image",
    element: "custom",
  },
  { name: "bio", label: "Bio", placeholder: "Model Bio", element: "editor" }, // Changed to 'editor'
] as const;

const ModelForm = ({ countriesList }) => {
  const form = useForm<ModelFormValues>({
    resolver: zodResolver(ModelFormSchema),
    defaultValues: {
      name: "",
      bio: "",
      featuredProfileImageUrl: "",
      countryId: "",
    },
  });

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: ModelFormValues) => {
    setIsLoading(true);
    try {
      await addModel(
        values.name,
        values.countryId,
        values.featuredProfileImageUrl,
        values.bio,
      );
      toast.success("Model data submitted successfully!");
      form.reset();
      setSelectedImageUrl("");
    } catch (error: any) {
      toast.error(`Failed to submit model: ${error.message}`);
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = useCallback(
    (url: string) => {
      setSelectedImageUrl(url);
      form.setValue("featuredProfileImageUrl", url);
    },
    [form],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="w-full flex sticky top-14 relative z-20 left-0 right-0 items-center justify-end pb-4 md:pb-6">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Model
          </Button>
        </div>

        {formFields.map((field) => {
          if (field.name === "featuredProfileImageUrl") {
            return (
              <FormItem key={field.name}>
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
          } else if (field.name === "countryId") {
            return (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <Select
                      onValueChange={formField.onChange}
                      defaultValue={formField.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countriesList.map((country) => (
                          <SelectItem key={country.id} value={country.id}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          } else if (field.name === "bio") {
            // Added condition for 'bio'
            return (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formFieldProps }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      <Editor
                        onChange={(blocks: Block[]) => {
                          form.setValue("bio", JSON.stringify(blocks));
                        }}
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

export default ModelForm;
