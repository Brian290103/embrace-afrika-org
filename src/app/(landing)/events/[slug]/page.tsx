import React from "react";
import ClientEventDetails from "@/app/(landing)/events/[slug]/details";
import HeaderTitle from "@/app/(landing)/components/header-title";
import { EventsType } from "@/typings";
import { getEventBySlug } from "@/actions/client/clientEventAction";
import type { Metadata, ResolvingMetadata } from "next";

type Props = { params: { slug: string } };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;
  const event: EventsType = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: event.title,
    description: event.caption,
    openGraph: {
      title: event.title,
      description: event.caption,
      images: [event.featuredImageUrl, ...previousImages].filter(Boolean),
    },
  };
}

const EventDetailsPage = async ({ params }: Props) => {
  const event: EventsType = await getEventBySlug(params.slug);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <section className={"w-full flex flex-col gap-3"}>
      <HeaderTitle title={event.title} subtitle={event.caption} />
      <ClientEventDetails event={event} />
    </section>
  );
};

export default EventDetailsPage;
