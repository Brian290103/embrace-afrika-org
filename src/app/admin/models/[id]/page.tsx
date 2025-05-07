import React from "react";
import { getModelById } from "@/actions/modelsAction";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ModelsMoreDetails from "@/app/admin/models/[id]/models-more-details";

export default async function ModelDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const modelDetails = await getModelById(params.id);
  console.log("modelDetails", modelDetails);

  if (!modelDetails) {
    return <div>Model not found.</div>; // Handle the case where the model doesn't exist
  }

  const { name, featuredProfileImageUrl, bio, createdAt, country } =
    modelDetails;
  // const parsedBio = parseBlockNote(bio);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Model Details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="">
              {featuredProfileImageUrl ? (
                <div className="">
                  <Image
                    src={featuredProfileImageUrl}
                    alt={name}
                    width={400} // Adjust as needed
                    height={400}
                    className={cn(
                      "rounded-lg object-cover w-full h-auto",
                      "aspect-square",
                    )}
                  />
                </div>
              ) : (
                <div className="md:w-1/3 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Name</TableCell>
                    <TableCell>{name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Country</TableCell>
                    <TableCell>{country?.name || "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Created At</TableCell>
                    <TableCell>
                      {new Date(createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <ModelsMoreDetails id={params.id} content={bio} />
    </div>
  );
}
