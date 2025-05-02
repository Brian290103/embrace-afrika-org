"use client";

import React, { useEffect, useState } from "react";

import ModelsCard from "@/app/(landing)/components/cards/models-cards";
import { ClientModel } from "@/typings-client";
import { Search } from "lucide-react";
import SidebarSearch from "./sidebar-search";
import SidebarSearchCountry from "./sidebar-search-country";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterDelegatesDropdown } from "@/app/(landing)/models/filter-models-dropdown";

const ModelsList = ({ models }: { models: ClientModel[] }) => {
  const [delegates, setDelegates] = useState(models);

  // Use useEffect to update delegates when models prop changes
  useEffect(() => {
    setDelegates(models);
  }, [models]);

  return (
    <div className={"w-full py-5"}>
      <div className="px-2">
        {/* Mobile Search */}
        <div className="w-full lg:hidden">
          {/* Search by Name */}
          <Sheet>
            <SheetHeader className={"sr-only"}>
              <SheetTitle>Search Model here</SheetTitle>
              <SheetDescription>Search Model here</SheetDescription>
            </SheetHeader>
            <SheetTrigger className="w-full">
              <div className="mb-2 flex w-full items-center border-b bg-white px-2 pb-3 pt-2">
                <input
                  type="text"
                  className="flex-grow border-none px-3 py-2 outline-none"
                  placeholder="Search by Name..."
                />
                <Search className="ml-2" />
              </div>
            </SheetTrigger>
            <SheetContent className="p-0" side="top">
              <div className="scrollbar-none max-h-screen overflow-auto px-5 py-10">
                <SidebarSearch delegates={delegates} />
              </div>
            </SheetContent>
          </Sheet>

          {/* Search by Country */}
          <Sheet>
            <SheetHeader className={"sr-only"}>
              <SheetTitle>Search Model here</SheetTitle>
              <SheetDescription>Search Model here</SheetDescription>
            </SheetHeader>
            <SheetTrigger className="w-full">
              <div className="mb-2 flex w-full items-center border-b bg-white px-2 pb-3 pt-2">
                <input
                  type="text"
                  className="flex-grow px-3 py-2 outline-none"
                  placeholder="Search by Country..."
                />
                <Search className="ml-2" />
              </div>
            </SheetTrigger>
            <SheetContent className="p-0" side="top">
              <div className="scrollbar-none max-h-screen overflow-auto px-5 py-10">
                <SidebarSearchCountry delegates={delegates} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Layout */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {/* Sidebar (Desktop) */}
          <aside className="hidden h-full w-full border bg-white p-3 lg:flex">
            <div className="sticky top-20 left-0 right-0">
              <SidebarSearch delegates={delegates} />
            </div>
          </aside>

          {/* Main Content */}
          <article className="flex flex-col gap-3 md:col-span-2 lg:col-span-3">
            <div className="flex flex-col items-center justify-between gap-3 rounded-xl bg-white px-2 py-4 sm:flex-row">
              <h1 className="text-center font-heading3 font-semibold tracking-widest sm:text-start">
                Models
              </h1>
              <FilterDelegatesDropdown
                setDelegates={setDelegates}
                delegates={delegates}
                allDelegates={models}
              />
            </div>

            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 grid gap-3 p-3">
              {delegates.map((item, index) => (
                <li className={""} key={index}>
                  <ModelsCard model={item} />
                </li>
              ))}
            </ul>
          </article>

          {/* Sidebar Country Search (Desktop) */}
          <aside className="hidden h-full  w-full border bg-white p-3 lg:flex">
            <div className="sticky right-0 top-20 left-0">
              <SidebarSearchCountry delegates={delegates} />
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default ModelsList;
