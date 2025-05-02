import Link from "next/link";
import React from "react";

interface HeaderTitleProps {
  title: string;
  subtitle?: string;
  url?: string;
  bg?: boolean;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  title,
  subtitle,
  url = "#",
  bg = true,
}) => {
  return (
    <div className={""}>
      <section className={`${bg && "bg-brand-primary"}`}>
        <div
          className={
            "mx-auto  flex w-full max-w-7xl flex-col items-center justify-center gap-5 px-3 py-5"
          }
        >
          <Link
            href={url}
            className="font-heading1 font-semibod text-center text-4xl uppercase tracking-widest hover:italic sm:text-7xl"
          >
            {title}
          </Link>
          {subtitle && (
            <p className="font-heading2 w-full text-center">{subtitle}</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HeaderTitle;
