"use client";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Section, types } from "..";
import { Fragment } from "react";
import { redirect, useRouter } from "next/navigation";

type FeaturedCardProps = {
  card: Omit<types.CreditCard, "highlights"> & {
    highlights: string[];
  };
};

export const FeaturedCard = ({ card }: FeaturedCardProps) => {
  const router = useRouter();
  if (!card) {
    return null;
  }

  const topHighlights = card.highlights.slice(0, 4);

  const handleRedirect = () => {
    router.push(`/cards/${card.slug}`);
  };

  return (
    <Section
      header="Featured Card"
      content={
        <Card
          sx={{
            borderRadius: 3,
            bgcolor: "#e3e9ef",
            maxWidth: "700px",
            m: 2,
          }}
        >
          <Stack p={2}>
            <Typography variant="h5" color="primary.dark" fontWeight={"medium"}>
              {card.name}
            </Typography>
            <Typography variant="body1" color="warning.main">
              {card.subtitle}
            </Typography>
          </Stack>

          <CardContent sx={{ p: 0, position: "relative" }}>
            <Grid
              container
              gap={2}
              p={2}
              justifyContent={"center"}
              flexWrap={{ xs: "wrap", md: "nowrap" }}
            >
              <Grid
                item
                sx={{
                  overflow: "hidden",
                  maxHeight: "200px",
                  maxWidth: "300px",
                }}
              >
                <CardMedia
                  component="img"
                  image={card.photo?.img?.data}
                  width={"100%"}
                  alt="credit card"
                />
              </Grid>
              <Grid item maxWidth={{ xs: "100%", md: "50%" }}>
                <List>
                  {topHighlights.map((hl, index) => (
                    <Fragment key={index}>
                      <ListItem sx={{ p: 0 }}>
                        <ListItemText primary={hl} />
                      </ListItem>
                      {index !== topHighlights.length - 1 && (
                        <Divider component="li" />
                      )}
                    </Fragment>
                  ))}
                </List>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="warning"
                onClick={handleRedirect}
              >
                Learn More
              </Button>
            </Grid>
          </CardContent>
        </Card>
      }
    />
  );
};
