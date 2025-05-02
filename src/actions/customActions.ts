"use server";

interface Country {
  code: string;
  name: string;
  flag: string;
}

export const fetchAfricanCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/region/africa",
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: any[] = await response.json();

    const africanCountries: Country[] = data.map((country) => ({
      code: country.cca2, // ISO Alpha-2 country code
      name: country.name.common, // Common name of the country
      flag: country.flags.svg, // Get SVG flag URL
    }));
    return africanCountries;
  } catch (error) {
    console.error("Error fetching African countries:", error);
    return []; // Important: Return an empty array or handle the error as appropriate for your app
  }
};
