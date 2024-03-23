"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Post, User, Image } from "./models";
import { connectToDB, getSlug } from "./utils";
// import bcrypt from "bcrypt";

// export const addUser = async (formData: any) => {
//   const { username, email, password, phone, address, isAdmin, isActive } =
//     Object.fromEntries(formData);

//   try {
//     connectToDB();

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     //TODO: Add users in Auth0. If sucessful, add to DB

//     //user data
//     // const newUser = new User({
//     //   username,
//     //   email,
//     //   password: hashedPassword,
//     //   phone,
//     //   address,
//     //   isAdmin,
//     //   isActive,
//     // });

//     // mutation here
//     // await newUser.save();
//   } catch (e) {
//     console.log(e);
//     throw new Error("Failed to create User");
//   }

//   revalidatePath("/dashboard/users");
//   redirect("/dashboard/users");
// };

export const getUserByEmail = async (email: string) => {
  try {
    await connectToDB();
    const result = await User.findOne({ email });

    return JSON.parse(JSON.stringify(result));
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get Post");
  }
};

export const upsertPost = async (formData: any) => {
  const {
    authorEmail,
    title,
    subtitle = "",
    content,
    coverPhoto = "",
    category = "uncategorized",
  } = formData;
  const slug = getSlug(title);
  //TODO: util to get current signed in Author

  try {
    connectToDB();

    const authorDetails = await getUserByEmail(authorEmail);
    const { _id } = authorDetails;
    //Post data
    const newPost = new Post({
      title,
      author: _id,
      subtitle,
      slug,
      content,
      coverPhoto,
      category,
    });

    const currentPost = await Post.findOne({ slug });
    // mutation here
    if (currentPost?.id) {
      await Post.findByIdAndUpdate(currentPost.id, {
        title,
        subtitle,
        slug,
        content,
        coverPhoto,
        category,
      });
    } else {
      await newPost.save();
    }
  } catch (e) {
    console.log(e);
    throw new Error("Failed to create Post");
  }

  revalidatePath("/dashboard/posts");
  revalidatePath("/posts");
  revalidatePath("/");
  redirect("/dashboard/posts");
};

export const deletePost = async (formData: any) => {
  console.log("formData", formData);
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();

    console.log("requesting delete for", id);

    // mutation here
    await Post.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);
    throw new Error("Failed to delete Post");
  }

  revalidatePath("/dashboard/posts");
  revalidatePath("/posts");
  revalidatePath("/");
  redirect("/dashboard/posts");
};

export const upsertUser = async (user: any) => {
  //TODO: type this
  const { given_name, family_name, nickname, name, picture, email } = user;
  try {
    connectToDB();

    const result = await User.findOne({ email });
    if (result) {
      const { _id } = result;
      await User.findByIdAndUpdate(_id, {
        given_name,
        family_name,
        nickname,
        name,
        picture,
        email,
      });
    } else {
      //user data
      const user = new User({
        given_name,
        family_name,
        nickname,
        name,
        picture,
        email,
      });
      await user.save();
    }
  } catch (e) {
    console.log(e);
    throw new Error("Failed to create User");
  }
};

export const deleteUser = async (formData: any) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    //TODO: delete user from Auth0, if successful, delete from DB

    // mutation here
    await User.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);
    throw new Error("Failed to delete User");
  }

  revalidatePath("/dashboard/users");
};

export const uploadImages = async (images: (typeof Image)[]) => {
  let imageResults = [];
  try {
    connectToDB();
    for (const i of Array.from(images ?? [])) {
      let result = await Image.findOne({ name: i.name });

      if (result) {
        imageResults.push(JSON.parse(JSON.stringify(result)));
      } else {
        const newImage = new Image({ ...i });

        result = await newImage.save();
        imageResults.push(JSON.parse(JSON.stringify(result)));
      }
    }
    return imageResults;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to upload Image");
  }
};
