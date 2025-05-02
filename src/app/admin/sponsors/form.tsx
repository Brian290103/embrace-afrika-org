"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { toast } from "sonner";
import { Loader } from "lucide-react";
// Import server actions
import { addSponsor, updateSponsor } from "@/actions/sponsorsAction"; // Updated import

interface SponsorFormProps {
  dismissDialog: (value: boolean) => void;
  data?: {
    id: string;
    name: string;
    logoUrl: string | "";
    websiteUrl: string | "";
  }; // Updated data type
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Sponsor name must be at least 2 characters.",
  }),
  logoUrl: z
    .string()
    .url({ message: "Invalid URL for the logo image." })
    .nullable()
    .optional(),
  websiteUrl: z
    .string()
    .url({ message: "Invalid URL for the website." })
    .nullable()
    .optional(),
});

const SponsorForm: React.FC<SponsorFormProps> = ({ dismissDialog, data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isUpdate = !!data; // Determine if it's an update operation

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: isUpdate ? data?.name || "" : "",
      logoUrl: isUpdate ? data?.logoUrl || "" : "",
      websiteUrl: isUpdate ? data?.websiteUrl || "" : "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        logoUrl: data.logoUrl,
        websiteUrl: data.websiteUrl,
      });
    }
  }, [data, form]);

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    try {
      if (isUpdate) {
        if (!data?.id) {
          throw new Error("Sponsor ID is required for updating.");
        }
        await updateSponsor(data.id, {
          name: formData.name,
          logoUrl: formData.logoUrl,
          websiteUrl: formData.websiteUrl,
        });
        toast.success(`${formData.name} updated successfully!`);
      } else {
        await addSponsor(formData.name, formData.logoUrl, formData.websiteUrl);
        toast.success(`${formData.name} added successfully!`);
      }
      dismissDialog(false);
      form.reset();
    } catch (error: any) {
      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to ${isUpdate ? "update" : "add"} sponsor. Please try again.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      name: "name",
      label: "Sponsor Name",
      placeholder: "Acme Corp",
      type: "text",
      control: form.control,
    },
    {
      name: "logoUrl",
      label: "Logo Image URL (Optional)",
      placeholder: "https://example.com/logo.png",
      type: "text",
      control: form.control,
    },
    {
      name: "websiteUrl",
      label: "Website URL (Optional)",
      placeholder: "https://acme.com",
      type: "text",
      control: form.control,
    },
  ];

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          {formFields.map((field) => (
            <FormField
              key={field.name}
              control={field.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...formField}
                      placeholder={field.placeholder}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="w-full flex">
            <Button type="submit" className={"w-full"} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  {isUpdate ? "Updating..." : "Adding..."}
                </>
              ) : isUpdate ? (
                "Update Sponsor"
              ) : (
                "Add Sponsor"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SponsorForm;
