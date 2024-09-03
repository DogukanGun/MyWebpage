import { replaceImageLinks } from "@/helpers/utils";
import { useState, useEffect } from "react";


interface Feed {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
}

interface Item {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
    enclosure: string;
    image?: string;
    categories: string[];
}

interface RootObject {
    status: string;
    feed: Feed;
    items: Item[];
}

const BlogCard: React.FC<{ item: Item }> = ({ item }) => (
    <a href={item.link} className="shadow">
        <div
            className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
            style={{ backgroundImage: `url(${replaceImageLinks(item.description).images[0]})` }}
        >
            <span
                className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"
            ></span>
            <span
                className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base"
            >Read More</span>
        </div>
        <div className="bg-white py-6 sm:h-84 lg:h-64 xl:h-72 px-5 xl:py-8">
            <span className="block font-body text-lg font-semibold text-black">{item.title}</span>
            <span className="block pt-2 font-body text-grey-20">{replaceImageLinks(item?.description)?.texts[0]?.slice(0, 200)} ...</span>
        </div>
    </a>
);

const Blog = () => {

    const [articles, setArticles] = useState<Item[]>();

    useEffect(() => {
        fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@dogukangundogan5")
            .then(res => res.json())
            .then(data => setArticles(data.items))
    }, []);

    return (
        <div className="bg-grey-50 mt-5" id="blog">
            <div className="container py-16 md:py-20">
                <h2
                    className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
                >
                    I also like to write
                </h2>
                <h4
                    className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl"
                >
                    Check out my latest posts!
                </h4>
                <div
                    className="mx-auto grid w-full grid-cols-1 gap-6 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10"
                >
                    {articles && articles?.slice(0, 3).map((article) => {
                        return <BlogCard item={article} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Blog;