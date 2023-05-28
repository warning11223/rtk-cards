import * as React from "react";
import { ChangeEvent } from "react";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Box from "@mui/material/Box/Box";

import s from "./TablePagination.module.scss";

type Props = {
  numberOfDisplayed: number
  setNumberOfDisplayed: (value: number) => void
  page: number
  setPage: (value: number) => void
  totalCount: number
}

export const TablePagination: React.FC<Props> = (props) => {
  const { numberOfDisplayed, setNumberOfDisplayed, setPage, page, totalCount } = props;

  const paginationCount = Math.floor(totalCount / numberOfDisplayed);

  const handleChange = (event: SelectChangeEvent) => {
    setNumberOfDisplayed(+event.target.value);
  };

  const styleForFormControl = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px"
  };

  const changePageHandler = (e: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };


  return (
    <Box className={s.tablePagination}>
      <Pagination
        count={paginationCount}
        variant="outlined"
        shape="rounded"
        // @ts-ignore
        color={"warning"}
        page={page}
        onChange={changePageHandler}
      />

      <FormControl sx={styleForFormControl}>
        <Box component={"span"}>Show</Box>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={String(numberOfDisplayed)}
          label="amount"
          onChange={handleChange}
          size={"small"}
          color={"warning"}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
        <Box component={"span"}>Cards per Page</Box>
      </FormControl>

    </Box>
  );
};
