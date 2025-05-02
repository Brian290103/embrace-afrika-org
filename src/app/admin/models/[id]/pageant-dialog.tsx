"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageantForm from "@/app/admin/models/[id]/components/pageant-form";
import { useParams } from "next/navigation";

export default function PageantDialog() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  return (
    <div className={""}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <CirclePlus />
            Create PageAnt
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <PageantForm modelId={id as string} dismissDialog={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
