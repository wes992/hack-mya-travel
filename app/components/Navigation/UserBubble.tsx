import { Avatar, Grid, Typography } from "@mui/material";

type UserBubbleProps = {
  user: any;
  showName?: boolean;
  sx?: any;
};

export const UserBubble = ({
  user = {},
  showName = false,
  sx = {},
}: UserBubbleProps) => {
  const avatarProps = {
    src: user?.picture || undefined,
    alt: user?.name || undefined,
  };

  return (
    user && (
      <Grid
        display={"flex"}
        gap={2}
        alignItems={"center"}
        px={2}
        sx={{ ...sx }}
      >
        <Avatar {...avatarProps} />
        {showName && (
          <Typography variant="body1">{`${user.given_name} ${user.family_name}`}</Typography>
        )}
      </Grid>
    )
  );
};
