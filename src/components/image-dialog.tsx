"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image"; // Import the Image component
import { Input } from "@/components/ui/input";
import { FormControl, FormLabel } from "@/components/ui/form";

// Create a separate component for the image dialog
export const ImageDialog = ({
  onSelect,
}: {
  onSelect: (url: string) => void;
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [viewImage, setViewImage] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleSelect = () => {
    onSelect(imageUrl);
    setOpen(false); // Close the dialog
    setImageUrl(""); // Clear input
    setViewImage(false);
  };

  const handleViewImage = () => {
    setViewImage(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Image</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Enter Image URL</DialogTitle>
          <DialogDescription>
            Enter the URL of the image you want to use.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1 py-4">
          <div className="flex flex-col gap-2">
            <FormLabel htmlFor="url">URL</FormLabel>
            <FormControl>
              <Input
                id="url"
                value={imageUrl}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </FormControl>
          </div>
          {imageUrl && viewImage && (
            <div className="flex justify-center">
              <Image
                src={imageUrl}
                alt="Preview"
                width={200}
                height={200}
                className="rounded-md"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleViewImage}>
            View Image
          </Button>
          <Button type="button" onClick={handleSelect} disabled={!imageUrl}>
            Submit Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
