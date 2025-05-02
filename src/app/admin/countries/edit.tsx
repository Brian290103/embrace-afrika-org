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
import CountryForm from "@/app/admin/countries/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const EditDialog = ({
  id,
  name,
  flagUrl,
}: {
  id: string;
  name: string;
  flagUrl: string;
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
            <DialogTitle>Edit Country</DialogTitle>
            <DialogDescription>
              Modify the country details below.
            </DialogDescription>
          </DialogHeader>
          <CountryForm data={{ id, name, flagUrl }} dismissDialog={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditDialog;
