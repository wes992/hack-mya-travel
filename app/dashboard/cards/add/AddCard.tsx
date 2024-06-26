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
import { deleteCard, uploadImages, upsertCard } from "@/lib/actions";
import ImageUploader from "@/app/components/ImageUploader/ImageUploader";
import { types } from "@/app/components";
import Link from "next/link";
import { PostContent } from "../../posts/add";

export const AddCard = ({
  card = null,
  editing = true,
}: types.AddCardProps) => {
  const defaultValues = {
    name: card?.name || "",
    content: card?.content?.html || "",
    subtitle: card?.subtitle || "",
    bank: card?.bank || "",
    highlights: card?.highlights || [{ value: "" }],
    photo: card?.photo || "",
    isFeatured: card?.isFeatured || false,
    referralLink: card?.referralLink || "",
  };

  const [disabled, setDisabled] = useState<boolean>(!editing);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const methods = useForm({ defaultValues });

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "highlights",
  });

  const onSubmit = async (data: FieldValues) => {
    const parsedContent = JSON.parse(JSON.stringify(data.content));

    let photo = undefined;
    if (data.photo) {
      if (data.photo?._id) {
        photo = data.photo._id;
      } else {
        const uploadResult = await uploadImages(data.photo);
        photo = uploadResult[0]?._id; //ensures we are only taking the first entry
      }
    }
    const highlights = data.highlights.map(
      (item: types.Highlight) => item.value
    );

    if (card) {
      data.id = card._id;
    }

    await upsertCard({
      ...data,
      highlights,
      photo,
      content: parsedContent,
    });
  };

  return (
    mounted && (
      <FormProvider {...methods}>
        {disabled && !!card && (
          <Grid container item gap={2} justifyContent={"center"}>
            <Button onClick={() => setDisabled(false)}>Edit</Button>
            <form action={deleteCard}>
              {/* <form> */}
              <input type="hidden" name="id" value={card._id} />
              <Button color="error" type="submit">
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
          <Grid container gap={2}>
            <Grid item flex={1}>
              <TextField
                {...register("name", {
                  required: "This field is needed for the DB",
                })}
                label="Name"
                fullWidth
                placeholder="Visa Rewards card"
                error={!!errors.name}
                helperText={String(errors?.name?.message || "")}
                disabled={disabled}
              />
            </Grid>

            <Grid item flex={1}>
              <TextField
                {...register("bank", {
                  required: "This field is needed for the DB",
                })}
                fullWidth
                label="Issuing Bank"
                placeholder="Visa Rewards card"
                error={!!errors.bank}
                helperText={String(errors?.bank?.message || "")}
                disabled={disabled}
              />
            </Grid>

            <Grid item flex={1}>
              <FormControlLabel
                {...register("isFeatured")}
                control={<Checkbox defaultChecked={defaultValues.isFeatured} />}
                label="Mark Card as featured?"
                disabled={disabled}
              />
            </Grid>
          </Grid>

          <TextField
            {...register("subtitle")}
            fullWidth
            label="Subtitle"
            placeholder="The best card for travel - optional"
            error={!!errors.subtitle}
            helperText={String(errors?.subtitle?.message || "")}
            disabled={disabled}
          />
          <ImageUploader
            required
            field={"photo"}
            context={methods}
            disabled={disabled}
            label={"Card Photo"}
          />

          <TextField
            {...register("referralLink")}
            fullWidth
            label="Referral Link"
            placeholder="Optional referral link"
            error={!!errors.referralLink}
            helperText={String(errors?.referralLink?.message || "")}
            disabled={disabled}
          />

          <Grid container item gap={2} direction="column">
            <InputLabel>Card Highlights</InputLabel>
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
                  disabled={disabled}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="text"
            onClick={() => append({ value: "" })}
            sx={{ textTransform: "none" }}
            disabled={disabled}
          >
            Add Highlight
          </Button>

          <PostContent
            {...register("content")}
            disabled={disabled}
            setDisabled={setDisabled}
            cancelButton={() => (
              <Button
                variant="outlined"
                component={Link}
                href="/dashboard/cards"
              >
                Cancel
              </Button>
            )}
          />

          {/* <Grid container item mt={1} gap={2}>
            <Button
              variant="contained"
              type="submit"
              disabled={disabled || Object.keys(errors).length > 0}
            >
              Save
            </Button>
            <Button variant="outlined" component={Link} href="/dashboard/cards">
              Cancel
            </Button>
          </Grid> */}
        </Grid>
      </FormProvider>
    )
  );
};
