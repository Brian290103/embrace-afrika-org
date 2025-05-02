"use client";

import React from "react";
import { VisitsType } from "@/typings";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface VisitsCarouselProps {
  visits: VisitsType[];
}

export default function VisitsCarousel({ visits }: VisitsCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <div className="py-3 flex relative items-center gap-3 justify-center">
        <CarouselPrevious className={"top-0 left-0 translate-y-0 relative"} />
        <CarouselNext className={"top-0 left-0 translate-y-0 relative"} />
      </div>
      <CarouselContent>
        {visits.map((visit) => (
          <CarouselItem key={visit.id} className={`sm:basis-1/2 lg:basis-1/3`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-1"
            >
              <div className="w-full flex flex-col gap-3">
                <div className="h-[350px] relative overflow-hidden w-full rounded-xl">
                  <Image
                    src={visit.featuredImageUrl}
                    alt={`${visit.title} poster image`}
                    width={1000}
                    height={1000}
                    className={"w-full h-full object-cover"}
                  />
                  <div className="absolute font-numeric bottom-2 left-2 px-6 py-3 bg-brand-primary rounded-xl flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-semibold">
                      {format(new Date(visit.dateOfVisit), "dd")}
                    </h1>
                    <h1 className="text-sm font-semibold">
                      {format(new Date(visit.dateOfVisit), "MMM")}
                    </h1>
                  </div>
                </div>
                <div className={"p-3 flex gap-1 bg-muted rounded-xl flex-col"}>
                  <h1 className="font-semibold text-lg font-heading1 tracking-wider">
                    {visit.title}
                  </h1>
                  <p className="text-muted-foreground">{visit.caption}</p>
                  <div className="w-full flex items-center pt-3 justify-end">
                    <Link href={`/visits/${visit.slug}`}>
                      <Button
                        className={
                          "bg-brand-primary text-black hover:bg-brand-primary/60"
                        }
                      >
                        Read More
                        <ArrowRight />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
