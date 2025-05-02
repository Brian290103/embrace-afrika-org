import React from "react";
import { getEventById } from "@/actions/eventAction"; // Import the action to fetch event details
import { EventType } from "@/typings"; // Remove this, we'll define it here for more clarity
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";
import EventMoreDetails from "@/app/admin/events/event-more-details"; // You might need to adjust this path

export default async function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const eventDetails: EventType | null = await getEventById(params.id);

  if (!eventDetails) {
    return <div>Event not found.</div>;
  }

  const {
    title,
    caption,
    content,
    eventDate,
    featuredImageUrl,
    eventLocation,
    createdAt,
  } = eventDetails;

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Event Details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="">
              {featuredImageUrl ? (
                <div className="">
                  <Image
                    src={featuredImageUrl}
                    alt={title}
                    width={400}
                    height={400}
                    className={cn(
                      "rounded-lg object-cover w-full h-auto",
                      "aspect-square",
                    )}
                  />
                </div>
              ) : (
                <div className="md:w-1/3 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Title</TableCell>
                    <TableCell>{title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Caption</TableCell>
                    <TableCell>{caption}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Event Location
                    </TableCell>
                    <TableCell>{eventLocation}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Event Date</TableCell>
                    <TableCell>
                      {new Date(eventDate).toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Created At</TableCell>
                    <TableCell>
                      {new Date(createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      <EventMoreDetails content={content} id={params.id} />{" "}
      {/* Make sure this component is adaptable */}
    </div>
  );
}
