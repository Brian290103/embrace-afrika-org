import React, { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CustomButtonProps {
  text: string;
  url?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  url = "/",
  className = "",
  onClick,
}) => {
  return (
    <Link
      href={url}
      onClick={onClick}
      className={cn(className, "group relative w-full sm:w-fit")}
    >
      <div className="relative z-10 rounded-xl bg-brand-primary/80 px-8 py-5 font-heading2 text-sm font-semibold uppercase tracking-wider sm:px-10 sm:py-5 sm:text-base">
        {text}
      </div>
      <div className="absolute bottom-0 left-0 top-0 h-full rounded-xl bg-brand-primary p-2 duration-300 group-hover:w-full"></div>
    </Link>
  );
};

export default CustomButton;
