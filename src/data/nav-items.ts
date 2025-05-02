import {
  Calendar,
  Hand,
  Home,
  Image,
  Info,
  Mail,
  MapPin,
  Newspaper,
} from "lucide-react";

const navItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
  {
    title: "Models",
    url: "/models",
    icon: Home, // No direct match, you might want to find a better one
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
    component: "Events",
  },
  {
    title: "Visits",
    url: "/visits",
    icon: MapPin,
  },
  {
    title: "Gallery",
    url: "/gallery",
    icon: Image,
  },
  {
    title: "Sponsors",
    url: "/sponsors",
    icon: Hand, // Changed from People
  },
  {
    title: "News",
    url: "/news",
    icon: Newspaper,
  },
  {
    title: "Contact Us",
    url: "/contact",
    icon: Mail,
  },
];

export default navItems;
