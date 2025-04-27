import React from "react";
import { getNewsBySlug } from "@/actions/newsAction";
import EditorClient from "@/components/editor-client";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const article = await getNewsBySlug(slug);

  if (!article) {
    // Handle the case where the article is not found.
    // You might want to return a 404 Not Found error here.
    return {
      title: "Article Not Found", // Provide a default title
    };
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: article.title, // Use article title
    description: article.caption, // Use article caption
    openGraph: {
      title: article.title, // Redundant, but good for clarity
      description: article.caption,
      images: [article.featuredImageUrl, ...previousImages].filter(Boolean), // Filter out null/undefined
    },
  };
}

export default async function Page({ params }: Props) {
  const article = await getNewsBySlug(params.slug);

  if (!article) {
    return <div>Article not found</div>; // Basic error handling
  }
  return (
    <div>
      <h1>{article.title}</h1>
      <p>
        <strong>ID:</strong> {article.id}
      </p>
      <EditorClient editable={false} value={JSON.parse(article.content)} />
      <p>
        <strong>Caption:</strong> {article.caption}
      </p>
      <p>
        <strong>Slug:</strong> {article.slug}
      </p>
      <p>
        <strong>Featured Image URL:</strong> {article.featuredImageUrl}
      </p>
    </div>
  );
}
