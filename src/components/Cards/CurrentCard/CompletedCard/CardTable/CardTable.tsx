import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "common/hooks";
import { selectCards } from "features/cards/cardsSelectors";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton/IconButton";
import { CardTableRow } from "components/Cards/CurrentCard/CompletedCard/CardTable/CardTableRow";
import { Loading } from "../../../../../features/auth/authSlice";

type Props = {
  setSort: (value: string) => void
  cardsLength: number
  loading: string
}

export const CardTable: React.FC<Props> = ({ setSort, cardsLength, loading }) => {
  const cards = useAppSelector(selectCards);
  const [clicked, setClicked] = useState(false);

  const onSortHandler = () => {
    setClicked(!clicked);
    setSort(clicked ? "0grade" : "1grade");
  };

  return (
    <>
      {
        !cardsLength && loading !== Loading.Loading ?
          <div style={{ fontSize: "40px", fontWeight: "bold", height: '200px', paddingTop: '150px' }}>No cards ☹️</div> :
          <TableContainer component={Paper} sx={{ marginTop: "24px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#EFEFEF" }}>
                  <TableCell>Question</TableCell>
                  <TableCell align="center">Answer</TableCell>
                  <TableCell align="right">
                    Last Updated
                    <IconButton onClick={onSortHandler}>
                      {
                        clicked ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                      }
                    </IconButton>
                  </TableCell>
                  <TableCell align="right" sx={{ paddingRight: "70px" }}>Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cards.map(card => <CardTableRow key={card._id} card={card} />)}
              </TableBody>
            </Table>
          </TableContainer>
      }
    </>
  );
};
