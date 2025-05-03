"use server";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; //Import Avatar
import DeleteConfirmationDialog from "@/app/admin/testimonies/delete-dialog"; //Adjust the path
import EditDialog from "@/app/admin/testimonies/edit"; //Adjust the path
import { getTestimonies } from "@/actions/testimonyActions";
import { TestimonyType } from "@/typings";
import TestimonyDialog from "@/app/admin/testimonies/dialog"; //Adjust the path

const TestimoniesPage = async () => {
  const testimonies: TestimonyType[] = await getTestimonies();

  return (
    <section className={"flex flex-col gap-4"}>
      <Card>
        <CardHeader>
          <CardTitle>Manage Testimonies</CardTitle>
          <CardDescription>View and manage testimonies.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add Testimony Button.  You might need to create a new dialog component similar to SponsorDialog */}
          <TestimonyDialog />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Testimonies</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile Image</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Occupation</TableHead>
                {/*<TableHead>Message</TableHead>*/}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonies.map((testimony) => (
                <TableRow key={testimony.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={testimony.profileImageUrl || undefined}
                        alt={testimony.username}
                      />
                      <AvatarFallback>
                        {testimony.username.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{testimony.username}</TableCell>
                  <TableCell>{testimony.occupation}</TableCell>
                  {/*<TableCell>{testimony.message}</TableCell>*/}
                  <TableCell>
                    <div className={"flex items-center gap-2"}>
                      <EditDialog
                        id={testimony.id}
                        username={testimony.username}
                        occupation={testimony.occupation}
                        message={testimony.message}
                        profileImageUrl={testimony.profileImageUrl}
                      />
                      <DeleteConfirmationDialog
                        username={testimony.username} // Or whatever identifier you want to use
                        id={testimony.id}
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

export default TestimoniesPage;
