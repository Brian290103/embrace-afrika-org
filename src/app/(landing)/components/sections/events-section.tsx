import React from "react";
import { getEvents } from "@/actions/eventAction";
import { EventType } from "@/typings";
import HeaderTitle from "@/app/(landing)/components/header-title";
import EventsCarousel from "@/app/(landing)/components/events-carousel";

const EventsSection = async () => {
  const events: EventType[] = await getEvents();
  return (
    <div>
      <HeaderTitle
        title="Our Events"
        bg={true}
        url={"/events"}
        subtitle="Explore upcoming and past events that showcase African culture, talent, and beauty"
      />
      <article className="w-full lg:grid grid-cols-4 gap-3 py-5 items-center px-3 mx-auto max-w-7xl ms-auto">
        <div className="lg:hidden">
          <h1 className="font-semibold font-heading1 text-2xl sm:text-3xl">
            Our Upcoming Events
          </h1>
          <p className="pt-3">
            Join us as we prepare to celebrate the beauty, strength, and
            diversity of African culture through a series of upcoming events.
            From grand pageants to community outreach programs, each occasion is
            an opportunity to embrace our heritage, empower our models, and
            connect with sponsors, communities, and change-makers. Stay tuned
            for unforgettable experiences that highlight African pride and
            elegance.
          </p>
        </div>

        <aside className=" hidden lg:flex h-full justify-center flex-col gap-3 p-5 rounded-xl bg-brand-primary">
          <h1 className="font-semibold font-heading1 text-3xl">
            Our Upcoming Events
          </h1>
          <p className="">
            Join us as we prepare to celebrate the beauty, strength, and
            diversity of African culture through a series of upcoming events.
            From grand pageants to community outreach programs, each occasion is
            an opportunity to embrace our heritage, empower our models, and
            connect with sponsors, communities, and change-makers. Stay tuned
            for unforgettable experiences that highlight African pride and
            elegance.
          </p>
        </aside>

        <div className="w-full col-span-3">
          <EventsCarousel events={events} type={"upcoming"} />
        </div>
      </article>

      <article className="w-full py-5 items-center px-3 mx-auto max-w-7xl ms-auto">
        <div className="">
          <h1 className="font-semibold font-heading1 text-2xl sm:text-3xl">
            Our Past Events
          </h1>
          <p className="pt-3">
            Take a walk through our legacy of excellence with documented past
            events that reflect the vibrant essence of African culture. From
            breathtaking runway moments to impactful community visits and
            powerful collaborations, our past events tell a story of passion,
            tradition, and progress. Revisit these moments and witness how
            Embrace Afrika continues to inspire and uplift through every
            gathering.
          </p>
        </div>
        <div className="w-full ">
          <EventsCarousel events={events} type={"past"} />
        </div>
      </article>
    </div>
  );
};

export default EventsSection;
