"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Post, User, Image, Card, AboutMe } from "./models";
import { getSlug } from "./utils";
// import { cache } from "react";
// import bcrypt from "bcrypt";

// export const addUser = async (formData: any) => {
//   const { username, email, password, phone, address, isAdmin, isActive } =
//     Object.fromEntries(formData);

//   try {

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//TODO: Add users in Auth0. If sucessful, add to DB

//user data
// const newUser = new User({
//   username,
//   email,
//   password: hashedPassword,
//   phone,
//   address,
//   isAdmin,
//   isActive,
// });

// mutation here
// await newUser.save();
//   } catch (e) {
//     console.log(e);
//     throw new Error("Failed to create User");
//   }

//   revalidatePath("/dashboard/users");
//   redirect("/dashboard/users");
// };

export const getUserByEmail = async (email: string) => {
  try {
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
    if (currentPost?._id) {
      await Post.findByIdAndUpdate(currentPost._id, {
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

export const upsertCard = async (formData: any) => {
  const {
    name,
    subtitle,
    highlights,
    photo,
    isFeatured,
    id,
    bank,
    content,
    referralLink,
  } = formData;
  const slug = getSlug(name);
  try {
    if (isFeatured) {
      //ensure all others are marked as isFeatured: false
      await Card.updateMany(
        { _id: { $ne: id } },
        { $set: { isFeatured: false } }
      );
    }

    let currentCard = await Card.findById(id);

    // mutation here
    if (currentCard?._id) {
      await Card.findByIdAndUpdate(id, {
        bank,
        content,
        name,
        slug,
        subtitle,
        highlights,
        photo,
        isFeatured,
        referralLink,
      });
    } else {
      //Card data
      const NewCard = new Card({
        bank,
        content,
        name,
        slug,
        subtitle,
        highlights,
        photo,
        isFeatured,
        referralLink,
      });

      await NewCard.save();
    }
  } catch (e) {
    console.log(e);
    throw new Error("Failed to upsert Card");
  }

  revalidatePath("/dashboard/cards");
  revalidatePath("/cards");
  revalidatePath("/");
  redirect("/dashboard/cards");
};

export const deleteCard = async (formData: any) => {
  console.log("formData", formData);
  const { id } = Object.fromEntries(formData);
  try {
    console.log("requesting delete for", id);

    // mutation here
    await Card.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);
    throw new Error("Failed to delete Card");
  }

  revalidatePath("/dashboard/cards");
  revalidatePath("/cards");
  revalidatePath("/");
  redirect("/dashboard/cards");
};

export const updateAboutMe = async (data: any) => {
  const { content, image, id } = data;

  try {
    const doc = await AboutMe.findById(id);
    if (doc.image !== image) {
      //delete old image
      // await Image.findByIdAndDelete(doc.image);
      // assign new image
      doc.image = image;
    }
    doc.content = content;
    await doc.save();
  } catch (e) {
    console.log(e);
    throw new Error("Failed to update About Me Details");
  }

  revalidatePath("/about");
  redirect("/dashboard");
};
