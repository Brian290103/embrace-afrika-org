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
import { Pencil } from "lucide-react";

const EditDialog = ({
  id,
  name,
  logoUrl,
  websiteUrl,
}: {
  id: string;
  name: string;
  logoUrl: string | null;
  websiteUrl: string | null;
}) => {
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
            <DialogTitle>Edit Sponsor</DialogTitle>
            <DialogDescription>
              Modify the sponsor details below.
            </DialogDescription>
          </DialogHeader>
          <SponsorForm
            data={{ id, name, logoUrl, websiteUrl }}
            dismissDialog={setOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditDialog;
