import React from "react";
import EventForm from "@/app/admin/events/form";
import { EventType } from "@/typings";
import { getEventById } from "@/actions/eventAction";

const EditEventsPage = async ({ params }: { params: { id: string } }) => {
  const eventDetails: EventType | null = await getEventById(params.id);

  if (!eventDetails) {
    return <div>Event not found.</div>;
  }

  const event: EventType = eventDetails;
  return (
    <div>
      <EventForm event={event} />
    </div>
  );
};

export default EditEventsPage;
