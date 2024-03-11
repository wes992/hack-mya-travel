"use client";

import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { deletePost, uploadImages, upsertPost } from "@/lib/actions";
import { PostContent } from ".";
import { useUser } from "@auth0/nextjs-auth0/client";
import ImageUploader from "@/app/components/ImageUploader/ImageUploader";

type CreatePostProps = {
  post: any | null;
  editing: boolean;
};

const CreatePost = ({ post = null, editing = true }: CreatePostProps) => {
  const defaultValues = {
    title: post?.title || "",
    subtitle: post?.subtitle || "",
    content: post?.content.html || "",
    coverPhotoUrl: post?.coverPhoto || "",
    isFeatured: post?.isFeatured || false,
  };

  const [disabled, setDisabled] = useState<boolean>(!editing);

  const methods = useForm({ defaultValues });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { user, error, isLoading } = useUser();

  const onSubmit = async (data: FieldValues) => {
    const parsedContent = JSON.parse(JSON.stringify(data.content));
    if (!error && !isLoading) {
      const uploadResult = await uploadImages(data.coverPhotoUrl);
      const coverPhoto = uploadResult[0]._id; //ensures we are only taking the first entry
      await upsertPost({
        ...data,
        authorEmail: user!.email,
        content: parsedContent,
        coverPhoto, //ensures we are only taking the first entry
      });
    }
  };

  return (
    <FormProvider {...methods}>
      {disabled && !!post && (
        <Grid container item gap={2} justifyContent={"center"}>
          <Button onClick={() => setDisabled(false)}>Edit</Button>
          <form action={deletePost}>
            <input type="hidden" name="id" value={post._id} />
            <Button color="warning" type="submit">
              Delete
            </Button>
          </form>
        </Grid>
      )}
      <Grid
        container
        component="form"
        gap={2}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <TextField
          {...register("title", {
            required: "This field is needed for the DB",
          })}
          fullWidth
          id="outlined-multiline-flexible"
          label="Title"
          error={!!errors.title}
          helperText={String(errors?.title?.message || "")}
          disabled={disabled}
        />

        <TextField
          {...register("subtitle")}
          fullWidth
          id="outlined-multiline-flexible"
          label="Subtitle"
          error={!!errors.title}
          helperText={String(errors?.title?.message || "")}
          disabled={disabled}
        />

        <ImageUploader
          field={"coverPhotoUrl"}
          context={methods}
          disabled={disabled}
        />

        <PostContent
          {...register("content")}
          disabled={disabled}
          setDisabled={setDisabled}
        />
      </Grid>
    </FormProvider>
  );
};

export { CreatePost };
