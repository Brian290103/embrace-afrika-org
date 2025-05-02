import React from "react";
import ClientGallerySection from "@/app/(landing)/components/client-gallery-section";
import { getAllGalleryItems } from "@/actions/galleryAction";
import { GalleryType } from "@/typings";

const GalleryPage = async () => {
  const galleryList: GalleryType = await getAllGalleryItems();
  return (
    <div className={""}>
      <ClientGallerySection
        limit={false}
        url={"/gallery"}
        title={"Gallery"}
        subtitle={`African Beauty, Captured`}
        galleryList={galleryList}
      />
    </div>
  );
};

export default GalleryPage;
