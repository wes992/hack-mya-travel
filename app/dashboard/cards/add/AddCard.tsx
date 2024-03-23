"use client";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import {
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { uploadImages } from "@/lib/actions";
import ImageUploader from "@/app/components/ImageUploader/ImageUploader";
import { types } from "@/app/components";

export const AddCard = ({
  card = null,
  editing = true,
}: types.AddCardProps) => {
  const defaultValues = {
    name: card?.name || "",
    subtitle: card?.subtitle || "",
    highlights: card?.highlights || [{ value: "" }],
    photo: card?.photo || "",
    isFeatured: card?.isFeatured || false,
  };

  const [disabled, setDisabled] = useState<boolean>(!editing);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const methods = useForm<types.CreditCard>({ defaultValues });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "highlights",
    rules: { maxLength: 5 },
  });

  const onSubmit = async (data: FieldValues) => {
    let photo = undefined;
    if (data.photo) {
      const uploadResult = await uploadImages(data.photo);
      photo = uploadResult[0]._id; //ensures we are only taking the first entry
      debugger;
    }
    const highlights = data.highlights.map(
      (item: types.Highlight) => item.value
    );

    debugger;

    console.log({ data });
    // await upsertCard({
    //   ...data,
    //   highlights,
    //   photo,
    // });
  };

  return (
    mounted && (
      <FormProvider {...methods}>
        {disabled && !!card && (
          <Grid container item gap={2} justifyContent={"center"}>
            <Button onClick={() => setDisabled(false)}>Edit</Button>
            {/* <form action={deletePost}> */}
            <form>
              <input type="hidden" name="id" value={card._id} />
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
            {...register("name", {
              required: "This field is needed for the DB",
            })}
            fullWidth
            label="Name"
            error={!!errors.name}
            helperText={String(errors?.name?.message || "")}
            disabled={disabled}
          />

          <TextField
            {...register("subtitle")}
            fullWidth
            label="Subtitle"
            error={!!errors.subtitle}
            helperText={String(errors?.subtitle?.message || "")}
            disabled={disabled}
          />

          <Grid container item gap={2} direction="column">
            <InputLabel>Add Highlights (maximum of 5)</InputLabel>
            {fields.map((field, index) => (
              <Grid
                container
                key={field.id} // important to include key with field's id
              >
                <TextField
                  {...register(`highlights.${index}.value` as const, {
                    required: "This field must not be empty",
                  })}
                  fullWidth
                  label="Highlight"
                  error={!!errors?.highlights?.[index]?.value}
                  helperText={String(
                    errors?.highlights?.[index]?.value?.message || ""
                  )}
                  disabled={disabled}
                  sx={{ flex: 11 }}
                />
                <IconButton
                  disableRipple
                  color="error"
                  onClick={() => remove(index)}
                  sx={{ flex: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          <Button
            disabled={fields.length >= 5}
            variant="text"
            onClick={() => append({ value: "" })}
            sx={{ textTransform: "none" }}
          >
            Add Highlight
          </Button>

          <ImageUploader
            field={"photo"}
            context={methods}
            disabled={disabled}
            label={"Card Photo"}
          />

          <FormControlLabel
            {...register("isFeatured")}
            control={<Checkbox />}
            label="Mark Card as featured?"
          />

          <Grid container item mt={1} gap={2}>
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button variant="outlined" type="submit">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    )
  );
};
