import React from "react";
import HeroSection from "@/app/(landing)/components/sections/hero-section";
import OurModelsSection from "@/app/(landing)/components/sections/our-models-section";
import GallerySection from "@/app/(landing)/components/sections/gallery-section";
import EventsSection from "@/app/(landing)/components/sections/events-section";
import VisitsSection from "@/app/(landing)/components/sections/visits-section";
import AboutUsSection from "@/app/(landing)/components/sections/about-us-section";
import OurFocusAreas from "@/app/(landing)/components/sections/our-focus-areas";
import LatestNewsSection from "@/app/(landing)/components/sections/latest-news-section";
import SponsorsSection from "@/app/(landing)/components/sections/SponsorsSection";
import TestimoniesSection from "@/app/(landing)/components/sections/testimonies-section";
import MissTourismGlobal2025 from "../components/sections/miss-tourism-global-2025";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <MissTourismGlobal2025 />
      <OurModelsSection />
      <EventsSection />
      <VisitsSection />
      <GallerySection />
      <AboutUsSection />
      <OurFocusAreas />
      <TestimoniesSection />
      <LatestNewsSection />
      <SponsorsSection />
    </div>
  );
};

export default HomePage;
