import React, { Fragment } from "react";
import { config } from "../common/config";
import { getCards } from "@/lib/data";
import {
  Grid,
  Button,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Image from "next/image";

const CreditCards = async () => {
  const labels = config.get("labels");
  const cards = await getCards();

  return (
    <Grid container gap={2} mx={2} justifyContent={"center"}>
      {cards.map((card: any) => {
        //TODO: type this
        const filteredHighlights = card.highlights.filter(
          (_, index) => index < 3
        );
        return (
          <Card
            key={card._id}
            sx={{ display: "flex", p: 2, width: "100%", alignItems: "center" }}
          >
            {/* <CardActionArea> */}
            <Grid item flex={1}>
              <CardMedia
                sx={{
                  position: "relative",
                  height: 150,
                  width: 225,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={card?.photo?.img?.data}
                  alt={card?.photo?.desc}
                  fill
                />
              </CardMedia>
            </Grid>

            <CardContent sx={{ flex: 4 }}>
              <Grid
                container
                gap={2}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid item key="nameSubtitle" flex={3}>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.subtitle}
                  </Typography>
                </Grid>

                <Grid item key="isAPick" flex={3}>
                  {/* <Typography gutterBottom variant="h5" component="div">
                {card.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.subtitle}
              </Typography> */}
                </Grid>

                <Grid item flex={6}>
                  <List>
                    {filteredHighlights.map((hl, index) => (
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
            {/* </CardActionArea> */}
            <CardActions sx={{ flex: 1 }}>
              <Button size="small" color="primary">
                Sign up
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </Grid>
  );
};

export default CreditCards;
