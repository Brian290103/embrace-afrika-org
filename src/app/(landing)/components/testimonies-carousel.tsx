import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";
import { TestimonyType } from "@/typings";

const TestimoniesCarousel = ({
  testimonies,
}: {
  testimonies: TestimonyType[];
}) => {
  return (
    <div className={"w-full"}>
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="mx-auto w-full max-w-5xl"
      >
        <div className="relative flex w-full items-center justify-center gap-3 pb-4">
          <CarouselPrevious className="relative left-0 right-0 translate-y-0" />
          <CarouselNext className="relative left-0 right-0 translate-y-0" />
        </div>
        <CarouselContent>
          {testimonies.map((testimony, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="p-2">
                <div className="h-full">
                  <div className="grid grid-cols-1 flex-col items-center justify-center gap-3 text-center md:grid-cols-6 md:p-6">
                    {/* PREV IMAGE */}
                    <div className="relative hidden h-full border md:block">
                      <div className="absolute left-0 right-0 h-full w-full bg-brand-primary/50"></div>
                      <img
                        src={
                          testimonies[
                            (index - 1 + testimonies.length) %
                              testimonies.length
                          ].profileImageUrl
                        }
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* MAIN SECTION */}
                    <div className="grid grid-cols-3 border border-s-8 border-s-brand-primary md:col-span-4">
                      <div className="border">
                        <img
                          src={testimony.profileImageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="col-span-2 flex flex-col items-start gap-3 px-2 py-10 sm:px-5">
                        <Quote className="h-12 w-12 text-brand-primary sm:h-16 sm:w-16" />
                        <p className="text-start font-heading text-base sm:text-lg">
                          {testimony.message}
                        </p>
                        <h3 className="font-fun text-2xl font-semibold sm:text-4xl">
                          {testimony.username}
                        </h3>
                        <p className="text-md font-medium text-gray-500">
                          {testimony.occupation}
                        </p>
                      </div>
                    </div>

                    {/* NEXT IMAGE */}
                    <div className="relative hidden h-full border md:block">
                      <div className="absolute left-0 right-0 h-full w-full bg-brand-primary/50"></div>
                      <img
                        src={
                          testimonies[(index + 1) % testimonies.length]
                            .profileImageUrl
                        }
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TestimoniesCarousel;
