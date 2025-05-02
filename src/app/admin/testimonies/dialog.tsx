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

const TestimonyDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create Testimony</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Testimony</DialogTitle>
            <DialogDescription>
              Enter the details for the new testimony.
            </DialogDescription>
          </DialogHeader>
          <TestimonyForm dismissDialog={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonyDialog;
