"use client";

import React, { Fragment } from "react";
import { useResources } from "../../common/config";
import {
  Grid,
  Button,
  CardActions,
  Card as MUICard,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CardActionArea,
} from "@mui/material";
import Image from "next/image";

const Card = ({ card }: any) => {
  const labels = useResources("labels");
  const filteredHighlights = card.highlights.slice(0, 3);
  const isAPick = false;

  return (
    <MUICard
      key={card._id}
      sx={(theme) => ({
        display: "flex",
        p: 2,
        width: "80%",
        alignItems: "center",
        bgcolor: "#EEE",
      })}
    >
      <CardActionArea
        sx={{ display: "flex", flex: 6 }}
        onClick={() => console.log("clicked card")}
      >
        <Grid item flex={1}>
          <CardMedia
            sx={{
              position: "relative",
              height: 150,
              width: 225,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Image src={card?.photo?.img?.data} alt={card?.photo?.desc} fill />
          </CardMedia>
        </Grid>

        <CardContent sx={{ flex: 4 }}>
          <Grid
            container
            gap={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item key="nameSubtitle" flex={6}>
              <Typography
                gutterBottom
                variant="h6"
                sx={(theme) => ({
                  color: theme.palette.primary.dark,
                })}
              >
                {"Capital One Venture X Business"}
                {/* {card.name} */}
              </Typography>
              <Typography
                variant="body2"
                sx={(theme) => ({
                  color: theme.palette.warning.main,
                  fontWeight: theme.typography.fontWeightBold,
                })}
              >
                {card.subtitle}
              </Typography>
            </Grid>

            {isAPick && (
              <Grid item key="isAPick" flex={1}>
                {/*something will go here */}
              </Grid>
            )}

            <Grid item flex={isAPick ? 5 : 6} p={0}>
              <List sx={{ p: 0 }}>
                {filteredHighlights.map((hl: string, index: number) => (
                  <Fragment key={index}>
                    <ListItem sx={{ p: 0 }}>
                      <ListItemText
                        secondary={hl}
                        sx={(theme) => ({
                          color: theme.palette.primary.dark,
                        })}
                      />
                    </ListItem>
                    {index !== filteredHighlights.length - 1 && (
                      <Divider component="li" />
                    )}
                  </Fragment>
                ))}
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Button
          color="warning"
          variant="outlined"
          onClick={() => console.log("clicked Apply")}
          sx={(theme) => ({
            px: 1,
            fontWeight: theme.typography.fontWeightBold,
          })}
        >
          Apply Now
        </Button>
        <Typography variant="caption" sx={{ fontSize: ".6rem" }}>
          {'Securely with "Bank X"'}
        </Typography>
      </CardActions>
    </MUICard>
  );
};

export { Card };
