import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModelsType } from "@/typings"; // Updated import
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
import { deleteModel } from "@/actions/modelsAction";
import Link from "next/link"; // Updated import

export const modelsColumns: ColumnDef<ModelsType>[] = [
  // Updated type
  {
    id: "sno",
    header: "SNo",
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "featuredProfileImageUrl",
    header: "Image",
    cell: ({ row }) => (
      <img
        src={row.getValue("featuredProfileImageUrl")}
        alt="Featured"
        className="h-12 w-16 rounded object-cover"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="max-w-[300px] flex w-full">
        <a
          target={"_blank"}
          href={`/models/${row.original.slug}`} // Updated link
          className="font-medium w-full truncate flex block"
        >
          {row.getValue("name")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "country.name",
    header: "Country",
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Slug
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleString();
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const modelItem = row.original; // Updated variable name

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(modelItem.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/models/${row.original.id}`}>
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <AlertDialog>
                <AlertDialogTrigger className={"w-full text-start"}>
                  Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this model.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        await deleteModel(modelItem.id); // Updated function call
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
