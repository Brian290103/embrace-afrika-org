export interface ClientModel {
  id: string;
  name: string;
  slug: string;
  featuredProfileImageUrl: string;
  bio: string;
  createdAt: string;
  country: {
    id: string;
    name: string;
    flagUrl: string;
  };
  pageantExperiences: {
    id: string;
    eventName: string;
    location: string;
    eventDate: string;
  }[];
  gallery: {
    id: string;
    title: string;
    caption: string;
    mediaUrl: string;
    type: "image" | "video";
  }[];
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
  gallery: {
    id: string;
    title: string;
    caption: string;
    mediaUrl: string;
    type: "image" | "video";
  }[];
}
