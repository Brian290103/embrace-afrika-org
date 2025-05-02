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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader } from "lucide-react"; // Adjust the path if needed
// Import server actions
import { addCountry, updateCountry } from "@/actions/countriesAction"; // Adjust the path if needed

interface CountryFormProps {
  dismissDialog: (value: boolean) => void;
  data?: { id: string; name: string; flagUrl: string }; // Optional data for updating
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Country name must be at least 2 characters.",
  }),
  flagUrl: z.string().url({ message: "Invalid URL for the flag image." }),
});

const CountryForm: React.FC<CountryFormProps> = ({ dismissDialog, data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isUpdate = !!data; // Determine if it's an update operation

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: isUpdate ? data?.name || "" : "",
      flagUrl: isUpdate ? data?.flagUrl || "" : "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        flagUrl: data.flagUrl,
      });
    }
  }, [data, form]);

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    try {
      if (isUpdate) {
        if (!data?.id) {
          throw new Error("Country ID is required for updating.");
        }
        await updateCountry(data.id, {
          name: formData.name,
          flagUrl: formData.flagUrl,
        });
        toast.success(`${formData.name} updated successfully!`);
      } else {
        await addCountry(formData.name, formData.flagUrl);
        toast.success(`${formData.name} added successfully!`);
      }
      dismissDialog(false);
      form.reset();
    } catch (error: any) {
      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to ${isUpdate ? "update" : "add"} country. Please try again.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      name: "name",
      label: "Country Name",
      placeholder: "Kenya",
      type: "text",
      control: form.control,
    },
    {
      name: "flagUrl",
      label: "Flag Image URL",
      placeholder: "https://example.com/flag.png",
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
                    {field.type === "text" ? (
                      <Input
                        {...formField}
                        placeholder={field.placeholder}
                        disabled={isSubmitting}
                      />
                    ) : (
                      <Textarea
                        {...formField}
                        placeholder={field.placeholder}
                        disabled={isSubmitting}
                      />
                    )}
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
                "Update Country"
              ) : (
                "Add Country"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CountryForm;
