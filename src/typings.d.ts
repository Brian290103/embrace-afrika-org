export interface NewsType {
    id: string;
    title: string;
    content: string;
    caption: string;
    slug: string;
    featuredImageUrl: string;
    createdAt: string; // Or Date, if you want to parse it as a Date object
}
