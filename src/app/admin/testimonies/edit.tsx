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
import TestimonyForm from "@/app/admin/testimonies/form"; // Updated import
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { TestimonyType } from "@/typings"; // Import TestimonyType

const EditDialog = ({
  id,
  username,
  occupation,
  message,
  profileImageUrl,
}: TestimonyType & { id: string }) => {
  //Extend the existing type and add id

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" size={"icon"}>
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Testimony</DialogTitle>
            <DialogDescription>
              Modify the testimony details below.
            </DialogDescription>
          </DialogHeader>
          <TestimonyForm
            data={{ id, username, occupation, message, profileImageUrl }} // Pass testimony data
            dismissDialog={setOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditDialog;
