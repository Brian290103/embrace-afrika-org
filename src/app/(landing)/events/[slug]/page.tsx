import React from "react";
import ClientEventDetails from "@/app/(landing)/events/[slug]/details";
import HeaderTitle from "@/app/(landing)/components/header-title";
import { EventsType } from "@/typings";
import { getEventBySlug } from "@/actions/client/clientEventAction";

const EventDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const event: EventsType = await getEventBySlug(params.slug);
  console.log(event);
  return (
    <section className={"w-full flex flex-col gap-3"}>
      <HeaderTitle title={event.title} subtitle={event.caption} />
      <ClientEventDetails event={event} />
    </section>
  );
};

export default EventDetailsPage;
