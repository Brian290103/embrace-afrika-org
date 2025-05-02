import HeaderTitle from "@/app/(landing)/components/header-title";
import TestimoniesCarousel from "@/app/(landing)/components/testimonies-carousel";
import { getTestimonies } from "@/actions/testimonyActions";
import { TestimonyType } from "@/typings";

const TestimoniesSection = async () => {
  const testimonies: TestimonyType[] = await getTestimonies();
  return (
    <div className={"flex flex-col gap-5 w-full"}>
      <HeaderTitle
        url={"/about"}
        title={"What Our Stars Say"}
        subtitle={"Discover the personal stories and insights from our models."}
      />

      <section className="mx-auto w-full max-w-7xl">
        <TestimoniesCarousel testimonies={testimonies} />
      </section>
    </div>
  );
};

export default TestimoniesSection;
