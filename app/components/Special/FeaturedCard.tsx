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
} from "@mui/material";
import { Section, types } from "..";
import { Fragment } from "react";

type FeaturedCardProps = {
  card: Omit<types.CreditCard, "highlights"> & {
    highlights: string[];
  };
};

export const FeaturedCard = ({ card }: FeaturedCardProps) => {
  if (!card) {
    return null;
  }
  return (
    <Section
      header="Featured Card"
      content={
        <Card
          sx={{ borderRadius: 3, bgcolor: "#e3e9ef", maxWidth: "700px", m: 2 }}
        >
          <CardHeader title={card.name} subheader={card.subtitle} />

          <CardContent sx={{ p: 0 }}>
            <Grid
              container
              gap={2}
              justifyContent={"center"}
              flexWrap={{ xs: "wrap", md: "nowrap" }}
            >
              <Grid
                item
                pt={2}
                sx={{
                  overflow: "hidden",
                  maxHeight: "200px",
                  maxWidth: "300px",
                }}
              >
                <CardMedia
                  component="img"
                  image={card.photo?.img?.data}
                  width={"100%"}
                  alt="credit card"
                />
              </Grid>
              <Grid item maxWidth={{ xs: "100%", md: "50%" }}>
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
