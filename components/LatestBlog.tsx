import { getLatestBlogs } from "@/sanity/queries";
import { Title } from "./ui/Text";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();
  console.log("BLOGS:", JSON.stringify(blogs, null, 2));
  return (
    <div className="mb-10 lg:mb-20">
      <Title>Lates Blog</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {blogs?.map((blog) => (
          <div key={blog._id} className="overflow-hidden rounded-lg">
            {blog?.mainImage && (
              <Link href={`/blog/${blog?.slug?.current}`}>
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt={`${blog.title}`}
                  width={500}
                  height={500}
                  className="w-full max-h-80 object-cover"
                />
              </Link>
            )}
            <div className="bg-shop-light-bg p-5">
              <div className="text-xs flex items-center gap-5 justify-between">
                <div className="flex items-center relative group cursor-pointer">
                  {blog?.blogCategories?.map((item, index) => (
                    <p
                      key={index}
                      className="font-semibold text-shop-dark-green tracking-wider"
                    >
                      {item?.title}
                    </p>
                  ))}
                  <span className="absolute left-0 -bottom-1.5 bg-light-color/30 inline-block w-full h-0.5 group-hover:bg-shop-dark-green hover:cursor-pointer hoverEffect" />
                </div>
                <p className="flex items-center gap-1 text-light-color relative group hover:cursor-pointer hover:text-shop-dark-green hoverEffect">
                  <Calendar size={15} />{" "}
                  {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                  <span className="absolute left-0 -bottom-1.5 bg-light-color/30 inline-block w-full h-0.5 group-hover:bg-shop-dark-green hoverEffect" />
                </p>
              </div>
              <Link
                href={`/blog/${blog?.slug?.current}`}
                className="text-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-shop-dark-green hoverEffect"
              >
                {blog.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
