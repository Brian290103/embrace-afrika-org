import React from "react";
import { EventsType, GalleryType } from "@/typings";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Calendar, MapPin, Pen } from "lucide-react";
import EditorClient from "@/components/editor-client";
import ClientGallerySection from "@/app/(landing)/components/client-gallery-section";
import { getGalleryByRelation } from "@/actions/galleryAction";
import { cn } from "@/lib/utils";
import EventRegistrationForm from "@/app/(landing)/events/[slug]/form";

const ClientEventDetails = async ({ event }: { event: EventsType }) => {
  const galleryList: GalleryType[] = await getGalleryByRelation(
    "event",
    event.id,
  );

  const isUpcoming = new Date(event.eventDate) > new Date();

  return (
    <div className={"w-full flex flex-col gap-3"}>
      <div className="flex flex-col gap-3 gap-3 w-full max-w-4xl mx-auto px-3">
        <article className="flex flex-col w-full gap-5">
          <div className="w-full flex items-center gap-3">
            <Table className={"w-full "}>
              <TableBody>
                <TableRow>
                  <TableCell className={"w-[50px]"}>
                    <Pen className={"w-4  h-4"} />
                  </TableCell>
                  <TableHead className="font-semibold"> Name</TableHead>
                  <TableCell>{event.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={"w-[50px]"}>
                    <MapPin className={"w-4  h-4"} />
                  </TableCell>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableCell>{event.eventLocation}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={"w-[50px]"}>
                    <Calendar className={"w-4  h-4"} />
                  </TableCell>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableCell>{event.eventDate}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Sheet>
              <SheetTrigger
                className={cn(
                  "rounded-xl flex items-center justify-center p-5 font-heading1 uppercase font-semibold tracking-wider",
                  isUpcoming
                    ? "bg-brand-primary text-black hover:bg-black hover:text-brand-primary"
                    : "bg-gray-500 text-white cursor-not-allowed",
                  "duration-300",
                )}
                disabled={!isUpcoming} // Disable if the event is in the past
              >
                {isUpcoming ? "Click to Register" : "Event Ended"}
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{event.title} Registration form</SheetTitle>
                  <SheetDescription>
                    Fill in your correct details.
                  </SheetDescription>
                </SheetHeader>
                <div className="h-full max-h-[calc(100vh-100px)] overflow-y-auto">
                  <EventRegistrationForm />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="w-full rounded-xl overflow-hidden">
            <Image
              src={event.featuredImageUrl}
              alt={`Poster image of ${event.title} Event`}
              width={1000}
              height={1000}
            />
          </div>

          <EditorClient editable={false} value={JSON.parse(event.content)} />
        </article>
      </div>

      <article className="">
        <ClientGallerySection
          url={"/gallery"}
          title={"Gallery"}
          subtitle={`${event.title} Gallery`}
          galleryList={galleryList}
        />
      </article>
    </div>
  );
};

export default ClientEventDetails;
