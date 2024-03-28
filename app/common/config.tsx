// to be used with server components (no map key validation)
export const config = new Map([
  [
    "labels",
    new Map([
      ["loadingDefault", "We are on our way"],
      [
        "loadingWIP",
        "Looks like this page took a flight delay! Please standby.",
      ],
    ]),
  ],
]);

// to be used with client components (map key validation)
export const useResources = (key: string = "") => {
  const mapItem = config.get(key);

  if (!mapItem) {
    throw new Error(`config has no member at ${key}`);
  }

  return mapItem;
};
