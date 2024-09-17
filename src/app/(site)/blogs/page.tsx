import BlogCard from "@/components/blogs/blog-card";
import { getAllBlogs } from "@/sanity/data/blog-data";
import Image from "next/image";
import React from "react";

type Props = {};

const Blogs = async (props: Props) => {
  const blogs = await getAllBlogs();
  return (
    <div className="flex flex-col gap-4 p-8 md:p-16 lg:px-20">
      <div className="text-5xl font-bold text-center text-white flex flex-col items-start justify-center">
        <h1 className="bg-gradient-to-r from-[#31B553] to-[#0AA294] bg-clip-text text-transparent">
          Our Blogs
        </h1>
        <Image
          src="hero-sep.svg"
          height={10}
          width={300}
          alt="Separator"
          className="mt-5 pl-14 items-center justify-center justify-items-center place-items-center"
        />
      </div>
      <h2 className="text-lg text-white">
        At the SRM Alexa Developer Club, our blog offers a rich blend of tech
        innovations, from AI and cybersecurity to app development insights.
        Beyond tech, explore thought-provoking articles on leadership,
        creativity, and societal impacts. Our diverse content ensures there&apos;s
        always something intriguing for tech enthusiasts and curious minds
        alike.
      </h2>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-1">
        {blogs.map((blog, idx) => (
          <BlogCard key={idx} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
