import { Grid, IconButton, Tooltip } from "@mui/material";
import React from "react";
import {
  EmailIcon,
  FacebookIcon,
  InstapaperIcon,
  LinkedinIcon,
  RedditIcon,
  XIcon,
} from "react-share";
import { ContentCopy } from "@mui/icons-material";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from "react-share";

type ShareOnSocialsProps = { title: string; url: string };

const ShareOnSocials = ({ title, url }: ShareOnSocialsProps) => {
  const linkTitle = `Check this out - ${title}`;
  const linkTitles = {
    default: "Copy link",
    copied: "Link copied",
  };

  let copyTooltipTitle = linkTitles.default;

  return (
    <Grid container gap={2} py={2}>
      <Grid item pt={1}>
        <Tooltip title={"Facebook"}>
          <FacebookShareButton url={url}>
            <FacebookIcon size={"2rem"} round />
          </FacebookShareButton>
        </Tooltip>
      </Grid>
      <Grid item pt={1}>
        <Tooltip title={"Twitter"}>
          <div>
            <TwitterShareButton url={url} title={linkTitle}>
              <XIcon size={"2rem"} round />
            </TwitterShareButton>
          </div>
        </Tooltip>
      </Grid>
      <Grid item pt={1}>
        <Tooltip title={"LinkedIn"}>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={"2rem"} round />
          </LinkedinShareButton>
        </Tooltip>
      </Grid>
      <Grid item pt={1}>
        <Tooltip title="Email">
          <EmailShareButton url={url}>
            <EmailIcon size={"2rem"} round />
          </EmailShareButton>
        </Tooltip>
      </Grid>
      <Tooltip title={copyTooltipTitle}>
        <IconButton
          aria-label="copy-to-clipboard"
          onClick={() => {
            copyTooltipTitle = linkTitles.copied;
            navigator.clipboard.writeText(url); //copies to clipboard
          }}
        >
          <ContentCopy />
        </IconButton>
      </Tooltip>
    </Grid>
  );
};

export { ShareOnSocials };

// export const ShareOnSocials = () => {
//   return <div>Share</div>;
// };
