"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Hand,
  Home,
  ImageIcon,
  Info,
  Loader,
  Mail,
  MapPin,
  Menu,
  Newspaper,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getEvents } from "@/actions/client/clientEventAction";
import { EventsType } from "@/typings-client";
import Image from "next/image";
import { format } from "date-fns";

// Mock data for navItems and EventsType
const navItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
  {
    title: "Models",
    url: "/models",
    icon: Home,
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
    component: "Events",
  },
  {
    title: "Visits",
    url: "/visits",
    icon: MapPin,
  },
  {
    title: "Gallery",
    url: "/gallery",
    icon: ImageIcon,
  },
  {
    title: "Sponsors",
    url: "/sponsors",
    icon: Hand,
  },
  {
    title: "News",
    url: "/news",
    icon: Newspaper,
  },
  {
    title: "Contact Us",
    url: "/contact",
    icon: Mail,
  },
];

const MobileNav = () => {
  const [events, setEvents] = useState<EventsType[]>();
  const [upcomingEvents, setUpcomingEvents] = useState<EventsType[]>([]);
  const [pastEvents, setPastEvents] = useState<EventsType[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData: EventsType[] = await getEvents(); // Changed variable name to eventsData
      console.log(eventsData);
      setEvents(eventsData);
    };
    fetchEvents(); //added this line
  }, []); // Remove events from dependency array

  useEffect(() => {
    if (events) {
      //check if events is not undefined
      const now = new Date();
      setUpcomingEvents(
        events.filter((event) => new Date(event.eventDate) >= now),
      );
      setPastEvents(events.filter((event) => new Date(event.eventDate) < now));
    }
  }, [events]);

  return (
    <header
      className={
        "flex px-3 py-5 sticky top-0 left-0 right-0 z-50 lg:hidden items-center justify-between gap-3 bg-brand-primary"
      }
    >
      <Link href={"/"}>
        <h1 className="font-fun text-3xl font-semibold">EmbraceAfrika</h1>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button size={"icon"}>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className={"w-10/12"}>
          <SheetHeader>
            <SheetTitle>EmbraceAfrika</SheetTitle>
            <SheetDescription>
              A platform driving a revolution that constantly seeks to promote
              Excellence, Diversity, Beauty, Fashion, Tourism, and Culture.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-3 h-full max-h-[100vh-100px] overflow-y-auto p-4">
            {navItems.map((item) => {
              if (item?.component === "Events") {
                return (
                  <Accordion type="single" collapsible key={item.title}>
                    <AccordionItem value="events">
                      <AccordionTrigger className={"bg-muted p-2 rounded"}>
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <a
                          href={item.url}
                          className="hover:text-blue-500 block py-1 px-5 pt-4"
                        >
                          View All Events
                        </a>
                        <Accordion
                          className="w-full px-5"
                          type="single"
                          defaultValue={"upcoming"}
                        >
                          <AccordionItem value="upcoming">
                            <AccordionTrigger>Upcoming Events</AccordionTrigger>
                            <AccordionContent>
                              {upcomingEvents.length > 0 ? (
                                <ul className="grid grid-cols-2 gap-2">
                                  {upcomingEvents.map((event) => (
                                    <li key={event.id} className={"h-full"}>
                                      <a
                                        href={`/events/${event.slug}`}
                                        className="flex flex-col gap-2 group h-full hover:bg-brand-primary duration-300  p-2 bg-muted rounded-xl"
                                      >
                                        <Image
                                          src={event.featuredImageUrl}
                                          alt={`poster image of the event ${event.title}`}
                                          width={100}
                                          height={100}
                                          className={
                                            "w-full h-[100px] object-cover rounded-xl"
                                          }
                                        />

                                        <div className="">
                                          <h1 className="text-heading1 text-xs font-semibold">
                                            {event.title}
                                          </h1>
                                          <span className="text-xs">
                                            {format(
                                              new Date(event.eventDate),
                                              "dd/MM/yyyy",
                                            )}
                                          </span>
                                        </div>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="flex items-center justify-between">
                                  <Loader
                                    className={"w-6 h-6 text-muted-foreground"}
                                  />
                                </div>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="past">
                            <AccordionTrigger>Past Events</AccordionTrigger>
                            <AccordionContent>
                              {pastEvents.length > 0 ? (
                                <ul className="grid grid-cols-2 gap-2">
                                  {pastEvents.map((event) => (
                                    <li key={event.id} className={"h-full"}>
                                      <a
                                        href={`/events/${event.slug}`}
                                        className="flex flex-col gap-2 group h-full hover:bg-brand-primary duration-300  p-2 bg-muted rounded-xl"
                                      >
                                        <Image
                                          src={event.featuredImageUrl}
                                          alt={`poster image of the event ${event.title}`}
                                          width={100}
                                          height={100}
                                          className={
                                            "w-full h-[100px] object-cover rounded-xl"
                                          }
                                        />

                                        <div className="">
                                          <h1 className="text-heading1 text-xs font-semibold">
                                            {event.title}
                                          </h1>
                                          <span className="text-xs">
                                            {format(
                                              new Date(event.eventDate),
                                              "dd/MM/yyyy",
                                            )}
                                          </span>
                                        </div>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="flex items-center justify-between">
                                  <Loader
                                    className={"w-6 h-6 text-muted-foreground"}
                                  />
                                </div>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              }

              return (
                <a
                  key={item.title}
                  href={item.url}
                  className="flex bg-muted p-2 rounded items-center gap-2 py-2  transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </a>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNav;
