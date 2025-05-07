"use client";

import React, { useEffect, useState } from "react";
import { getEvents } from "@/actions/client/clientEventAction";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface EventsType {
  id: string;
  slug: string;
  title: string;
  caption: string;
  content: string;
  eventDate: string;
  featuredImageUrl: string;
  eventLocation: string;
  createdAt: string;
}

const EventsFlyOut = ({
  hoverItem,
  setHoverItem,
  item,
}: {
  hoverItem: any;
  setHoverItem: any;
  item: any;
}) => {
  const [upcomingEvents, setUpcomingEvents] = useState<{
    [key: string]: EventsType[];
  }>({});
  const [pastEvents, setPastEvents] = useState<{ [key: string]: EventsType[] }>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const events: EventsType[] = await getEvents();
        const now = new Date();

        const upcoming: { [key: string]: EventsType[] } = {};
        const past: { [key: string]: EventsType[] } = {};

        events.forEach((event) => {
          const eventDate = new Date(event.eventDate);
          if (eventDate >= now) {
            // Group upcoming events by Month Year.
            const monthYear = eventDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            });
            if (!upcoming[monthYear]) {
              upcoming[monthYear] = [];
            }
            upcoming[monthYear].push(event);
          } else {
            // Group past events by year
            const year = eventDate.getFullYear().toString();
            if (!past[year]) {
              past[year] = [];
            }
            past[year].push(event);
          }
        });

        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (err: any) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div
        onMouseLeave={() => setHoverItem(null)}
        className=" min-w-[700px] w-full flex items-center justify-center"
      >
        <Loader className={"animate-spin w-8 h-8 text-muted-foreground"} />
      </div>
    );
  }

  if (error) {
    return (
      <div onMouseLeave={() => setHoverItem(null)} className="min-w-[700px]">
        <div>
          <h1 className="font-semibold font-heading1 text-xl text-red-500">
            Error
          </h1>
          <p className="text-red-500">Try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseLeave={() => setHoverItem(null)}
      className="grid min-w-[700px] grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div>
        <h2 className="font-semibold font-heading1 text-lg bg-brand-primary rounded-xl p-3 mb-4">
          Upcoming Events
        </h2>
        {Object.keys(upcomingEvents).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(upcomingEvents).map(([monthYear, events]) => (
              <div key={monthYear} className={"bg-muted rounded-xl p-3"}>
                <h3 className="font-semibold pb-2">{monthYear}</h3>
                <ul className="space-y-2">
                  {events.map((event) => (
                    <li
                      key={event.id}
                      className="bg-white hover:bg-brand-primary duration-300 cursor-pointer rounded-xl p-2"
                    >
                      <Link
                        href={`/events/${event.slug}`}
                        className="group flex items-center gap-5 transition-colors"
                      >
                        <Image
                          src={`${event.featuredImageUrl}`}
                          alt={`poster image of ${event.title} event`}
                          width={100}
                          height={100}
                          className={
                            "rounded-xl object-cover w-[100px] h-[100px]"
                          }
                        />
                        <div className="flex flex-col gap-1">
                          <h1 className="font-semibold font-heading1 tracking-wider group:hover:tracking-widest">
                            {event.title}
                          </h1>
                          <p className="text-sm text-muted-foreground group:hover:text-white">
                            {event.caption}
                          </p>
                          <span className="text-sm">
                            {new Date(event.eventDate).toLocaleDateString()}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No upcoming events.</p>
        )}
      </div>
      <div>
        <h2 className="font-semibold font-heading1 text-lg bg-brand-primary rounded-xl p-3 mb-4">
          Past Events
        </h2>
        {Object.keys(pastEvents).length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(pastEvents).map(([year, events]) => (
              <AccordionItem key={year} value={year}>
                <AccordionTrigger>
                  <h3 className="font-semibold text-lg">{year}</h3>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {events.map((event) => (
                      <li
                        key={event.id}
                        className="bg-white hover:bg-brand-primary duration-300 cursor-pointer rounded-xl p-2"
                      >
                        <Link
                          href={`/events/${event.slug}`}
                          className="group flex items-center gap-5 transition-colors"
                        >
                          <Image
                            src={`${event.featuredImageUrl}`}
                            alt={`poster image of ${event.title} event`}
                            width={100}
                            height={100}
                            className={
                              "rounded-xl object-cover w-[80px] h-[80px]"
                            }
                          />
                          <div className="flex flex-col gap-1">
                            <h1 className="font-semibold font-heading1 tracking-wider group-hover:tracking-widest">
                              {event.title}
                            </h1>
                            <p className="text-sm text-muted-foreground group:hover:text-white">
                              {event.caption}
                            </p>
                            <span className="text-sm">
                              {new Date(event.eventDate).toLocaleDateString()}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-gray-500">No past events.</p>
        )}
      </div>
    </div>
  );
};

export default EventsFlyOut;
