import React from "react";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { upsertUser } from "@/lib/actions";

const Dashboard = withPageAuthRequired(
  //@ts-ignore
  () => {
    return <div className="">Dashboard</div>;
  },
  { returnTo: "/dashboard" }
);

export default Dashboard;
