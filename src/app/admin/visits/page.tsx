import React from "react";
import { getVisits } from "@/actions/visitAction"; // Corrected import path
import { VisitsType } from "@/typings"; // Import the VisitsType
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
import { VisitsDataTable } from "@/app/admin/visits/data-table";

const VisitsPage = async () => {
  const data: VisitsType[] = await getVisits(); // Fetch visits data
  return (
    <section className={"flex flex-col gap-4"}>
      <Card>
        <CardHeader>
          <CardTitle>Manage Visits</CardTitle>
          <CardDescription>View and manage visits.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* You can add a search bar or filter here if needed */}
        </CardContent>
        <CardFooter className="justify-between">
          <p className={"font-semibold"}>Visits Overview</p>
          <Button asChild>
            <a href="/admin/visits/create">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Visit
            </a>
          </Button>
        </CardFooter>
      </Card>
      <VisitsDataTable data={data} /> {/* Use the NewsDataTable component */}
    </section>
  );
};

export default VisitsPage;
