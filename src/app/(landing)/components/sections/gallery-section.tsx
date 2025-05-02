import React from "react";
import ClientGallerySection from "@/app/(landing)/components/client-gallery-section";
import { getAllGalleryItems } from "@/actions/galleryAction";
import { GalleryType } from "@/typings";

const GallerySection = async () => {
  const galleryList: GalleryType = await getAllGalleryItems();
  return (
    <div className={""}>
      <ClientGallerySection
        limit={true}
        url={"/gallery"}
        title={"Gallery"}
        subtitle={`African Beauty, Captured`}
        galleryList={galleryList}
      />
    </div>
  );
};

export default GallerySection;
