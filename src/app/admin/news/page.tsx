import React from 'react';
import { getNews } from "@/actions/newsAction";
import { NewsDataTable } from "@/app/admin/news/data-table";
import { NewsType } from "@/typings"; // Make sure this path is correct
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

const NewsPage = async () => {
    const data: NewsType[] = await getNews();
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage News</CardTitle>
                    <CardDescription>
                        View and manage news articles.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* You can add a search bar or filter here if needed */}
                </CardContent>
                <CardFooter className="justify-between">
                    <p className={"font-semibold"}>News Overview</p>
                    <Button asChild>
                        <a href="/admin/news/create">
                            <PlusCircle className="mr-2 h-4 w-4" /> Create News
                        </a>
                    </Button>
                </CardFooter>
            </Card>

            <NewsDataTable data={data} />
        </div>
    );
};

export default NewsPage;
