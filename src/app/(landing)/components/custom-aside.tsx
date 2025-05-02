import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CustomAside = ({ title, description, link }) => {
  return (
    <div>
      <aside className="bg-brand-primary flex flex-col gap-5  min-h-[300px] justify-center p-3">
        <h1 className="font-heading3 px-4 text-xl font-semibold">Our Models</h1>
        <p className="px-4">Long Paragraph</p>
        <Link
          href={"/models"}
          className="flex w-full p-4 hover:bg-white items-center group gap-3 justify-between"
        >
          <span className="">Read More</span>
          <ArrowRight className={"group-hover:translate-x-2 duration-300"} />
        </Link>
      </aside>
    </div>
  );
};

export default CustomAside;
