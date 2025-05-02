import React from "react";
import { ClientModel } from "@/typings-client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import EditorClient from "@/components/editor-client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ClientGallerySection from "@/app/(landing)/components/client-gallery-section";

const Details = ({ model }: { model: ClientModel }) => {
  return (
    <section className={cn("flex w-full flex-col gap-5 p-3")}>
      <div className="grid grid-cols-1 w-full max-w-7xl mx-auto md:grid-cols-2 gap-8">
        <article className="">
          <Image
            src={model.featuredProfileImageUrl}
            alt={`An image of ${model.name}`}
            width={1000}
            height={1000}
            className={cn(
              "w-full object-cover rounded-xl",
              "aspect-w-1 aspect-h-1",
            )}
          />
        </article>
        <article className="space-y-6">
          <h1 className="text-4xl sm:text-5xl tracking-wider font-bold font-heading1">
            {model.name}
          </h1>
          <div className="flex items-center gap-2">
            <Image
              src={model.country.flagUrl}
              alt={`${model.country.name} flag`}
              width={30}
              height={20}
              className="inline-block ml-2"
            />
            <span className="font-semibold text-lg"> {model.country.name}</span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Bio</h2>
            <EditorClient editable={false} value={JSON.parse(model.bio)} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Pageant Experiences</h2>
            {model.pageantExperiences.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">SNo</TableHead>
                    <TableHead className="font-semibold">Event Name</TableHead>
                    <TableHead className="font-semibold">Location</TableHead>
                    {/*<TableHead className="font-semibold">Date</TableHead>*/}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {model.pageantExperiences.map((pageant, index) => (
                    <TableRow key={pageant.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {pageant.eventName}
                      </TableCell>
                      <TableCell>{pageant.location}</TableCell>
                      {/*<TableCell>{pageant.eventDate}</TableCell>*/}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="">No pageant experiences listed.</p>
            )}
          </div>
        </article>
      </div>
      <ClientGallerySection
        title={"Gallery"}
        url={"/gallery"}
        galleryList={model.gallery}
        subtitle={`Collection of images and videos of ${model.name}`}
      />{" "}
    </section>
  );
};

export default Details;
