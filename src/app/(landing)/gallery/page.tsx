import React from "react";
import ClientGallerySection from "@/app/(landing)/components/client-gallery-section";
import { getAllGalleryItems } from "@/actions/galleryAction";
import { GalleryType } from "@/typings";
import { shuffleArray } from "@/lib/utils";

const GalleryPage = async () => {
  const galleryList: GalleryType = await getAllGalleryItems();
  const shuffledGalleryList: GalleryType = shuffleArray(galleryList);

  return (
    <div className={""}>
      <ClientGallerySection
        limit={false}
        url={"/gallery"}
        title={"Gallery"}
        subtitle={`African Beauty, Captured`}
        galleryList={shuffledGalleryList}
      />
    </div>
  );
};

export default GalleryPage;
