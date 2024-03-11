"use client";

import React, { useState } from "react";
import { types } from "..";
import {
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import { Popup } from "../Popup";
import { Footer } from "./Footer";
import { MoreVert, Reply } from "@mui/icons-material";
import { formatDate } from "../utils";

const Post = ({ post }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    content,
    coverPhoto,
    createdAt,
    author: { given_name, family_name, picture },
    title,
    subtitle = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, quis.",
    category = "A Category",
  } = post;

  // const decodedCoverPhoto = Buffer.from(coverPhoto?.img?.data, "base64");

  const { date } = formatDate(createdAt);
  return (
    <Grid container sx={{ justifyContent: "center", margin: 3 }}>
      <Container sx={{ width: "80%" }}>
        <CardHeader
          avatar={
            <Avatar
              alt={`${given_name}
            ${family_name}`}
              src={picture}
              aria-label="author"
            />
          }
          title={`${given_name}
          ${family_name} - ${date} - 1 min read`}
          action={
            <IconButton
              aria-label="settings"
              id="post-actions"
              aria-controls={open ? "actions-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
          }
        />
        <CardContent>
          <Grid container direction="column" gap={2}>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="subtitle1">{subtitle}</Typography>

            <CardMedia
              component="img"
              src={coverPhoto?.img?.data}
              alt={title}
              sx={{ width: "100%" }}
            />
            <div dangerouslySetInnerHTML={{ __html: content.html }}></div>
          </Grid>
        </CardContent>
        <Footer post={post} />
      </Container>
      <Popup anchorEl={anchorEl} open={open} handleClose={handleClose}>
        <MenuItem onClick={handleClose}>
          Share Post <Reply sx={{ ml: 1, transform: "scaleX(-1)" }} />
        </MenuItem>
      </Popup>
    </Grid>
  );
};

export { Post };
