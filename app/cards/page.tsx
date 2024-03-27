import React from "react";
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
} from "@mui/material";
import Image from "next/image";

const CreditCards = async () => {
  const labels = config.get("labels");
  const cards = await getCards();

  return (
    <Grid container gap={2} mx={2} justifyContent={"center"}>
      {cards.map((card: any) => {
        //TODO: type this
        return (
          <Card key={card._id} sx={{ display: "flex", p: 2, width: "100%" }}>
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
              <Grid container gap={2}>
                <Grid item key="nameSubtitle">
                  <Typography gutterBottom variant="h5" component="div">
                    {card.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.subtitle}
                  </Typography>
                </Grid>

                <Grid item key="isAPick">
                  {/* <Typography gutterBottom variant="h5" component="div">
                {card.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.subtitle}
              </Typography> */}
                </Grid>

                <Grid item display={"flex-end"}>
                  <Stack key="highlights">
                    {card.highlights.map((highlight: string) => (
                      <Typography key={highlight} variant="subtitle1">
                        {highlight}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
            {/* </CardActionArea> */}
            <CardActions>
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
