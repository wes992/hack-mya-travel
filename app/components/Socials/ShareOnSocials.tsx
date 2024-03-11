// "use client";

// import { Grid } from "@mui/material";
// import { usePathname } from "next/navigation";
// import React from "react";
// import {
//   EmailIcon,
//   FacebookIcon,
//   FacebookMessengerIcon,
//   GabIcon,
//   HatenaIcon,
//   InstapaperIcon,
//   LineIcon,
//   LinkedinIcon,
//   LivejournalIcon,
//   MailruIcon,
//   OKIcon,
//   PinterestIcon,
//   PocketIcon,
//   RedditIcon,
//   TelegramIcon,
//   TumblrIcon,
//   TwitterIcon,
//   ViberIcon,
//   VKIcon,
//   WeiboIcon,
//   WhatsappIcon,
//   WorkplaceIcon,
//   XIcon,
// } from "react-share";
// import {
//   EmailShareButton,
//   FacebookShareButton,
//   GabShareButton,
//   HatenaShareButton,
//   InstapaperShareButton,
//   LineShareButton,
//   LinkedinShareButton,
//   LivejournalShareButton,
//   MailruShareButton,
//   OKShareButton,
//   PinterestShareButton,
//   PocketShareButton,
//   RedditShareButton,
//   TelegramShareButton,
//   TumblrShareButton,
//   TwitterShareButton,
//   ViberShareButton,
//   VKShareButton,
//   WhatsappShareButton,
//   WorkplaceShareButton,
// } from "react-share";

// const ShareOnSocials = ({ title }: { title: string }) => {
//   const pathname = usePathname();

//   const origin =
//     typeof window !== "undefined" && window.location.origin
//       ? window.location.origin
//       : "";

//   const URL = `${origin}${pathname}`;
//   const linkTitle = `Check this out - ${title}`;

//   return (
//     <Grid container gap={2} py={2}>
//       <FacebookShareButton
//         url={URL}
//         className="Demo__some-network__share-button"
//       >
//         <FacebookIcon size={"2rem"} round />
//       </FacebookShareButton>
//       <TwitterShareButton
//         url={URL}
//         title={linkTitle}
//         className="Demo__some-network__share-button"
//       >
//         <XIcon size={"2rem"} round />
//       </TwitterShareButton>
//       <LinkedinShareButton
//         url={URL}
//         className="Demo__some-network__share-button"
//       >
//         <LinkedinIcon size={"2rem"} round />
//       </LinkedinShareButton>
//       <PinterestShareButton url={URL} media={linkTitle}>
//         <PinterestIcon size={"2rem"} round />
//       </PinterestShareButton>
//     </Grid>
//   );
// };

// export { ShareOnSocials };

export const ShareOnSocials = () => {
  return <div>Share</div>;
};
