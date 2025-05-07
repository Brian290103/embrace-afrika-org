import React from "react";
import { EventType } from "@/typings"; // Import the VisitsType
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getEvents } from "@/actions/eventAction";
import { EventsDataTable } from "@/app/admin/events/data-table";

const EventsPage = async () => {
  const data: EventType[] = await getEvents(); // Fetch visits data
  console.log(data);
  return (
    <section className={"flex flex-col gap-4"}>
      <Card>
        <CardHeader>
          <CardTitle>Manage Events</CardTitle>
          <CardDescription>View and manage events.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* You can add a search bar or filter here if needed */}
        </CardContent>
        <CardFooter className="justify-between">
          <p className={"font-semibold"}>Events Overview</p>
          <Button asChild>
            <a href="/admin/events/create">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Event
            </a>
          </Button>
        </CardFooter>
      </Card>
      <EventsDataTable data={data} /> {/* Use the NewsDataTable component */}
    </section>
  );
};

export default EventsPage;
