"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeaderTitle from "@/app/(landing)/components/header-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  mediaUrl: string;
  type: "image" | "video";
}

const ClientGallerySection = ({
  galleryList,
  subtitle,
  title,
  url,
  limit = false,
}: {
  galleryList: GalleryItem[];
  subtitle: string;
  title: string;
  url: string;
  limit?: boolean;
}) => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [videos, setVideos] = useState<GalleryItem[]>([]);

  useEffect(() => {
    let filteredImages = galleryList.filter((item) => item.type === "image");
    let filteredVideos = galleryList.filter((item) => item.type === "video");

    if (limit) {
      // Shuffle the arrays to get random items
      filteredImages = [...filteredImages]
        .sort(() => 0.5 - Math.random())
        .slice(0, 10); // Get 10 random
      filteredVideos = [...filteredVideos]
        .sort(() => 0.5 - Math.random())
        .slice(0, 8); // Get 8 random
    }
    setImages(filteredImages);
    setVideos(filteredVideos);
  }, [galleryList, limit]);

  return (
    <div className={`flex flex-col ${limit && "py-5"}  gap-3`}>
      <HeaderTitle title={title} url={url} subtitle={subtitle} />
      <Tabs defaultValue="images" className="w-full px-3">
        <div className="w-full flex items-center justify-center">
          <TabsList>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="images">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {images.length > 0 ? (
              images.map((item) => (
                <div key={item.id} className="aspect-w-1 aspect-h-1 relative">
                  <Image
                    src={item.mediaUrl}
                    alt={item.title}
                    width={500}
                    height={500}
                    className="object-cover h-[350px] rounded-md"
                  />
                  <p className="text-sm  mt-1">
                    {item.title} - {item.caption}
                  </p>
                </div>
              ))
            ) : (
              <p className="">No images in gallery.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="videos">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {videos.length > 0 ? (
              videos.map((item) => (
                <div key={item.id} className="aspect-w-1 aspect-h-1 relative">
                  <video
                    controls
                    className="w-full h-[350px] rounded-md aspect-video"
                  >
                    <source src={item.mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  <p className="text-sm  mt-1">
                    {item.title} - {item.caption}
                  </p>
                </div>
              ))
            ) : (
              <p className="">No videos in gallery.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientGallerySection;
