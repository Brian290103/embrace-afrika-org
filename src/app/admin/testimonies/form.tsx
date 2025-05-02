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
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import { toast } from "sonner";
import { Loader } from "lucide-react";
// Import server actions
import { addTestimony, updateTestimony } from "@/actions/testimonyActions"; // Updated import
import { TestimonyType } from "@/typings"; // Import TestimonyType

interface TestimonyFormProps {
  dismissDialog: (value: boolean) => void;
  data?: TestimonyType; // Updated data type to TestimonyType
}

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  occupation: z.string().min(2, {
    message: "Occupation must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    // Added validation for message
    message: "Message must be at least 10 characters.",
  }),
  profileImageUrl: z
    .string()
    .url({ message: "Invalid URL for the profile image." })
    .nullable()
    .optional(),
});

const TestimonyForm: React.FC<TestimonyFormProps> = ({
  dismissDialog,
  data,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isUpdate = !!data; // Determine if it's an update operation

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: isUpdate ? data?.username || "" : "",
      occupation: isUpdate ? data?.occupation || "" : "",
      message: isUpdate ? data?.message || "" : "",
      profileImageUrl: isUpdate ? data?.profileImageUrl || "" : "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        username: data.username,
        occupation: data.occupation,
        message: data.message,
        profileImageUrl: data.profileImageUrl,
      });
    }
  }, [data, form]);

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    try {
      if (isUpdate) {
        if (!data?.id) {
          throw new Error("Testimony ID is required for updating.");
        }
        await updateTestimony(data.id, {
          username: formData.username,
          occupation: formData.occupation,
          message: formData.message,
          profileImageUrl: formData.profileImageUrl,
        });
        toast.success(
          `Testimony from ${formData.username} updated successfully!`,
        );
      } else {
        await addTestimony(
          formData.username,
          formData.occupation,
          formData.message,
          formData.profileImageUrl,
        );
        toast.success(
          `Testimony from ${formData.username} added successfully!`,
        );
      }
      dismissDialog(false);
      form.reset();
    } catch (error: any) {
      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to ${isUpdate ? "update" : "add"} testimony. Please try again.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      name: "username",
      label: "Username",
      placeholder: "John Doe",
      type: "text",
      control: form.control,
    },
    {
      name: "occupation",
      label: "Occupation",
      placeholder: "Software Engineer",
      type: "text",
      control: form.control,
    },
    {
      name: "message",
      label: "Message",
      placeholder: "Your testimony here...",
      type: "textarea", // Use textarea type
      control: form.control,
    },
    {
      name: "profileImageUrl",
      label: "Profile Image URL (Optional)",
      placeholder: "https://example.com/profile.png",
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
                    {field.type === "textarea" ? (
                      <Textarea // Use Textarea component
                        {...formField}
                        placeholder={field.placeholder}
                        disabled={isSubmitting}
                        className="min-h-[100px]" //Added min height
                      />
                    ) : (
                      <Input
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
                "Update Testimony"
              ) : (
                "Add Testimony"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default TestimonyForm;
