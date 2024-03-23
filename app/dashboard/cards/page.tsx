import { Table } from "@/app/components";
import { Button, Grid, TableRow, TableCell } from "@mui/material";
import Link from "next/link";
import React, { Suspense } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getCards } from "@/lib/data";
import { deleteCard } from "@/lib/actions";
import { Search } from "../search";

const CardsPage = async ({ searchParams }: any) => {
  const query = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const cards = await getCards();

  const tableColumns = ["Card Name", "Featured", "Action"];

  const renderRow = (row: any) => {
    //TODO: Type prop
    return (
      <TableRow
        key={row.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>{row.name}</TableCell>
        <TableCell>
          {row.isFeatured && <CheckCircleIcon color="primary" />}
        </TableCell>
        <TableCell>
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
            <form key={row._id + "delete"} action={deleteCard}>
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
        <Suspense fallback={"...fallback for cards"}>
          <Search placeholder="Search for a card" />
        </Suspense>
        <Link href="/dashboard/cards/add">
          <Button variant="contained">Add Card</Button>
        </Link>
      </Grid>

      <Table
        tableColumns={tableColumns}
        tableRows={cards}
        renderRow={renderRow}
      />
      {/*//TODO <Pagination /> */}
    </Grid>
  );
};

export default CardsPage;
