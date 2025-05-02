import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageantExperienceTab from "@/app/admin/models/[id]/tabs/pagent-experience-tab";
import ImagesTab from "@/app/admin/visits/[id]/tabs/images-tab";
import VideosTab from "@/app/admin/visits/[id]/tabs/videos-tab";
import EditorClient from "@/components/editor-client";

const ModelsMoreDetails = ({ id, content }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Model Additional Information</CardTitle>
          <CardDescription>More details</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bio" className="">
            <TabsList>
              <TabsTrigger value="bio">Bio</TabsTrigger>
              <TabsTrigger value="pageant">Pageant Experience</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            <div className="py-2">
              <TabsContent value="bio">
                {content ? (
                  <EditorClient editable={false} value={JSON.parse(content)} />
                ) : (
                  <p>No content available.</p>
                )}
              </TabsContent>
              <TabsContent value="pageant">
                <PageantExperienceTab modelId={id} />
              </TabsContent>
              <TabsContent value="images">
                <ImagesTab id={id} relationName={"model"} />
              </TabsContent>
              <TabsContent value="videos">
                <VideosTab id={id} relationName={"model"} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelsMoreDetails;
