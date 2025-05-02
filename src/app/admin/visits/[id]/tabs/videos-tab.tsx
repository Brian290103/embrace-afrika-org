import React from "react";
import GalleryDialog from "@/app/admin/visits/[id]/gallery-dialog";
import { getGalleryByRelationAndType } from "@/actions/galleryAction";
import { cn } from "@/lib/utils";
import DeleteGalleryDialog from "@/app/admin/visits/[id]/delete-gallery-dialog";

interface VideosTabProps {
  id: string;
  relationName: "model" | "event" | "visit"; // Updated relationName prop type
}
const VideosTab: React.FC<VideosTabProps> = async ({ id, relationName }) => {
  const videos = await getGalleryByRelationAndType("video", relationName, id);

  return (
    <div>
      <div className="w-full flex border-b pb-3 gap-2 items-center justify-between">
        <h1 className="font-semibold">Videos</h1>
        <GalleryDialog
          mediaType={"video"}
          relationName={relationName}
          relationId={id}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-muted p-3 rounded-xl">
            <div className="relative h-[200px]">
              <div className="absolute top-2 right-2 z-10">
                <DeleteGalleryDialog galleryId={video.id} title={video.title} />
              </div>
              <video
                src={video.mediaUrl}
                className={cn(
                  "w-full rounded-xl cursor-pointer",
                  "hover:scale-105 transition-transform duration-300 h-full",
                )}
                controls
              />
            </div>
            <div className="pt-3">
              <h1 className="text-base font-semibold">{video.title}</h1>
              <p className="text-sm">{video.caption}</p>
            </div>
          </div>
        ))}
      </div>
      {videos.length === 0 && (
        <div className="mt-4 text-gray-500 text-center">
          No videos found for this visit.
        </div>
      )}
    </div>
  );
};

export default VideosTab;
