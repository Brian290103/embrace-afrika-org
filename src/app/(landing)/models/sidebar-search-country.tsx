import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

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
  pageantExperiences: any[];
  gallery: any[];
}

interface SidebarSearchProps {
  delegates: Delegate[];
}

const SidebarSearchCountry: React.FC<SidebarSearchProps> = ({ delegates }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const groupedDelegates = useMemo(() => {
    const countryMap = new Map<
      string,
      { name: string; delegates: Delegate[] }
    >();

    delegates.forEach((delegate) => {
      const countryName = delegate.country.name;

      if (!countryMap.has(countryName)) {
        countryMap.set(countryName, {
          name: countryName,
          delegates: [],
        });
      }
      countryMap.get(countryName)!.delegates.push(delegate);
    });

    // Sort delegates within each country
    countryMap.forEach((group) => {
      group.delegates.sort((a, b) => a.name.localeCompare(b.name));
    });

    const sortedGroups = Array.from(countryMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    return sortedGroups.filter((group) => {
      if (!searchTerm) return true;
      const lowerSearchTerm = searchTerm.toLowerCase();
      return (
        group.delegates.some((delegate) =>
          delegate.name.toLowerCase().includes(lowerSearchTerm),
        ) || group.name.toLowerCase().includes(lowerSearchTerm)
      );
    });
  }, [delegates, searchTerm]);

  return (
    <div className="w-full">
      <div className="flex items-center border-b pb-3">
        <input
          type="text"
          className="flex-grow border-none px-3 py-2 outline-none focus:border-none focus:outline-none"
          placeholder="Search by Country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="ml-2" />
      </div>

      <div className="mt-4">
        {groupedDelegates.length === 0 ? (
          <p className="text-center text-gray-500">No models found.</p>
        ) : (
          groupedDelegates.map((group) => (
            <div key={group.name}>
              <h2 className="font-heading font-semibold">{group.name}</h2>
              <div className="mt-1 w-4 bg-black p-0.5"></div>
              <ul className="mt-2">
                {group.delegates.map((delegate) => (
                  <li key={delegate.slug} className="py-1">
                    <Link
                      href={`/models/${delegate.slug}`}
                      className="flex w-full items-center justify-between py-1 text-sm transition duration-300 hover:text-gold"
                    >
                      <span>{delegate.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SidebarSearchCountry;
