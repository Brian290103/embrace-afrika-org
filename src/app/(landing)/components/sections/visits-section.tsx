import React from "react";
import { EventsType } from "@/typings";
import HeaderTitle from "@/app/(landing)/components/header-title";
import VisitsCarousel from "@/app/(landing)/components/visits-carousel";
import { getVisits } from "@/actions/visitAction";

const VisitsSection = async () => {
  const visits: EventsType[] = await getVisits();

  console.log(visits);
  return (
    <div>
      <HeaderTitle
        title="Visits & Journeys"
        bg={true}
        url={"/visits"}
        subtitle="Take a look at the remarkable places Embrace Afrika has traveled with its models—capturing stories, culture, and fashion from every destination."
      />

      <article className="w-full py-5 items-center px-3 mx-auto max-w-7xl ms-auto">
        <VisitsCarousel visits={visits} />
      </article>
    </div>
  );
};

export default VisitsSection;
