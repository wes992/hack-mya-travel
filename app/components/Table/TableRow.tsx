import React from "react";
import {
  Button,
  Grid,
  TableCell,
  TableRow,
  Avatar,
  Stack,
} from "@mui/material";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const defaultSx = { "&:last-child td, &:last-child th": { border: 0 } };

const TableRowContent = ({
  showActions = true,
  key = null,
  sx = {},
  children,
}: any) => {
  //TODO: Type these props
  return (
    <TableRow key={key} sx={{ ...defaultSx, sx }}>
      {children}
      {showActions && (
        <TableCell>
          <Grid container gap={1}>
            <Link href="/">
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
            <Link href="/">
              <Button
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
            </Link>
          </Grid>
        </TableCell>
      )}
    </TableRow>
  );
};

export default TableRowContent;
