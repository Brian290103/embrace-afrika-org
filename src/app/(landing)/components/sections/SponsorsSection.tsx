import Marquee from "react-fast-marquee";
import { getSponsors } from "@/actions/sponsorsAction";
import { SponsorType } from "@/typings";
import Image from "next/image";
import HeaderTitle from "@/app/(landing)/components/header-title";

// Import image components directly (assuming they are in the assets directory)

const SponsorsSection = async ({ direction }) => {
  const sponsors: SponsorType[] = await getSponsors();
  return (
    <section className={"flex flex-col w-full gap-5"}>
      {!direction && (
        <HeaderTitle
          url={"/sponsors"}
          title={"Our Valued Sponsors"}
          subtitle={"Powering our mission through collaboration."}
        />
      )}
      <section className="mx-auto w-full pb-10 pt-5">
        <Marquee direction={direction || "left"} autoFill>
          {sponsors.map((sponsor, index) => (
            <Image
              key={index}
              src={sponsor.logoUrl}
              alt={sponsor.name}
              className="px-2 w-full h-14 object-cover md:h-20"
              width={100}
              height={80}
            />
          ))}
        </Marquee>
      </section>
    </section>
  );
};

export default SponsorsSection;
