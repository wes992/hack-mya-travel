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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

import Link from "next/link";

const RenderTableRow = ({ row, action }: { row: any; action: any }) => {
  const isMediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md")
  );
  //TODO: Type prop
  return (
    <TableRow
      key={row.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      onClick={() => {
        isMediumScreen ? {} : console.log("heya");
      }}
    >
      <TableCell>{row.name}</TableCell>
      <TableCell>
        {row.isFeatured && <CheckCircleIcon color="primary" />}
      </TableCell>
      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
        <Grid container gap={1}>
          <Link href={`/dashboard/cards/${row._id}`}>
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

export { RenderTableRow };
