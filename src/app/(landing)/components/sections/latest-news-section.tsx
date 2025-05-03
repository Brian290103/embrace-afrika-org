import Link from "next/link";
import React from "react";
import HeaderTitle from "@/app/(landing)/components/header-title";
import { NewsType } from "@/typings";
import { getNews } from "@/actions/newsAction";
import { format } from "date-fns"; // Import date-fns

interface LatestNewsSectionProps {
  hideTitle?: boolean;
}

const LatestNewsSection: React.FC<LatestNewsSectionProps> = async ({
  hideTitle,
}) => {
  const newsItems: NewsType[] = await getNews();
  return (
    <div className="bg-muted flex flex-col gap-5 w-full">
      {!hideTitle && (
        <HeaderTitle
          title="Latest News"
          url="/news"
          subtitle="Stay Updated with the Latest Events and Announcements"
        />
      )}

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-3 gap-y-5 p-2 md:grid-cols-2 lg:grid-cols-2">
        {newsItems
          .slice()
          .reverse()
          .map((news) => (
            <Link
              href={`/news/${news.slug}`}
              key={news.id}
              className="group grid grid-cols-1 gap-3 overflow-hidden rounded-xl bg-white lg:grid-cols-2"
            >
              <div className="h-full w-full overflow-hidden md:h-56 lg:h-full">
                <img
                  src={news.featuredImageUrl}
                  alt={news.title}
                  className="h-[350px] w-full object-cover duration-300 group-hover:scale-150"
                />
              </div>

              <div className="flex flex-col gap-2 px-5 pb-5">
                <h3 className="mt-4 font-heading3 text-lg font-semibold group-hover:text-brand-primary">
                  {news.title}
                </h3>
                <span className="text-muted-foreground">
                  {format(new Date(news.createdAt), "PPP")}
                </span>{" "}
                {/* Format the date */}
                <div className="w-8 bg-muted p-0.5"></div>
                <p className="mt-2 text-muted-foreground">{news.caption}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default LatestNewsSection;
