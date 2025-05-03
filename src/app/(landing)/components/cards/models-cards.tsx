"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ClientModel } from "@/typings-client";
import Link from "next/link";

const ModelsCard = ({ model }: { model: ClientModel }) => {
  // Extract image URLs
  const imageUrls: string[] = [
    model.featuredProfileImageUrl,
    ...model.gallery
      .filter((item) => item.type === "image")
      .map((item) => item.mediaUrl),
  ];

  // Log the array of image URLs
  useEffect(() => {
    console.log("Image URLs:", imageUrls);
  }, [imageUrls]); // Dependency array ensures this runs when imageUrls changes

  return (
    <div
      className={
        "rounded-xl group hover:bg-brand-primary duration-300 bg-muted flex flex-col  overflow-hidden"
      }
    >
      <div className="">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full "
        >
          <div className="absolute group  bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center p-2 ">
            <div className="relative z-10 flex w-full items-center justify-between">
              <CarouselPrevious className="relative left-0 right-0 z-20 translate-y-0 opacity-0 duration-300 group-hover:opacity-100" />
              <CarouselNext className="relative left-0 right-0 z-20 translate-y-0 opacity-0 duration-300 group-hover:opacity-100" />
            </div>
          </div>
          <CarouselContent>
            {imageUrls.map((item, index) => (
              <CarouselItem key={index} className="">
                <div className="relative">
                  <div className="absolute top-2 right-2 overflow-hidden rounded-xs">
                    <Image
                      src={model.country.flagUrl}
                      alt={`a flag of ${model.country.name}`}
                      width={30}
                      height={24}
                    />{" "}
                  </div>
                  <Image
                    src={item}
                    alt={`an image of ${model.name}`}
                    width={200}
                    height={200}
                    className={"w-full rounded-t-xl h-[350px] object-cover"}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <Link
        href={`/models/${model.slug}`}
        className="px-5 py-3 flex duration-300 group-hover:bg-brand-primary items-center justify-center flex-col"
      >
        <h1 className="font-heading3 font-semibold uppercase">
          {model.country.name}
        </h1>
        <h1 className="font-emibold">{model.name}</h1>
      </Link>
    </div>
  );
};

export default ModelsCard;
