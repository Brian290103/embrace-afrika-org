export interface NewsType {
  id: string;
  title: string;
  content: string;
  caption: string;
  slug: string;
  featuredImageUrl: string;
  createdAt: string; // Or Date, if you want to parse it as a Date object
}

// Update the type definition
export interface CountriesType {
  id: string;
  name: string;
  slug: string; // Add slug to the type
  flagUrl: string;
  createdAt: string;
  updatedAt: string;
}
export interface SponsorType {
  id: string;
  name: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  createdAt: Date;
}

export interface VisitsType {
  id: string;
  title: string;
  caption: string;
  content: string;
  slug: string;
  placeOfVisit: string;
  featuredImageUrl: string | null;
  dateOfVisit: string;
  createdAt: string;
}

export interface ModelsType {
  id: string;
  name: string;
  countryId: string;
  slug: string;
  featuredProfileImageUrl: string | null;
  bio: string | null;
  createdAt: string;
}

export interface PageantExperience {
  id: string;
  modelId: string;
  eventName: string;
  location: string;
  eventDate: string; // Could also be Date, depending on your needs
  createdAt: string;
}

export interface EventsType {
  id: string;
  slug: string;
  title: string;
  caption: string;
  content: string;
  eventDate: string;
  featuredImageUrl: string;
  eventLocation: string;
  createdAt: string;
}
export interface EventRegistrationType {
  id: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  heightCm?: string;
  country: string;
  city: string;
  address: string;
  instagramProfile?: string;
  profileImage1?: string;
  profileImage2?: string;
  createdAt: string;
}

export interface GalleryType {
  id: string;
  title: string;
  caption: string;
  mediaUrl: string;
  type: "image" | "video";
  modelId: string | null;
  eventId: string | null;
  visitsId: string | null;
  createdAt: string;
}

// Define the TestimonyType interface
export interface TestimonyType {
  id: string;
  username: string;
  occupation: string;
  message: string;
  profileImageUrl: string | null;
  createdAt: string | null; // Or Date, if you want to parse it as a Date object
}
