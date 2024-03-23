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
import { Section, types } from "..";
import { Fragment } from "react";

type FeaturedCardProps = {
  card: types.CreditCard;
};

export const FeaturedCard = ({ card }: FeaturedCardProps) => {
  if (!card) {
    return null;
  }
  return (
    <Section
      header="Featured Card"
      content={
        <Card sx={{ borderRadius: 3, bgcolor: "#e3e9ef" }}>
          <CardHeader title={card.name} subheader={card.subtitle} />

          <CardContent sx={{ p: 0 }}>
            <Grid container gap={2} justifyContent={"center"}>
              <Grid item maxWidth={"50%"} pt={2}>
                <CardMedia
                  component="img"
                  image={card.photo?.img?.data}
                  width={"100%"}
                  alt="credit card"
                  sx={{
                    maxWidth: "300px",
                  }}
                />
              </Grid>
              <Grid item maxWidth={"50%"}>
                <List>
                  {card.highlights.map((hl, index) => (
                    <Fragment key={index}>
                      <ListItem>
                        <ListItemText primary={hl} />
                      </ListItem>
                      {index !== card.highlights.length - 1 && (
                        <Divider component="li" />
                      )}
                    </Fragment>
                  ))}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      }
    />
  );
};
