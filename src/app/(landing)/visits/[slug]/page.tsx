import React from "react";
import ClientVisitDetails from "@/app/(landing)/visits/[slug]/details";
import HeaderTitle from "@/app/(landing)/components/header-title";
import { VisitsType } from "@/typings";
import { getVisitsBySlug } from "@/actions/visitAction";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;
  const visit: VisitsType = await getVisitsBySlug(slug);

  if (!visit) {
    return {
      title: "Visit Details Not Found",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: visit.title,
    description: visit.caption,
    openGraph: {
      title: visit.title,
      description: visit.caption,
      images: [visit.featuredImageUrl, ...previousImages].filter(Boolean), // Ensure no null/undefined
    },
  };
}

const VisitDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const visit: VisitsType = await getVisitsBySlug(params.slug);
  if (!visit) {
    return <div>Visit not found</div>; // Basic error handling
  }
  return (
    <section className={"w-full flex flex-col gap-3"}>
      <HeaderTitle title={visit.title} subtitle={visit.caption} />
      <ClientVisitDetails visit={visit} />
    </section>
  );
};

export default VisitDetailsPage;
