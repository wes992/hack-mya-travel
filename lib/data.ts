import { AboutMe, Hero, Post, User } from "./models";
import { connectToDB } from "./utils";

export const getPosts = async (query = "") => {
  try {
    await connectToDB();
    const posts = await Post.find().populate("author").populate("coverPhoto");

    return JSON.parse(JSON.stringify(posts));
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get Posts");
  }
};

export const getRecentPosts = async (limit = 3) => {
  try {
    await connectToDB();
    const recentPosts = await Post.find({})
      .populate("author")
      .populate("coverPhoto")
      .sort({ createdAt: -1 })
      .limit(limit);
    // const { recentPosts }: { recentPosts: types.Post[] } = await client.request(
    //   GET_RECENT_POSTS,
    //   {
    //     last: 3,
    //   }
    // );

    return JSON.parse(JSON.stringify(recentPosts));
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get Recent Posts");
  }
};

export const getHero = async () => {
  try {
    // const { hero }: { hero: types.Hero } = await client.request(GET_HERO, {
    //   tag: "main",
    // });
    await connectToDB();
    const hero = await Hero.findOne();

    return JSON.parse(JSON.stringify(hero));
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get Hero");
  }
};

export const getAboutData = async () => {
  try {
    await connectToDB();

    const result = await AboutMe.findOne().populate("image");

    const parsed = JSON.parse(JSON.stringify(result));

    return parsed;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get About info");
  }
};

export const getUsers = async () => {
  try {
    await connectToDB();
    const result = await User.find();
    return JSON.parse(JSON.stringify(result));
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get Users");
  }
};

export const getUser = async (id: string) => {
  try {
    await connectToDB();
    const result = await User.findById(id);
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get User");
  }
};

export const getPostBySlug = async (slug: string) => {
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
};
