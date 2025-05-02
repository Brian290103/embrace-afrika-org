import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImagesTab from "@/app/admin/visits/[id]/tabs/images-tab";
import VideosTab from "@/app/admin/visits/[id]/tabs/videos-tab";
import EditorClient from "@/components/editor-client";

const VisitMoreDetails = ({ id, content }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Visit Additional Information</CardTitle>
          <CardDescription>More details</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content" className="">
            <TabsList>
              <TabsTrigger value="content">Contents</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            <div className="py-2">
              <TabsContent value="content">
                {content ? (
                  <EditorClient editable={false} value={JSON.parse(content)} />
                ) : (
                  <p>No content available.</p>
                )}
              </TabsContent>
              <TabsContent value="images">
                <ImagesTab relationName={"visit"} id={id} />
              </TabsContent>
              <TabsContent value="videos">
                <VideosTab relationName={"visit"} id={id} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitMoreDetails;
