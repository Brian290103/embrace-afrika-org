import HeaderTitle from "@/app/(landing)/components/header-title";
import SmallTitle from "@/app/(landing)/components/small-title";
import Image from "next/image";

const AboutUsSection = () => {
  return (
    <div className="mx-auto w-full flex flex-col gap-5">
      <HeaderTitle
        title="About Us"
        url="/about"
        subtitle="Building a Platform for Excellence"
      />
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 p-2 md:grid-cols-2">
        <article className="flex flex-col gap-3">
          <p className="text-sm md:text-base">
            Embrace Afrika is a vibrant organization dedicated to empowering
            aspiring models while celebrating African fashion, culture, tourism,
            and heritage. We believe that talent deserves a platform, and we are
            committed to providing opportunities for individuals to showcase
            their unique style and potential.
          </p>
          <p className="text-sm md:text-base">
            Our mission is to nurture creativity, build confidence, and promote
            diversity within the fashion and creative industry. We are
            passionate about preserving African traditions through fashion and
            empowering the next generation of models to embrace their identity
            with pride.
          </p>

          <SmallTitle title="Our Vision" />
          <p className="text-sm md:text-base">
            To be the leading platform that celebrates African culture, tourism,
            and heritage through fashion, empowering youths to inspire and
            influence the world.
          </p>

          <SmallTitle title="Our Mission" />
          <p className="text-sm md:text-base">
            To revolutionize the fashion and creative industry by promoting
            excellence, diversity, and cultural pride. We aim to showcase the
            beauty of African fashion and heritage while nurturing talent,
            creativity, and confidence.
          </p>
        </article>
        <article>
          <Image
            src="https://res.cloudinary.com/doouqrlsg/image/upload/v1740705582/banner2-p0J8ZNBt_lpjgmm.jpg"
            alt="Embrace Afrika - Celebrating African Fashion & Culture"
            className="w-full rounded-xl object-cover"
            width={1000}
            height={800}
          />
        </article>
      </section>
    </div>
  );
};

export default AboutUsSection;
