import React from "react";
import Image from "next/image";
import { SocialAccounts } from "@/data/social-accounts";
import Link from "next/link";
import TranslateComponent from "@/app/(landing)/components/translate-component";

const TopNavbar = () => {
  return (
    <header className={"w-full p-3  flex items-center justify-between gap-3"}>
      <Link href={"/"}>
        <Image
          src={"/logo.png"}
          alt={"Embrace Afrika logo"}
          width={100}
          height={100}
        />
      </Link>

      <Link
        href={"/"}
        className="font-fun hidden md:flex xl:text-7xl lg:text-6xl md:text-5xl text-4xl  font-semibold"
      >
        EmbraceAfrika
      </Link>

      <ul className="flex gap-2">
        <li className="">
          <TranslateComponent />
        </li>
        {SocialAccounts.map((social) => (
          <li key={social.title}>
            <a href={social.url} target="_blank">
              <Image
                className={"hover:scale-125 duration-300"}
                src={social.icon}
                alt={social.title}
                width={30} // Adjust size as needed
                height={30}
              />
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default TopNavbar;
