import { Table } from "@/app/components";
import {
  Avatar,
  Button,
  Grid,
  Stack,
  TableRow,
  TableCell,
} from "@mui/material";
import Link from "next/link";
import React, { Suspense } from "react";
import { getPosts } from "@/lib/data";
import { deletePost } from "@/lib/actions";
import { Search } from "../search";
import { RenderPostRow } from "./RenderPostRow";

type PostPageProps = {
  searchParams: {
    q?: string;
    page?: number;
  };
};

const PostsPage = async ({ searchParams }: PostPageProps) => {
  const query = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const posts = await getPosts();

  const tableColumns = ["Title", "Description", "Created By", "Action"];

  return (
    <Grid container mt={2} p={2} borderRadius={2} gap={2} bgcolor={"#EEE"}>
      {/* //TODO: Remove bgcolor */}
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        borderRadius={2}
      >
        <Suspense fallback={"...fallback for posts"}>
          <Search placeholder="Search for a post" />
        </Suspense>
        <Link href="/dashboard/posts/add">
          <Button variant="contained">Add Post</Button>
        </Link>
      </Grid>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Table
          tableColumns={tableColumns}
          tableRows={posts}
          renderRow={(row) => (
            <RenderPostRow key={row.name} row={row} action={deletePost} />
          )}
        />
      </Grid>
      {/*//TODO <Pagination /> */}
    </Grid>
  );
};

export default PostsPage;
