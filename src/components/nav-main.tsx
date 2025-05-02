"use client";

import React from "react";
import {
  Calendar,
  ChevronRight,
  FileText,
  Flag,
  Image,
  LucideIcon,
  Settings,
  Users,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

interface MenuItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: SubMenuItem[];
}

interface SubMenuItem {
  title: string;
  url: string;
}

const NavMain = () => {
  const menuItems: MenuItem[] = [
    {
      title: "Models",
      icon: Users,
      items: [
        { title: "Create", url: "/admin/models/create" },
        { title: "List", url: "/admin/models" },
      ],
      url: "/admin/models",
    },
    {
      title: "Profiles",
      icon: Users,
      url: "/admin/profiles",
    },
    {
      title: "Events",
      icon: Calendar,
      items: [
        { title: "Create", url: "/admin/events/create" },
        { title: "List", url: "/admin/events" },
      ],
      url: "/admin/events",
    },
    {
      title: "Event Registrations",
      icon: Calendar,
      url: "/admin/event_registrations",
    },
    {
      title: "Gallery",
      icon: Image,
      url: "/admin/gallery",
    },
    {
      title: "Visits",
      icon: Calendar,
      items: [
        { title: "Create", url: "/admin/visits/create" },
        { title: "List", url: "/admin/visits" },
      ],
      url: "/admin/visits",
    },
    {
      title: "News",
      icon: FileText,
      items: [
        { title: "Create", url: "/admin/news/create" },
        { title: "List", url: "/admin/news" },
      ],
      url: "/admin/news",
    },
    {
      title: "Testimonies",
      icon: Users,
      url: "/admin/testimonies",
    },
    {
      title: "Sponsors",
      icon: Users,
      url: "/admin/sponsors",
    },
    {
      title: "Countries",
      icon: Flag,
      url: "/admin/countries",
    },
    {
      title: "Admins",
      icon: Settings,
      url: "/admin/admins",
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {menuItems.map((item) => {
          const hasSubmenu = item.items && item.items.length > 0;

          if (hasSubmenu) {
            return (
              <Collapsible
                key={item.title}
                asChild
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          } else {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} asChild>
                  <a href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
