"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Blog } from "@/sanity/schemas/blog-schema";
import Link from "next/link";


type Props = {
  blog: Blog;
};

const BlogCard = ({ blog }: Props) => {
  return (
    <CardContainer className="inter-var w-[100%] group">
      <div className="absolute  h-full w-full bg-gradient-to-r from-[#31B553] to-[#0AA294] transform scale-[0.80] rounded-full blur-3xl" />
      <CardBody className="relative  inset-0 bg-[#242424] z-40 w-auto sm:w-[30rem] h-auto rounded-xl p-6  shadow-2xl shadow-">
        <CardItem translateZ="90" className="w-full mt-4">
          <Image
            src={blog.coverImage}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={`${blog.title} image`}
          />
        </CardItem>
        <CardItem
          translateZ="100"
          className="text-xl font-bold text-white/[0.9] mt-5 line-clamp-1 group-hover:line-clamp-none"
        >
          {blog.title}
        </CardItem>
        <CardItem
          as="p" 
          translateZ="90"
          className="text-white/[0.8] font-semibold max-w-sm mt-2 line-clamp-2 group-hover:line-clamp-4"
        >
          {blog.content[0].children[0].text}
        </CardItem>
        <CardItem translateZ={70} className="w-full">
          <Image
            src="hero-sep.svg"
            height={10}
            width={5}
            alt="Separator"
            className="mt-5 w-full shadow-black drop-shadow-2xl"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-5">
          <CardItem translateZ={80} className="rounded-xl text-white/[0.8] text-xs font-bold">
            {new Date(blog.publishedOn).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </CardItem>
          <CardItem translateZ={100} className="rounded-xl  text-xs font-bold">
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <Link href={blog.link} className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 " target="_blank">
                  More on our{" "}
                <span>
                  <Image
                    src="/blogs/medium-white.png"
                    height={16}
                    width={16}
                    className="inline"
                    alt="Medium logo"
                  />
                </span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </Link>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default BlogCard;
