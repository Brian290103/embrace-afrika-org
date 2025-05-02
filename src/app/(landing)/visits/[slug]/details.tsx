import React from "react";
import { GalleryType, VisitsType } from "@/typings";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Calendar, MapPin, Pen } from "lucide-react";
import EditorClient from "@/components/editor-client";
import ClientGallerySection from "@/app/(landing)/components/client-gallery-section";
import { getGalleryByRelation } from "@/actions/galleryAction";

const ClientVisitDetails = async ({ visit }: { visit: VisitsType }) => {
  const galleryList: GalleryType[] = await getGalleryByRelation(
    "visit",
    visit.id,
  );

  return (
    <div className={"w-full flex flex-col gap-3"}>
      <div className="flex flex-col gap-3 gap-3 w-full max-w-4xl mx-auto px-3">
        <article className="flex flex-col w-full gap-5">
          <div className="w-full flex items-center gap-3">
            <Table className={"w-full max-w-xl mx-auto"}>
              <TableBody>
                <TableRow>
                  <TableCell className={"w-[50px]"}>
                    <Pen className={"w-4  h-4"} />
                  </TableCell>
                  <TableHead className="font-semibold"> Title</TableHead>
                  <TableCell>{visit.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={"w-[50px]"}>
                    <MapPin className={"w-4  h-4"} />
                  </TableCell>
                  <TableHead className="font-semibold">
                    Place of Visit
                  </TableHead>
                  <TableCell>{visit.placeOfVisit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={"w-[50px]"}>
                    <Calendar className={"w-4  h-4"} />
                  </TableCell>
                  <TableHead className="font-semibold">Date of Visit</TableHead>
                  <TableCell>{visit.dateOfVisit}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="w-full rounded-xl overflow-hidden">
            <Image
              src={visit.featuredImageUrl}
              alt={`Poster image of ${visit.title} Event`}
              width={1000}
              height={1000}
            />
          </div>

          <EditorClient editable={false} value={JSON.parse(visit.content)} />
        </article>
      </div>

      <article className="">
        <ClientGallerySection
          url={"/gallery"}
          title={"Gallery"}
          subtitle={`${visit.title} Gallery`}
          galleryList={galleryList}
        />
      </article>
    </div>
  );
};

export default ClientVisitDetails;
