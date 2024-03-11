"use client";

import { uploadImages } from "@/lib/actions";
import { Avatar, Button, Grid, InputLabel } from "@mui/material";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { formatFiles } from "./utils";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageUploader = ({
  context,
  multiple = false,
  accept = "image/jpg",
  field = "files",
  uploadOnAttach = false,
  disabled = false,
}: any) => {
  //TODO: Type these props

  const form = useForm();
  const formContext = context ?? form;

  const { register, setValue } = formContext;

  const [previewImages, setPreviewImages] = useState<any[]>([
    formContext.formState?.defaultValues?.[field],
  ]);

  // 1. add reference to input element
  const ref = useRef<HTMLInputElement>(null);
  const { ref: registerRef, ...rest } = register(field);

  const handleUploadedFile = async (event: any) => {
    const files: File[] = Array.from(event.target.files);

    const successfulFormats: any[] = await formatFiles(files);

    setValue(field, successfulFormats);
    setPreviewImages(successfulFormats);
    if (uploadOnAttach) {
      await uploadImages(successfulFormats);
    }
  };

  return (
    <Grid
      container
      direction={"column"}
      gap={1}
      // component="form"
      // action={uploadImage}
      // onSubmit={handleSubmit(onSubmit)}
    >
      <InputLabel>Upload a coverPhoto</InputLabel>
      <Grid container gap={1}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          disabled={disabled}
        >
          Upload file
          <input
            accept={accept}
            hidden
            multiple={multiple}
            type="file"
            {...rest}
            onChange={handleUploadedFile}
            ref={(e) => {
              registerRef(e);
              // ref.current = e;
            }}
          />
        </Button>
        {previewImages.map((item, index) => (
          <Avatar
            key={"preview-" + index}
            src={item?.img?.data}
            sx={{ width: "2.5rem", height: "2.5rem" }}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default ImageUploader;
