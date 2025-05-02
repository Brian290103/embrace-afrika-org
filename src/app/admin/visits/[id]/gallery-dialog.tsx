"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import GalleryForm from "@/app/admin/visits/gallery-form";

interface GalleryDialogProps {
  relationName?: "model" | "event" | "visit";
  relationId?: string;
  mediaType: "image" | "video";
}

const GalleryDialog: React.FC<GalleryDialogProps> = ({
  mediaType,
  relationName,
  relationId,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={""}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <CirclePlus />
            {mediaType === "image" ? "Upload Image" : "Upload Video"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mediaType === "image" ? "Add New Image" : "Add New Video"}
            </DialogTitle>
            <DialogDescription>
              {mediaType === "image"
                ? "Upload a new image to the gallery."
                : "Upload a new video to the gallery."}
            </DialogDescription>
          </DialogHeader>
          <GalleryForm
            type={mediaType}
            relationId={relationId}
            relationName={relationName}
            dismissDialog={setOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryDialog;
