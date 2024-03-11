import React, { ReactNode, createContext, useContext } from "react";

const PageSwitcherContext = createContext<PageSwitcherProps>({
  currentPageId: "",
  defaultPageId: "",
});
export const usePageSwitcherContext = () => useContext(PageSwitcherContext);

type PropsWithChildren<P> = P & { children?: ReactNode };

type PageSwitcherProps = {
  currentPageId: string;
  defaultPageId: string;
};

const PageSwitcher = ({
  currentPageId,
  defaultPageId,
  children,
}: PropsWithChildren<PageSwitcherProps>) => {
  return (
    <PageSwitcherContext.Provider value={{ currentPageId, defaultPageId }}>
      {children}
    </PageSwitcherContext.Provider>
  );
};

export { PageSwitcher };
