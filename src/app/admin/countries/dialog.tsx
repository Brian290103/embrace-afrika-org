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

const CountryDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create Country</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Country</DialogTitle>
            <DialogDescription>
              Enter the details for the new country.
            </DialogDescription>
          </DialogHeader>
          <CountryForm dismissDialog={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CountryDialog;
