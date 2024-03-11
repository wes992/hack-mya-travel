import React from "react";
import { usePageSwitcherContext } from "./PageSwitcher";

type Page = {
  id: string;
  content: any;
};

type PageContentProps = {
  pages: Page[];
};

const PageContent = ({ pages }: PageContentProps) => {
  const { currentPageId, defaultPageId } = usePageSwitcherContext();

  const currentPage = pages.find(
    (page) => page.id === (currentPageId || defaultPageId)
  );
  return currentPage ? <>{currentPage.content}</> : null;
};

export { PageContent };
