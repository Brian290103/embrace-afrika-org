import Link from "next/link";
import { SocialAccounts } from "@/data/social-accounts";
import Image from "next/image";
import React from "react";

const footerLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Models",
    url: "/models",
  },
  {
    name: "Events",
    url: "#",
  },
  {
    name: "Contact",
    url: "/contact",
  },
];
const Footer = () => {
  return (
    <footer className={"border-t px-2 py-5"}>
      <div className="flex w-full flex-col items-center gap-5 border-b py-3">
        {/*GRID 1*/}
        <div className="flex flex-col items-center justify-center gap-3">
          <Link href={"/"} className="">
            <img
              src={`/logo.png`}
              alt="Embrace Afrika Logo"
              className="h-20 object-cover"
            />
          </Link>
          <h1 className="font-fun text-center text-xl font-semibold sm:text-3xl md:text-4xl">
            Embrace Afrika
          </h1>
          <p className="font-heading text-center text-sm">
            A platform driving a revolution that constantly seeks to promote
            Excellence, Diversity, Beauty, Fashion, Tourism, and Culture.
          </p>
        </div>

        <ul className="flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
          {footerLinks.map((link, index) => (
            <li key={index} className="text-center sm:p-2">
              <Link
                href={link.url}
                className="hover:text-primary hover:underline"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex items-center gap-2">
          {SocialAccounts.map((social, index) => (
            <li key={index}>
              <Link href={social.url} target="_blank" rel="noreferrer">
                <Image
                  className={"hover:scale-125 duration-300"}
                  src={social.icon}
                  alt={social.title}
                  width={30} // Adjust size as needed
                  height={30}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      `
      <div className="flex w-full items-center justify-center pt-5">
        <p className="font-heading text-sm">
          &copy; {new Date().getFullYear()} Embrace Afrika. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
