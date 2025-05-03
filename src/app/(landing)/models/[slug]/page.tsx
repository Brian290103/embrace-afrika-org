import React from "react";
import { getModelBySlug } from "@/actions/client/clientModelsAction";
import { ClientModel } from "@/typings-client";
import Details from "@/app/(landing)/models/[slug]/details";
import type { Metadata, ResolvingMetadata } from "next";

type Props = { params: { slug: string } };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;
  const model: ClientModel | null = await getModelBySlug(slug);

  if (!model) {
    return {
      title: "Model Not Found",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: model.name, // Use model name
    description: `${model.name} from ${model.country.name}`, // Use model description
    openGraph: {
      title: model.name,
      description: `${model.name} from ${model.country.name}`, // Use model description
      images: model.featuredProfileImageUrl
        ? [model.featuredProfileImageUrl, ...previousImages].filter(Boolean)
        : previousImages, // Use model image
    },
  };
}

export default async function ModelDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const model: ClientModel | null = await getModelBySlug(params.slug);

  if (!model) {
    return <div className="text-center  py-10">Model not found.</div>;
  }

  return <Details model={model} />;
}
