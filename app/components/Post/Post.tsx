"use client";

import React, { useState } from "react";
import {
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import { Popup } from "../Popup";
import { Footer } from "./Footer";
import { MoreVert, Reply } from "@mui/icons-material";
import { formatDate } from "../utils";
import { ShareOnSocials } from "../Socials/ShareOnSocials";
import { getReadingTime } from "./utils";

let url = "";

if (typeof window !== "undefined") {
  url = window.location.href;
}

console.log({ url });

const Post = ({ post }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [sharePostModal, setSharePostModal] = useState<boolean>(false);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickMenuItem = (url: string) => {
    setAnchorEl(null);
    setSharePostModal(Boolean(url));
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

  const { date } = formatDate(createdAt);
  const estimatedReadTime = getReadingTime(content.html);

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Container sx={{ p: 0, width: { xs: "100%", md: "80%" } }}>
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
          ${family_name} - ${date} - ${estimatedReadTime} min read`}
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
            <div
              // style={{ maxWidth: "100%" }}
              dangerouslySetInnerHTML={{ __html: content.html }}
            ></div>
          </Grid>
        </CardContent>
        <Footer post={post} url={url} />
      </Container>
      <Popup anchorEl={anchorEl} open={open} handleClose={handleClose}>
        <MenuItem onClick={() => onClickMenuItem(url)}>
          Share Post <Reply sx={{ ml: 1, transform: "scaleX(-1)" }} />
        </MenuItem>
      </Popup>
      <Dialog open={sharePostModal} onClose={() => setSharePostModal(false)}>
        <DialogTitle>How would you would like to share this?</DialogTitle>
        <DialogContent>
          <ShareOnSocials title={post.title} url={url} />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export { Post };
