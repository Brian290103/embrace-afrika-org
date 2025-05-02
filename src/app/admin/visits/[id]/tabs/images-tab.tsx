import React from "react";
import GalleryDialog from "@/app/admin/visits/[id]/gallery-dialog";
import { getGalleryByRelationAndType } from "@/actions/galleryAction";
import Image from "next/image";
import DeleteGalleryDialog from "@/app/admin/visits/[id]/delete-gallery-dialog";

interface ImagesTabProps {
  id: string;
  relationName: "model" | "event" | "visit"; // Updated relationName prop type
}

const ImagesTab: React.FC<ImagesTabProps> = async ({ id, relationName }) => {
  // Destructured relationName
  const images = await getGalleryByRelationAndType("image", relationName, id); // Passed relationName
  return (
    <div>
      <div className="w-full flex border-b pb-3 gap-2 items-center justify-between">
        <h1 className="font-semibold">Images</h1>
        <GalleryDialog
          mediaType={"image"}
          relationName={relationName} // Passed relationName
          relationId={id}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {images.map((image) => (
          <div key={image.id} className={"bg-muted p-3 rounded-xl"}>
            <div className="relative">
              <div className="absolute top-2 right-2">
                <DeleteGalleryDialog galleryId={image.id} title={image.title} />
              </div>
              <Image
                src={image.mediaUrl}
                alt={image.title}
                width={1000}
                height={1000}
                className={"rounded-xl cursor-pointer"}
              />
            </div>
            <div className="pt-3">
              <h1 className="text-base font-semibold">{image.title}</h1>
              <p className="text-sm">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
      {images.length === 0 && (
        <div className="mt-4 text-gray-500 text-center">
          No images found for this {relationName}.
        </div>
      )}
    </div>
  );
};

export default ImagesTab;
