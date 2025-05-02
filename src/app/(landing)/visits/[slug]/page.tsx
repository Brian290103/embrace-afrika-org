import React from "react";
import ClientVisitDetails from "@/app/(landing)/visits/[slug]/details";
import HeaderTitle from "@/app/(landing)/components/header-title";
import { VisitsType } from "@/typings";
import { getVisitsBySlug } from "@/actions/visitAction";

const VisitDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const visit: VisitsType = await getVisitsBySlug(params.slug);
  console.log(visit);
  return (
    <section className={"w-full flex flex-col gap-3"}>
      <HeaderTitle title={visit.title} subtitle={visit.caption} />
      <ClientVisitDetails visit={visit} />
    </section>
  );
};

export default VisitDetailsPage;
