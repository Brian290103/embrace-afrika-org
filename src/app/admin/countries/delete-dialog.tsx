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
import { Loader2, Trash2 } from "lucide-react";
import { deleteCountry } from "@/actions/countriesAction";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
  name: string;
  id: string;
}

const DeleteConfirmationDialog: React.FC<DeleteDialogProps> = ({
  name,
  id,
}) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handleDeleteAction = async () => {
    setIsLoading(true); // Set loading to true before deleting
    try {
      await deleteCountry(id);
      toast.success(`${name} deleted successfully`);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete country");
    } finally {
      setIsLoading(false); // Set loading to false after deletion (success or error)
      setOpen(false); // Close the dialog
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size={"icon"} variant={"destructive"} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {name}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAction}
            disabled={isLoading} // Disable the button during deletion
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
