"use client";

import {
  Box,
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

type AddCardProps = {
  card: any | null;
  editing: boolean;
};

type Highlight = {
  value: string;
};
type FormValues = {
  name: string;
  subtitle: string;
  highlights: Highlight[];
  photo: any;
  isFeatured: boolean;
};

const AddCard = ({ card = null, editing = true }: AddCardProps) => {
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

  const methods = useForm<FormValues>({ defaultValues });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "highlights",
      rules: { maxLength: 5 },
    }
  );

  console.log({ errors });

  const onSubmit = async (data: FieldValues) => {
    let photo = "";
    if (data.photo) {
      const uploadResult = await uploadImages(data.photo);
      photo = uploadResult[0]._id; //ensures we are only taking the first entry
      debugger;
    }
    const highlights = data.highlights.map((item: Highlight) => item.value);

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
            variant="contained"
            onClick={() => append({ value: "" })}
          >
            Add Highlight
          </Button>

          {/* <TextField
          {...register("highlights")}
          fullWidth
          multiline
          rows={4}
          label="Highlights - separated by commas"
          error={!!errors.highlights}
          helperText={String(errors?.highlights?.message || "")}
          disabled={disabled}
        /> */}

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

export default AddCard;
