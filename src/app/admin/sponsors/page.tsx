import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SponsorDialog from "@/app/admin/sponsors/dialog";
import { getSponsors } from "@/actions/sponsorsAction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteConfirmationDialog from "@/app/admin/sponsors/delete-dialog";
import EditDialog from "@/app/admin/sponsors/edit";
import { SponsorType } from "@/typings";

const SponsorsPage = async () => {
  const sponsors: SponsorType[] = await getSponsors();

  return (
    <section className={"flex flex-col gap-4"}>
      <Card>
        <CardHeader>
          <CardTitle>Manage Sponsors</CardTitle>
          <CardDescription>View and manage sponsors.</CardDescription>
        </CardHeader>
        <CardContent>
          <SponsorDialog />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sponsors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Logo</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sponsors.map((sponsor) => (
                <TableRow key={sponsor.id}>
                  <TableCell>{sponsor.name}</TableCell>
                  <TableCell>
                    {sponsor.logoUrl && (
                      <img
                        src={sponsor.logoUrl}
                        alt={`${sponsor.name} logo`}
                        className="h-8 w-auto object-contain rounded"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {sponsor.websiteUrl && (
                      <a
                        href={sponsor.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-500"
                      >
                        Visit Website
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className={"flex items-center gap-2"}>
                      <EditDialog
                        id={sponsor.id}
                        name={sponsor.name}
                        logoUrl={sponsor.logoUrl}
                        websiteUrl={sponsor.websiteUrl}
                      />
                      <DeleteConfirmationDialog
                        name={sponsor.name}
                        id={sponsor.id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};

export default SponsorsPage;
