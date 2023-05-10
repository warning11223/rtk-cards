import React, { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import s from "./TableSearch.module.scss";
import { useDebounce } from "common/hooks";

type Props = {
  search: string
  setSearch: (value: string) => void
}

export const TableSearch: React.FC<Props> = ({ search, setSearch }) => {
  const [value, setValue] = useState(search);
  const debouncedValue = useDebounce(value, 800);

  useEffect(() => {
    if (search === "") setValue("");
  }, [search])

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div className={s.tableSearch}>
      <span>Search</span>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={value}
          onChange={changeHandler}
        />
      </Search>
    </div>
  );
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid orange",
  width: "413px",
  transition: "all .2s linear",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.07)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  textAlign: "left"

}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "orange"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));
