import { SxProps } from "@mui/system";

export type Content = {
  html: string;
  raw?: string;
  text?: string;
  markdown?: string;
};
export type Photo = {
  url: string;
  id?: string;
  alt?: string;
};

export type Hero = {
  image: Photo;
  tags: String[];
  id: string;
};

export type Author = {
  name: string;
  id: string;
  avatar: Photo;
};

export enum PostCategories {
  ALL = "All",
  TRAVEL = "Travel",
  CREDITCARDS = "Credit Cards",
  FOOD = "Eat",
  UNCATEGORIZED = "Uncategorized",
}

export type Post = {
  _id?: string;
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  content: Content;
  author: any;
  coverPhoto: Photo;
  datePublished: any;
  category: PostCategories;
  isFeatured?: Boolean;
};

export type Params = {
  params: {
    slug: string;
  };
};

export type Link = {
  id: string;
  name: string;
  route: string;
};

export type NavLinksProps = {
  links?: Link[];
  sx?: SxProps;
};

export type About = {
  content: string;
  photo: Photo;
};

export type Highlight = {
  value: string;
};
export type CreditCard = {
  _id?: string;
  id?: string;
  name: string;
  subtitle: string;
  highlights: Highlight[];
  photo: any;
  isFeatured: boolean;
  referralLink?: string;
};

export type AddCardProps = {
  card: CreditCard | null;
  editing: boolean;
};
