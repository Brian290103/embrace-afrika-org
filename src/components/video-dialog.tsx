"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormControl, FormLabel } from "@/components/ui/form";

export const VideoDialog = ({
  onSelect,
}: {
  onSelect: (url: string) => void;
}) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [viewVideo, setViewVideo] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const handleSelect = () => {
    onSelect(videoUrl);
    setOpen(false); // Close the dialog
    setVideoUrl(""); // Clear input
    setViewVideo(false);
  };

  const handleViewVideo = () => {
    setViewVideo(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Video</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Enter Video URL</DialogTitle>
          <DialogDescription>
            Enter the URL of the video you want to use.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1 py-4">
          <div className="flex flex-col gap-2">
            <FormLabel htmlFor="url">URL</FormLabel>
            <FormControl>
              <Input
                id="url"
                value={videoUrl}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </FormControl>
          </div>
          {videoUrl && viewVideo && (
            <div className="flex justify-center">
              <video
                src={videoUrl}
                controls
                className="rounded-md max-w-full max-h-[300px]" // Added max-height
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleViewVideo}>
            View Video
          </Button>
          <Button type="button" onClick={handleSelect} disabled={!videoUrl}>
            Submit Video
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
