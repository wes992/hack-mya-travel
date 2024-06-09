"use client";

import { useFeatureFlag } from "@/app/common/utils";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function SubscribeNewsletter() {
  const [email, setEmail] = useState("");
  const show = useFeatureFlag("newsletter");
  const handleSubscribe = async (evt) => {
    evt.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ email }),
      "Content-Type": "application/json",
    });
    const payload = await res.json();
    if (payload.success) {
      alert(payload.message);
    } else {
      alert("Failed to subscribe to newsletter");
    }
  };
  return !show ? null : (
    // <div className="flex flex-col items-center mb-10">
    <Grid
      container
      direction="column"
      component="form"
      onSubmit={handleSubscribe}
      sx={{ alignItems: "center", maxWidth: 500 }}
    >
      <Typography variant="h4">Subsribe to our Newsletter!</Typography>
      <Typography color="gray">
        Subscribe to our newsletter and stay updated.
      </Typography>
      <TextField
        size="small"
        type="email"
        placeholder="Your email"
        required
        onChange={(evt) => setEmail(evt.target.value)}
      />
      <Button role="submit" variant="contained" sx={{ mt: 1 }}>
        Subscribe
      </Button>
    </Grid>
    // </div>
  );
}
export { SubscribeNewsletter };
