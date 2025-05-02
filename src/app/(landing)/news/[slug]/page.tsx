import React from "react";
import { getNewsBySlug } from "@/actions/newsAction";
import EditorClient from "@/components/editor-client";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

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
    <div
      className={
        "flex p-5 items-center w-full max-w-5xl mx-auto justify-center flex-col gap-3"
      }
    >
      <h1
        className={
          "font-heading1 text-3xl text-center tracking-wider font-semibold"
        }
      >
        {article.title}
      </h1>
      <p className={"text-center"}>{article.caption}</p>

      <Image
        width={1000}
        height={1000}
        className={"object-cover w-full h-[400px] rounded-xl"}
        src={article.featuredImageUrl}
        alt={`featured image for the blog by the title ${article.title}`}
      />

      <div className="">
        <EditorClient editable={false} value={JSON.parse(article.content)} />
      </div>
    </div>
  );
}
