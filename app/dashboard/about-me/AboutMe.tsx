"use client";

import ImageUploader from "@/app/components/ImageUploader/ImageUploader";
import { updateAboutMe, uploadImages } from "@/lib/actions";
import { Button, Grid, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

const AboutMe = ({ myDetails }: any) => {
  const router = useRouter();
  const defaultValues = {
    aboutMeImage: myDetails.image || "",
    aboutMeContent: myDetails.content || "",
  };

  const formContext = useForm({ defaultValues });
  const { register, handleSubmit, getValues } = formContext;

  const onSubmit = async (data: FieldValues) => {
    let aboutMeImage = undefined;
    if (data.aboutMeImage) {
      if (data.aboutMeImage?._id) {
        aboutMeImage = data.aboutMeImage._id;
      } else {
        const uploadResult = await uploadImages(data.aboutMeImage);
        aboutMeImage = uploadResult[0]?._id; //ensures we are only taking the first entry
      }
    }

    await updateAboutMe({
      ...data,
      id: myDetails._id,
      content: data.aboutMeContent,
      image: aboutMeImage,
    });
  };

  const formPic =
    getValues("aboutMeImage")[0] || getValues("aboutMeImage") || "";

  return (
    <Grid
      component="form"
      container
      gap={4}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        height: { xs: "100vw", sm: 400 },
      }}
    >
      <Grid
        container
        item
        direction="column"
        gap={2}
        key="photoContainer"
        flex={1}
      >
        <Grid item key="photo" flex={12}>
          <Image
            src={formPic?.img?.data}
            alt={formPic?.desc}
            width={400}
            height={400}
            style={{ objectFit: "contain" }}
          />
        </Grid>
        <ImageUploader
          field={"aboutMeImage"}
          context={formContext}
          label={null}
          showPreview={false}
          sx={{ width: "fit-content", alignSelf: "center" }}
        />
      </Grid>
      <Grid
        container
        item
        direction="column"
        gap={2}
        key="contentContainer"
        flex={1}
      >
        <Grid item key="content">
          <TextField
            {...register("aboutMeContent")}
            label={"About Me"}
            fullWidth
            multiline
            rows={16}
          />
        </Grid>
        <Grid item container gap={2} key="Actions">
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Button variant="outlined" color="warning" onClick={router.back}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { AboutMe };
