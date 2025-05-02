import React from "react";
import { getVisitsById } from "@/actions/visitAction"; //  Import the action to fetch visit details
import { VisitsType } from "@/typings"; // Import the VisitsType
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
import VisitMoreDetails from "@/app/admin/visits/[id]/visit-more-details";

export default async function VisitDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const visitDetails: VisitsType | null = await getVisitsById(params.id);

  if (!visitDetails) {
    return <div>Visit not found.</div>;
  }

  const {
    title,
    caption,
    content,
    placeOfVisit,
    dateOfVisit,
    featuredImageUrl,
    createdAt,
  } = visitDetails;

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Visit Details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="">
              {featuredImageUrl ? (
                <div className="">
                  <Image
                    src={featuredImageUrl}
                    alt={title}
                    width={400}
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
                    <TableCell className="font-medium">Title</TableCell>
                    <TableCell>{title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Caption</TableCell>
                    <TableCell>{caption}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Place of Visit
                    </TableCell>
                    <TableCell>{placeOfVisit}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Date of Visit</TableCell>
                    <TableCell>
                      {new Date(dateOfVisit).toLocaleString()}
                    </TableCell>
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

      <VisitMoreDetails content={content} id={params.id} />
    </div>
  );
}
