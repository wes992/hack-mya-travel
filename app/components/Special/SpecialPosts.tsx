import React from "react";
import { BlogCard, Section, types } from "..";

type SpecialPostsProps = {
  posts: types.Post[];
  header: string;
};

const SpecialPosts = ({ posts, header }: SpecialPostsProps) => {
  if (posts.length < 1) {
    return null;
  }
  return (
    <Section
      header={header}
      content={posts.map((post) => (
        <BlogCard post={post} key={post.id} />
      ))}
    />
  );
};

export { SpecialPosts };
