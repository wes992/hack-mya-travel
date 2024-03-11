//@ts-nocheck
import { getUser } from "@/lib/data";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
const UserDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await getUser(id);

  //TODO: Add ability to delete from here
  return (
    <Grid container gap={4}>
      <Grid container flex={1} borderRadius={1} p={2} height={"max-content"}>
        <Card>
          <CardMedia
            component="img"
            src={user.picture}
            sx={{ width: "100%", maxHeight: "300px", borderRadius: 1 }}
          />
          <CardContent>
            <Typography variant="body1">{`${user.given_name} ${user.family_name}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* //Todo: refactor this to use RHF/MUI */}
      <Grid container flex={3} borderRadius={1} p={2}>
        <Grid component={"form"} container gap={2} direction={"column"}>
          <TextField
            size="small"
            label={"First Name"}
            value={user.given_name ?? ""}
            disabled
          />

          <TextField
            size="small"
            label={"Last Name"}
            value={user.family_name ?? "" ?? ""}
            disabled
          />

          <TextField
            size="small"
            label={"Username"}
            value={user.username ?? ""}
            disabled
          />

          <TextField
            size="small"
            label={"Email"}
            value={user.email ?? ""}
            disabled
          />

          {/* <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} selected={user.isAdmin}>
              Yes
            </option>
            <option value={false} selected={!user.isAdmin}>
              No
            </option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true} selected={user.isActive}>
              Yes
            </option>
            <option value={false} selected={!user.isActive}>
              No
            </option>
          </select> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserDetailsPage;
