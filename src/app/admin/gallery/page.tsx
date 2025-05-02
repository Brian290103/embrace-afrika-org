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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import GalleryForm from "@/app/admin/visits/gallery-form";

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
          <div className={"pb-5"}>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <CirclePlus />
                  Upload Image
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Image</DialogTitle>
                  <DialogDescription>
                    Upload a new image to the gallery.
                  </DialogDescription>
                </DialogHeader>
                <GalleryForm type={"image"} />
              </DialogContent>
            </Dialog>
          </div>

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
