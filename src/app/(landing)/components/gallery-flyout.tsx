import React from "react";

export const GalleryFlyOut = ({
  hoverItem,
  setHoverItem,
  item,
}: {
  hoverItem: any;
  setHoverItem: any;
  item: any;
}) => {
  return (
    <div
      onMouseLeave={() => setHoverItem(null)}
      className="grid min-w-[250px] grid-cols-1 rounded-xl p-3"
    >
      <div>Gallery Flyout</div>
    </div>
  );
};
