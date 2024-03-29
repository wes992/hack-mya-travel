"use client";

import { uploadImages } from "@/lib/actions";
import { Avatar, Button, Grid, InputLabel, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { formatFiles } from "./utils";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageUploader = ({
  context,
  multiple = false,
  accept = "image/jpg",
  field = "files",
  uploadOnAttach = false,
  disabled = false,
  label = "Upload a coverPhoto",
  required = false,
}: any) => {
  //TODO: Type these props

  const form = useForm();
  const formContext = context ?? form;

  const {
    control,
    setValue,
    formState: { errors },
    clearErrors,
  } = formContext;

  const [previewImages, setPreviewImages] = useState<any[]>([
    formContext.formState?.defaultValues?.[field],
  ]);

  const options = required
    ? {
        required: "This is a required field",
      }
    : {};

  const handleUploadedFile = async (event: any) => {
    const files: File[] = Array.from(event.target.files);

    const successfulFormats: any[] = await formatFiles(files);
    setValue(field, successfulFormats);
    clearErrors(field);
    setPreviewImages(successfulFormats);
    if (uploadOnAttach) {
      await uploadImages(successfulFormats);
    }
  };

  return (
    <Grid container direction={"column"} gap={1}>
      <InputLabel>{label}</InputLabel>
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
          <Controller
            name={field}
            control={control}
            rules={options}
            render={({ field }) => (
              <input
                accept={accept}
                hidden
                multiple={multiple}
                type="file"
                onChange={(e) => {
                  handleUploadedFile(e);
                  field.onChange(e.target.files);
                }}
              />
            )}
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
      {errors?.[field]?.message && (
        <Typography variant="caption" color="error">
          {errors?.[field]?.message}
        </Typography>
      )}
    </Grid>
  );
};

export default ImageUploader;
