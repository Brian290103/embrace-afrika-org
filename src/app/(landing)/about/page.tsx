import React from "react";
import AboutUsSection from "@/app/(landing)/components/sections/about-us-section";
import OurFocusAreas from "@/app/(landing)/components/sections/our-focus-areas";
import TestimoniesSection from "@/app/(landing)/components/sections/testimonies-section";

const AboutUsPage = () => {
  return (
    <section className={""}>
      <AboutUsSection />
      <OurFocusAreas />
      <TestimoniesSection />
    </section>
  );
};

export default AboutUsPage;
