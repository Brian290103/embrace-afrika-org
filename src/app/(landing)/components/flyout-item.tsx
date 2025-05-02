import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import EventsFlyOut from "@/app/(landing)/components/events-flyout";
import { VisitsFlyOut } from "@/app/(landing)/components/visits-flyout";
import { GalleryFlyOut } from "@/app/(landing)/components/gallery-flyout";
import Link from "next/link";

export const FlyOutItem = ({
  scrolling,
  open,
  hoverItem,
  setHoverItem,
  item,
}: {
  item: any;
}) => {
  const [localOpen, setLocalOpen] = useState(false);
  const [FlyoutComponent, setFlyoutComponent] = useState<
    React.FC<{ hoverItem: any; setHoverItem: any; item: any }>
  >(() => () => null);

  useEffect(() => {
    setLocalOpen(open);
  }, [open]);

  useEffect(() => {
    if (item.component) {
      switch (item.component) {
        case "Events":
          setFlyoutComponent(() => EventsFlyOut);
          break;
        case "Visits":
          setFlyoutComponent(() => VisitsFlyOut);
          break;
        case "Gallery":
          setFlyoutComponent(() => GalleryFlyOut);
          break;
        default:
          setFlyoutComponent(() => () => null);
      }
    } else {
      setFlyoutComponent(() => () => null);
    }
  }, [item.component]);

  return (
    <div
      onMouseEnter={() => setLocalOpen(true)}
      onMouseLeave={() => setLocalOpen(false)}
      className="group relative flex h-full w-fit items-center"
    >
      <Link
        href={`${item.link}`}
        className={cn(
          item.active || (localOpen && "bg-white "),
          "p-5 text-base relative z-10 hover:bg-white relative flex items-center justify-center gap-3",
        )}
      >
        {item.title}
        <ChevronDown
          className={cn(
            localOpen ? "rotate-180" : "rotate-0",
            "duration-300 h-4 w-4",
          )}
        />
      </Link>

      <AnimatePresence>
        {localOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              style={{ translateX: "-50%" }}
              transition={{
                duration: "0.3",
                ease: "easeOut",
              }}
              onMouseLeave={() => setHoverItem(null)}
              className={cn(
                scrolling ? "top-20" : "top-20",
                "absolute left-1/2  h-fit w-fit rounded-b-xl border bg-white p-5 text-black shadow-none",
              )}
            >
              <div
                className={cn(
                  scrolling ? "-top-12 h-12" : "-top-[86px] h-[86px]",
                  "absolute  left-0 right-0  bg-transparent",
                )}
              ></div>
              <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-s border-t bg-white"></div>

              {item.component && (
                <>
                  <FlyoutComponent
                    hoverItem={hoverItem}
                    setHoverItem={setHoverItem}
                    item={item}
                  />
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
