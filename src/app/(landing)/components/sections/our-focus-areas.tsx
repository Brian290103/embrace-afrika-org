import Image from "next/image";
import HeaderTitle from "@/app/(landing)/components/header-title";

const embraceAfrikaSpecs = [
  {
    title: "EXCELLENCE",
    imageSrc: "/icons/reputation.png",
    description: "Striving for the highest standards in all that we do.",
  },
  {
    title: "DIVERSITY",
    imageSrc: "/icons/diversity.png",
    description: "Celebrating the richness of African cultures and people.",
  },
  {
    title: "BEAUTY",
    imageSrc: "/icons/makeup.png",
    description: "Recognizing and promoting the diverse expressions of beauty.",
  },
  {
    title: "FASHION",
    imageSrc: "/icons/search.png", // Ensure this fits or replace with a better one
    description:
      "Showcasing the latest trends and creative talents in African fashion.",
  },
  {
    title: "TOURISM",
    imageSrc: "/icons/beach.png",
    description:
      "Promoting the beauty and cultural richness of African destinations.",
  },
  {
    title: "CULTURE",
    imageSrc: "/icons/vase.png",
    description:
      "Preserving and celebrating the diverse traditions and artistic expressions of Africa.",
  },
];

const OurFocusAreas = () => {
  return (
    <div className="pb-10">
      <div className="w-full flex flex-col gap-5">
        <HeaderTitle
          url="/about"
          title="Our Focus Areas"
          subtitle="Empowering African Excellence and Celebrating Rich Cultural Heritage"
        />

        <ul className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-2 md:grid-cols-2 lg:grid-cols-3">
          {embraceAfrikaSpecs.map((spec) => (
            <li key={spec.title} className="border bg-white p-4">
              <div className="flex flex-col items-center">
                <Image
                  src={spec.imageSrc}
                  alt={spec.title}
                  width={100}
                  height={100}
                  className="h-12 w-12"
                />
                <h3 className="mt-2 font-heading3 font-semibold tracking-widest">
                  {spec.title}
                </h3>
                <p className="mt-1 text-center text-sm">{spec.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OurFocusAreas;
