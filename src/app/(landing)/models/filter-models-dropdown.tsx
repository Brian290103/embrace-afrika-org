"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";

interface Country {
  id: string;
  name: string;
  flagUrl: string;
}

interface Delegate {
  id: string;
  name: string;
  slug: string;
  featuredProfileImageUrl: string;
  bio: string;
  createdAt: string;
  country: Country;
  pageantExperiences: any[]; // Replace 'any' with a more specific type if available
  gallery: any[]; // Replace 'any' with a more specific type if available
}

interface FilterDelegatesDropdownProps {
  delegates: Delegate[];
  setDelegates: React.Dispatch<React.SetStateAction<Delegate[]>>;
  allDelegates: Delegate[];
}
export const FilterDelegatesDropdown: React.FC<
  FilterDelegatesDropdownProps
> = ({ setDelegates, allDelegates }) => {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Extract unique countries from the delegates list
  const countries = useMemo(() => {
    const uniqueCountries = new Map<string, Country>(); // Use a Map for efficient lookup
    allDelegates.forEach((delegate) => {
      const countryId = delegate.country.id;
      if (!uniqueCountries.has(countryId)) {
        uniqueCountries.set(countryId, delegate.country);
      }
    });
    return Array.from(uniqueCountries.values()); // Get an array of Country objects
  }, [allDelegates]);

  const handleSelect = (country: Country | null) => {
    setSelectedCountry(country);
    setOpen(false);

    if (!country) {
      // Show all delegates when "All Countries" is selected
      setDelegates(allDelegates);
    } else {
      // Filter delegates by selected country.  Use .id for comparison
      setDelegates(
        allDelegates.filter((delegate) => delegate.country.id === country.id),
      );
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex w-[250px] justify-between">
          {selectedCountry ? selectedCountry.name : "Select Country..."}
          <ChevronsUpDown className="ml-2 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {/* Option to show all delegates */}
              <CommandItem onSelect={() => handleSelect(null)}>
                🌍 All Countries
                <Check
                  className={
                    selectedCountry === null
                      ? "ml-auto opacity-100"
                      : "opacity-0"
                  }
                />
              </CommandItem>
              {/* Country list */}
              {countries.map((country) => (
                <CommandItem
                  key={country.id}
                  onSelect={() => handleSelect(country)}
                >
                  <Image
                    src={country.flagUrl}
                    alt={`the flag of ${country.name}`}
                    width={18}
                    height={18}
                    className={"rounded-xs"}
                  />
                  {country.name}
                  <Check
                    className={
                      selectedCountry?.id === country.id
                        ? "ml-auto opacity-100"
                        : "opacity-0"
                    }
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
