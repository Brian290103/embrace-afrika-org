"use client";

import React, { useState, useCallback } from 'react';
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
import { addNews } from "@/actions/newsAction";
import { Loader2 } from "lucide-react";
import { slugify } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Block } from "@blocknote/core";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

// Define schema
const NewsFormSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }),
    caption: z.string().min(2, { message: "Caption must be at least 2 characters." }),
    content: z.string().min(10, { message: "Content must be at least 10 characters." }),
    featuredImageUrl: z.string().url({ message: "Please enter a valid URL" }),
});

type NewsFormValues = z.infer<typeof NewsFormSchema>;

const formFields = [
    { name: "title", label: "Title", placeholder: "News Title", element: "input" },
    { name: "caption", label: "Caption", placeholder: "Short description or headline", element: "textarea" },
    { name: "featuredImageUrl", label: "Featured Image", placeholder: "Select Image", element: "custom" },
    { name: "content", label: "Content", placeholder: "Main content of the news article", element: "custom" },
] as const;

const NewsForm = () => {
    const form = useForm<NewsFormValues>({
        resolver: zodResolver(NewsFormSchema),
        defaultValues: {
            title: "",
            caption: "",
            content: "",
            featuredImageUrl: "",
        },
    });

    const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (values: NewsFormValues) => {
        setIsLoading(true);
        try {
            await addNews(
                values.title,
                values.content,
                values.caption,
                slugify(values.title),
                values.featuredImageUrl,
            );
            toast.success("News data submitted successfully!");
            form.reset();
            setSelectedImageUrl('');
        } catch (error: any) {
            toast.error(`Failed to submit news: ${error.message}`);
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageSelect = useCallback((url: string) => {
        setSelectedImageUrl(url);
        form.setValue('featuredImageUrl', url);
    }, [form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div className="w-full flex sticky top-14 relative z-20 left-0 right-0 items-center justify-end pb-4 md:pb-6">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit News
                    </Button>
                </div>

                {formFields.map((field) => {
                    if (field.name === 'featuredImageUrl') {
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

                    return (
                        <FormField
                            key={field.name}
                            control={form.control}
                            name={field.name}
                            render={({ field: formFieldProps }) => (
                                <FormItem>
                                    {/*<FormLabel>{field.label}</FormLabel>*/}
                                    <FormControl>
                                        {field.element === 'input' ? (
                                            <Input
                                                placeholder={field.placeholder}
                                                {...formFieldProps}
                                            />
                                        ) : field.name === 'content' ? (
                                            <Editor
                                                onChange={(blocks: Block[]) => {
                                                    form.setValue('content', JSON.stringify(blocks));
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

export default NewsForm;
