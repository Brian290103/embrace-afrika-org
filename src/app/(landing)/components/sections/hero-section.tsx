"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "@/app/(landing)/components/custom-buttons";

// Moved fetchAfricanCountries inside the component
const HeroSection = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAfricanCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/region/africa",
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: any[] = await response.json();

        const africanCountries: Country[] = data.map((country) => ({
          code: country.cca2,
          name: country.name.common,
          flag: country.flags.svg,
        }));
        setCountries(africanCountries);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAfricanCountries();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      {/* Background Video */}
      <video
        className="absolute left-0 top-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        src="https://res.cloudinary.com/doouqrlsg/video/upload/v1740323353/WhatsApp_Video_2025-02-23_at_14.33.43_206a674d_ziockr.mp4"
      />
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5 bg-black/60">
        <h1 className="font-heading3 text-2xl font-semibold tracking-wider text-white">
          Welcome to:
        </h1>
        <h1 className="text-center font-heading1 text-4xl font-semibold uppercase tracking-widest text-brand-primary md:text-7xl">
          Embrace Afrika
        </h1>
        <p className="w-full max-w-4xl p-2 text-center font-display text-xl text-white md:text-2xl">
          A platform driving a revolution that constantly seeks to promote
          Excellence, Diversity, Beauty, Fashion, Tourism, and Culture.
        </p>

        {/* Marquee with African country flags */}
        <div className="w-full overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {countries.map((country) => (
              <img
                key={country.code}
                src={country.flag}
                title={country.name}
                alt={country.name}
                className="mx-2 h-14 w-20 object-cover md:h-20 md:w-32"
              />
            ))}
            {/* Duplicate content for seamless loop */}
            {countries.map((country) => (
              <img
                key={`${country.code}-dup`}
                src={country.flag}
                title={country.name}
                alt={country.name}
                className="mx-2 h-14 w-20 object-cover md:h-20 md:w-32"
              />
            ))}
          </div>
          <style jsx global>{`
            @keyframes marquee {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-100%);
              } /* Or a calculated value based on item widths */
            }
            .animate-marquee {
              animation: marquee 20s linear infinite; /* Adjust duration as needed */
            }
          `}</style>
        </div>

        <div className="flex flex-col items-center gap-3 p-2 sm:flex-row">
          <CustomButton text="Explore Models" url="/models" />
          <CustomButton text="Discover More" url="/about" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

interface Country {
  code: string;
  name: string;
  flag: string;
}
