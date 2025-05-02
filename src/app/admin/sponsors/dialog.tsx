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
import SponsorForm from "@/app/admin/sponsors/form";
import { Button } from "@/components/ui/button";

const SponsorDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create Sponsor</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Sponsor</DialogTitle>
            <DialogDescription>
              Enter the details for the new sponsor.
            </DialogDescription>
          </DialogHeader>
          <SponsorForm dismissDialog={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SponsorDialog;
