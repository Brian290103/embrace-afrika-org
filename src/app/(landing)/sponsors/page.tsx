import React from "react";
import SponsorsSection from "@/app/(landing)/components/sections/SponsorsSection";

const AboutUsPage = () => {
  return (
    <section className={""}>
      <SponsorsSection />
      <SponsorsSection direction={"right"} />
      <SponsorsSection direction={"left"} />
    </section>
  );
};

export default AboutUsPage;
