import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InfoIcon from "@mui/icons-material/Info";

export const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "About Me",
    path: "/dashboard/about-me",
    icon: <InfoIcon />,
  },
  {
    title: "Users",
    path: "/dashboard/users",
    icon: <GroupIcon />,
  },
  {
    title: "Posts",
    path: "/dashboard/posts",
    icon: <ArticleIcon />,
  },
  {
    title: "Credit Cards",
    path: "/dashboard/cards",
    icon: <CreditCardIcon />,
  },
];
