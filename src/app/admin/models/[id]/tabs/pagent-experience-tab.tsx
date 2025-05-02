import React from "react";
import PageantDialog from "@/app/admin/models/[id]/pageant-dialog";
import { getPageantExperiencesByModelId } from "@/actions/pageantExperienceActions";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageantExperienceDeleteDialog } from "@/app/admin/models/[id]/components/delete-dialog";

interface PageantExperience {
  id: string;
  modelId: string;
  eventName: string;
  location: string;
  eventDate: string;
  createdAt: string;
}

const PageantExperienceTab = async ({ modelId }: { modelId: string }) => {
  const data: PageantExperience[] =
    await getPageantExperiencesByModelId(modelId);

  return (
    <div>
      <div className="w-full flex border-b pb-3 items-center justify-end">
        <PageantDialog modelId={modelId} />
      </div>

      <Table>
        <TableCaption>A list of pageant experiences.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Event Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
            {/* Added Actions column */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((experience) => (
            <TableRow key={experience.id}>
              <TableCell className="font-medium">
                {experience.eventName}
              </TableCell>
              <TableCell>{experience.location}</TableCell>
              <TableCell>
                {format(new Date(experience.eventDate), "PPP")}
              </TableCell>
              <TableCell className="text-right">
                {format(new Date(experience.createdAt), "PPPppp")}
              </TableCell>
              <TableCell className="text-right">
                <PageantExperienceDeleteDialog
                  experienceName={experience.eventName}
                  experienceId={experience.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {data.length === 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No pageant experiences found for this model.
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
};

export default PageantExperienceTab;
