import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RenderRows } from "components/PacksList/PacksTable/RenderRows/RenderRows";
import { useAppSelector } from "common/hooks";
import { selectPacks } from "features/packs/packsSelectors";
import IconButton from "@mui/material/IconButton/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState } from "react";

type Props = {
  sort: string
  setSort: (value: string) => void
}

export const PacksTable: React.FC<Props> = ({ sort, setSort }) => {
  const [clicked, setClicked] = useState(true);
  const cards = useAppSelector(selectPacks);

  const cardsEmpty = <div style={{
    height: "300px",
    textAlign: "center",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "20px",
    fontSize: "22px",
    fontWeight: "bold"
  }}>😮 Packs not found</div>;

  const onSortHandler = () => {
    setClicked(!clicked);
    setSort(clicked ? "1updated" : "0updated");
  };

  return (
    <>
      {
        !cards.length ? cardsEmpty :
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#EFEFEF" }}>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Cards</TableCell>
                  <TableCell align="right">
                    Last Updated
                    <IconButton onClick={onSortHandler}>
                      {
                        clicked ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                      }
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">Created by</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <RenderRows cards={cards} />
              </TableBody>
            </Table>
          </TableContainer>
      }
    </>
  );
};

