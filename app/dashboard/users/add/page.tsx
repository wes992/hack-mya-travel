//@ts-nocheck
// import { addUser } from "@/lib/actions";
import { Button, Grid } from "@mui/material";
import React from "react";

const AddUsersPage = () => {
  return (
    <Grid component={"form"} container direction={"column"} action={""}>
      <label>Username</label>
      <input type="text" name="username" placeholder="John Doe" />
      <label>Email</label>
      <input type="email" name="email" placeholder="JohnDoe@email.com" />
      <label>Password</label>
      <input type="password" name="password" />
      <label>Phone</label>
      <input type="text" name="phone" placeholder="+1234567890" />
      <label>Address</label>
      <textarea type="text" name="address" placeholder="New York" />
      <label>Is Admin?</label>
      <select name="isAdmin" id="isAdmin">
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
      <label>Is Active?</label>
      <select name="isActive" id="isActive">
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
      <Button type="submit" variant="contained">
        Update
      </Button>
    </Grid>
  );
};

export default AddUsersPage;
