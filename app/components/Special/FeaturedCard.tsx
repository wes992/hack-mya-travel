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

  const topHighlights = card.highlights.slice(0, 4);
  return (
    <Section
      header="Featured Card"
      content={
        <Card
          sx={{
            borderRadius: 3,
            bgcolor: "#e3e9ef",
            maxWidth: "700px",
            m: 2,
          }}
        >
          <CardHeader
            title={card.name}
            subheader={card.subtitle}
            sx={{ pb: 0 }}
          />

          <CardContent sx={{ p: 0 }}>
            <Grid
              container
              gap={2}
              p={2}
              justifyContent={"center"}
              flexWrap={{ xs: "wrap", md: "nowrap" }}
            >
              <Grid
                item
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
                  {topHighlights.map((hl, index) => (
                    <Fragment key={index}>
                      <ListItem sx={{ p: 0 }}>
                        <ListItemText primary={hl} />
                      </ListItem>
                      {index !== topHighlights.length - 1 && (
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
