import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardHeader,
  Avatar,
} from "@mui/material";
import Link from "next/link";
import { types } from ".";
import Image from "next/image";

//TODO: Add Like/comments section

const BlogCard = ({ post }: any) => {
  const { id, title, subtitle, coverPhoto, slug, author, datePublished } = post;
  return (
    <Card
      sx={{
        zIndex: 1,
        maxWidth: { xs: "100%", sm: "50%", md: 300 },
        "&:hover": {
          " .MuiCardMedia-img": { transform: "scale(1.2)" },
        },
        mx: 2,
        transition: "all .3s ease-in-out",
      }}
    >
      <Link
        href={`posts/${slug}`}
        style={{ textDecoration: "none", color: "inherit", overflow: "hidden" }}
      >
        <Box sx={{ maxHeight: 600, overflow: "hidden" }}>
          <CardMedia
            component="img"
            src={coverPhoto?.img?.data}
            alt={coverPhoto?.img?.desc}
            sx={{
              height: { xs: "100%", md: 200 },
              transition: "all .2s ease",
            }}
          />
        </Box>

        <CardHeader
          avatar={
            <Avatar
              alt={author?.name}
              src={author?.picture}
              aria-label="author"
            />
          }
          title={title}
          subheader={datePublished}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </CardContent>
      </Link>
      {/* <CardContent>
        <Typography>TODO: Add like/comments here?</Typography>
      </CardContent> */}
    </Card>
  );
};

export { BlogCard };
