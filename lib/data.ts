import { cache } from "react";
import { AboutMe, Card, Hero, Post, User } from "./models";
import { connectToDB } from "./utils";

export const getPosts = cache(async (query = "") => {
  try {
    await connectToDB();
    const posts = await Post.find().populate("author").populate("coverPhoto");

    return JSON.parse(JSON.stringify(posts));
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get Posts");
  }
});

export const getRecentPosts = cache(async (limit = 3) => {
  try {
    await connectToDB();
    const recentPosts = await Post.find({})
      .populate("author")
      .populate("coverPhoto")
      .sort({ createdAt: -1 })
      .limit(limit);

    return JSON.parse(JSON.stringify(recentPosts));
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get Recent Posts");
  }
});

export const getHero = cache(async () => {
  try {
    await connectToDB();
    const hero = await Hero.findOne().populate("image");

    return JSON.parse(JSON.stringify(hero));
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get Hero");
  }
});

export const getAboutData = cache(async () => {
  try {
    await connectToDB();

    const result = await AboutMe.findOne().populate("image");

    const parsed = JSON.parse(JSON.stringify(result));

    return parsed;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get About info");
  }
});

export const getUsers = cache(async () => {
  try {
    await connectToDB();
    const result = await User.find();
    return JSON.parse(JSON.stringify(result));
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get Users");
  }
});

export const getUser = cache(async (id: string) => {
  try {
    await connectToDB();
    const result = await User.findById(id);
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get User");
  }
});

export const getPostBySlug = cache(async (slug: string) => {
  try {
    await connectToDB();
    const result = await Post.findOne({ slug })
      .populate("author")
      .populate("coverPhoto");

    return JSON.parse(JSON.stringify(result));
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get Post");
  }
});

export const getCards = cache(async (query = {}) => {
  try {
    await connectToDB();
    const cards = await Card.find(query).populate("photo");

    return JSON.parse(JSON.stringify(cards));
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get Cards");
  }
});

export const getCard = cache(async (query = {}) => {
  try {
    await connectToDB();
    const card = await Card.findOne(query).populate("photo");

    return JSON.parse(JSON.stringify(card));
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get Card");
  }
});
export const getCardById = cache(async (id: string) => {
  try {
    await connectToDB();
    const result = await Card.findById(id).populate("photo");
    return JSON.parse(JSON.stringify(result));
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get Card");
  }
});

export const getFeaturedCard = cache(async () => {
  try {
    await connectToDB();
    const result = await Card.findOne({ isFeatured: true }).populate("photo");
    return JSON.parse(JSON.stringify(result));
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get Card");
  }
});

export const getRelatedPosts = async (value: string) => {
  const allPosts = await Post.find();

  const lowerCased = value.toLowerCase();

  const relatedPosts = allPosts.filter(
    (post) =>
      post.content.html.toLowerCase().includes(lowerCased) ||
      post.title.toLowerCase().includes(lowerCased)
  );

  return relatedPosts;
};
