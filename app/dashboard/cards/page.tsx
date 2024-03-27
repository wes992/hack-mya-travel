import { Table } from "@/app/components";
import { Button, Grid } from "@mui/material";
import Link from "next/link";
import React, { Suspense } from "react";
import { getCards } from "@/lib/data";
import { deleteCard } from "@/lib/actions";
import { Search } from "../search";
import { RenderTableRow } from "./RenderTableRow";

const CardsPage = async ({ searchParams }: any) => {
  const query = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const cards = await getCards();

  if (!cards) {
    return null;
  }

  const tableColumns = ["Card Name", "Featured", "Action"];

  return (
    <Grid container mt={2} p={2} borderRadius={2} gap={2} bgcolor={"#EEE"}>
      {/* //TODO: Remove bgcolor */}
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
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
        renderRow={(row) => <RenderTableRow row={row} action={deleteCard} />}
      />
      {/*//TODO <Pagination /> */}
    </Grid>
  );
};

export default CardsPage;
