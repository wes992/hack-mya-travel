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
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getPosts } from "@/lib/data";
import { deletePost } from "@/lib/actions";
import { Search } from "../search";
import { UserBubble } from "@/app/components/Navigation/UserBubble";

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

  const renderRow = (row: any) => {
    //TODO: Type prop
    return (
      <TableRow
        key={row.title}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>{row.title}</TableCell>
        <TableCell>{row.subtitle}</TableCell>
        <TableCell>
          <UserBubble user={row.author} showName />
        </TableCell>
        <TableCell>
          <Grid container gap={1}>
            <Link href={`/dashboard/posts/${row.slug}`}>
              <Button
                size="small"
                startIcon={<VisibilityIcon />}
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                }}
              >
                View
              </Button>
            </Link>
            <form key={row._id + "delete"} action={deletePost}>
              <input type="hidden" name="id" value={row._id} />

              <Button
                type="submit"
                size="small"
                startIcon={<DeleteIcon />}
                variant="contained"
                color="error"
                sx={{
                  textTransform: "none",
                }}
              >
                Delete
              </Button>
            </form>
          </Grid>
        </TableCell>
      </TableRow>
    );
  };

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
          renderRow={renderRow}
        />
      </Grid>
      {/*//TODO <Pagination /> */}
    </Grid>
  );
};

export default PostsPage;
