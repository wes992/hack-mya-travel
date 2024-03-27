import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import CreditCardIcon from "@mui/icons-material/CreditCard";

export const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
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
