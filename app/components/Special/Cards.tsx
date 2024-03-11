import React, { Fragment } from "react";
import { Section } from "..";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

type CardsProps = {
  cards: any[];
  header: string;
};

const highlights = [
  "Earn Alaska’s Famous Companion Fare™",
  "Free Checked Bag Benefit",
  "3 miles per dollar spent on eligible Alaska Airlines purchases",
  "Priority Boarding Benefit",
  "Must apply here. Offers vary elsewhere.",
];

const FeaturedCard = () => {
  return (
    <Card sx={{ borderRadius: 3, bgcolor: "#e3e9ef" }}>
      <CardHeader
        title={"Visa Credit Card"}
        subheader={"Lorem ipsum dolor sit amet consectetur."}
      />

      <CardContent sx={{ p: 0 }}>
        <Grid container gap={2} justifyContent={"center"}>
          <Grid item maxWidth={"50%"} pt={2}>
            <CardMedia
              component="img"
              image={"https://picsum.photos/300/200"}
              width={"100%"}
              alt="credit card"
            />
          </Grid>
          <Grid item maxWidth={"50%"}>
            <List>
              {highlights.map((hl, index) => (
                <Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={hl} />
                  </ListItem>
                  {index !== highlights.length - 1 && (
                    <Divider component="li" />
                  )}
                </Fragment>
              ))}
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const Cards = ({ cards, header }: CardsProps) => {
  return <Section header={header} content={<FeaturedCard />} />;
};

export { Cards };
