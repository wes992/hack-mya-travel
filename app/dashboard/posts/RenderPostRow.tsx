"use client";
import React from "react";
import {
  Button,
  Grid,
  TableRow,
  TableCell,
  useMediaQuery,
  Theme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import Link from "next/link";
import { UserBubble } from "@/app/components";

const RenderPostRow = ({ row, action }: { row: any; action: any }) => {
  const isMediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md")
  );
  //TODO: Type prop
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      onClick={() => {
        isMediumScreen ? {} : console.log("heya");
      }}
    >
      <TableCell>{row.title}</TableCell>
      <TableCell>{row.subtitle}</TableCell>
      <TableCell>
        <UserBubble user={row.author} showName />
      </TableCell>
      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
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
          <form key={row._id + "delete"} action={action}>
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

export { RenderPostRow };
