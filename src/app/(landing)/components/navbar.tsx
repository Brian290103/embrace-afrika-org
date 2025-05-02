"use client";

import React, { useState } from "react";

// Import Button component (assuming it's in the same file or adjust the path)
import { FlyOutItem } from "@/app/(landing)/components/flyout-item";
import Link from "next/link";
import navItems from "@/data/nav-items"; // <--- Import statement added

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hoverItem, setHoverItem] = useState<any>(null);

  return (
    <nav
      className={`z-50 hidden lg:flex sticky top-0 left-0 right-0 w-full bg-brand-primary items-center justify-center`}
    >
      <ul className={`w-full flex items-center justify-center `}>
        {navItems.map(({ icon, title, url, component }, index) => {
          return (
            <li key={index} className="flex">
              {component ? (
                <>
                  <FlyOutItem
                    open={open}
                    setHoverItem={setHoverItem}
                    hoverItem={hoverItem}
                    scrolling={false}
                    item={{
                      title,
                      link: url,
                      component,
                    }}
                  />
                </>
              ) : (
                <Link
                  href={url}
                  className={`p-5 text-base hover:bg-white relative flex `}
                >
                  {title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      {/* <ProgressBarIndicator /> */}
    </nav>
  );
};

export default Navbar;
