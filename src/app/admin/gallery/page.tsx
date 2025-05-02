import React from "react";
import { GalleryType } from "@/typings"; // Import the GalleryType
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllGalleryItems } from "@/actions/galleryAction";
import { GalleryDataTable } from "@/app/admin/gallery/data-table";

const GalleryPage = async () => {
  const data: GalleryType[] = await getAllGalleryItems(); // Fetch gallery data

  return (
    <section className={"flex flex-col gap-4"}>
      <Card>
        <CardHeader>
          <CardTitle>Manage Gallery</CardTitle>
          <CardDescription>View and manage gallery items.</CardDescription>
        </CardHeader>
        <CardContent>
          <GalleryDataTable data={data} />
        </CardContent>
        <CardFooter className="justify-between">
          <p className={"font-semibold"}>Gallery Overview</p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default GalleryPage;
