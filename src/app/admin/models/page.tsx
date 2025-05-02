import React from "react";
import { getModels } from "@/actions/modelsAction"; // Updated import
import { ModelsDataTable } from "@/app/admin/models/data-table"; // Create this component
import { ModelsType } from "@/typings"; // Updated import
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

const ModelsPage = async () => {
  const data: ModelsType[] = await getModels(); // Updated type and function
  return (
    <section className={"flex flex-col gap-4"}>
      <Card>
        <CardHeader>
          <CardTitle>Manage Models</CardTitle>
          <CardDescription>View and manage models.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* You can add a search bar or filter here if needed */}
        </CardContent>
        <CardFooter className="justify-between">
          <p className={"font-semibold"}>Models Overview</p>
          <Button asChild>
            <a href="/admin/models/create">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Model
            </a>
          </Button>
        </CardFooter>
      </Card>
      <ModelsDataTable data={data} /> {/* Use the new component */}
    </section>
  );
};

export default ModelsPage;
