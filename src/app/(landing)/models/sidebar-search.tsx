import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

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

const SidebarSearch: React.FC<SidebarSearchProps> = ({ delegates }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const groupedDelegates = useMemo(() => {
    const delegateMap = new Map<string, Delegate[]>();

    delegates.forEach((delegate) => {
      // Search both by delegate name and country name
      const searchKey = searchTerm
        ? delegate.name.toLowerCase().includes(searchTerm.toLowerCase())
          ? delegate.name.charAt(0).toUpperCase()
          : delegate.country.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ? delegate.country.name.charAt(0).toUpperCase()
            : null
        : delegate.name.charAt(0).toUpperCase();

      if (searchKey) {
        // Only add to map if it matches search
        if (!delegateMap.has(searchKey)) {
          delegateMap.set(searchKey, []);
        }
        delegateMap.get(searchKey)!.push(delegate);
      }
    });

    delegateMap.forEach((delegatesArray) => {
      delegatesArray.sort((a, b) => a.name.localeCompare(b.name));
    });

    const sortedGroups = Array.from(delegateMap.entries())
      .sort(([aLetter], [bLetter]) => aLetter.localeCompare(bLetter))
      .map(([letter, delegatesArray]) => ({
        letter,
        delegates: delegatesArray,
      }));

    return sortedGroups;
  }, [delegates, searchTerm]); // Add searchTerm as dependency

  return (
    <div className="w-full">
      <div className="flex items-center border-b pb-3">
        <input
          type="text"
          className="focus:;border-none flex-grow border-none px-3 py-2 outline-none focus:outline-none"
          placeholder="Search Here..."
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
            <div key={group.letter}>
              <h2 className="font-heading font-semibold">{group.letter}</h2>
              <div className="mt-1 w-4 bg-black p-0.5"></div>
              <ul className="mt-2">
                {group.delegates.map((delegate) => (
                  <li key={delegate.slug} className="py-1">
                    <Link
                      href={`/models/${delegate.slug}`} //  Use regular anchor tag
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

export default SidebarSearch;
