// import { Search, Table } from "@/app/components";
import { Table } from "@/app/components";
import { Button, Grid, TableRow, TableCell } from "@mui/material";
import Link from "next/link";
import React, { Suspense } from "react";
import Pagination from "../pagination/pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getUsers } from "@/lib/data";
import { deleteUser } from "@/lib/actions";
import { Search } from "../search";
import { UserBubble } from "@/app/components/Navigation/UserBubble";

const UsersPage = async () => {
  const users = await getUsers();

  const tableColumns = [
    "Name",
    "Email",
    "Created At",
    "Role",
    "Status",
    "Action",
  ];
  const renderRow = (row: any) => {
    //TODO: type prop
    return (
      <TableRow
        key={row._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <UserBubble user={row} showName />
        </TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.createdAt?.toString() || Date.now()}</TableCell>
        <TableCell>{row.isAdmin ? "Admin" : "Client"}</TableCell>
        <TableCell>{row.isActive ? "Active" : "Inactive"}</TableCell>
        <TableCell>
          <Grid container gap={1}>
            <Link href={`/dashboard/users/${row._id}`}>
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
            <form action={deleteUser}>
              <input type="hidden" name="id" value={row._id} />
              <Button
                size="small"
                type="submit"
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
        <Suspense fallback={"...fallback for users"}>
          <Search placeholder="Search for a user" />
        </Suspense>
        <Link href="/dashboard/users/add">
          <Button variant="contained">Add User</Button>
        </Link>
      </Grid>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Table
          tableColumns={tableColumns}
          tableRows={users}
          renderRow={renderRow}
        />
      </Grid>
      <Pagination />
    </Grid>
  );
};

export default UsersPage;
