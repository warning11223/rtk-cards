import * as React from "react";
import { ChangeEvent } from "react";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Box from "@mui/material/Box/Box";
import { useAppSelector } from "common/hooks/useAppSelector";

import s from "./TablePagination.module.scss";
import { selectCardPacksTotalCount } from "features/packs/packsSelectors";

type Props = {
  numberOfDisplayed: number
  setNumberOfDisplayed: (value: number) => void
  page: number
  setPage: (value: number) => void
}

export const TablePagination: React.FC<Props> = (props) => {
  const { numberOfDisplayed, setNumberOfDisplayed, setPage, page } = props;

  const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount);
  const paginationCount = Math.floor(cardPacksTotalCount / numberOfDisplayed);

  const handleChange = (event: SelectChangeEvent) => {
    setNumberOfDisplayed(+event.target.value);
  };

  const styleForFormControl = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px"
  };

  const changePageHandler = (e: ChangeEvent<unknown>) => {
    // @ts-ignore
    setPage(+e.currentTarget.innerText);
  };

  return (
    <Box className={s.tablePagination}>
      <Pagination
        count={paginationCount}
        variant="outlined"
        shape="rounded"
        color={"standard"}
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
