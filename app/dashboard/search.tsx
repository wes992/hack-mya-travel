"use client";

import { InputAdornment, TextField, debounce } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = ({ placeholder = "Search for something" }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = debounce((e) => {
    const params = new URLSearchParams(searchParams);
    // params.set("page", 1);
    if (e.target.value.length > 2) {
      params.set("q", e.target.value);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params}`);
  }, 400);

  return (
    <TextField
      size="small"
      id="outlined-start-adornment"
      sx={{ m: 1, width: "25ch" }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={handleSearch}
      placeholder={placeholder}
    />
  );
};

export { Search };
