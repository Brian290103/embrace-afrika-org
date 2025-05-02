"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { deletePageantExperience } from "@/actions/pageantExperienceActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const PageantExperienceDeleteDialog = ({
  experienceName,
  experienceId,
}: {
  experienceName: string;
  experienceId: string;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    setIsDeleting(true); // Set deleting state
    try {
      await deletePageantExperience(id);
      toast.success("Pageant experience deleted successfully.");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete pageant experience.");
    } finally {
      setIsDeleting(false); // Reset deleting state
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon" disabled={isDeleting}>
          {isDeleting ? <Loader2 className="animate-spin" /> : <Trash />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the{" "}
            <b>{experienceName}</b> experience.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(experienceId)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
