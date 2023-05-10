import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useAppSelector } from "common/hooks";
import { selectCards } from "features/packs/packsSelectors";

export const RenderRows = () => {
  const cards = useAppSelector(selectCards);

  const cardsEmpty = <div style={{
    height: '300px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '20px',
    fontSize: '22px',
    fontWeight: 'bold'
  }}>😮 Packs not found</div>

  return (
    <>
      {!cards.length ? cardsEmpty :
        cards.map((card) => (
        <TableRow
          key={card._id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {card.name}
          </TableCell>
          <TableCell align="right">{card.cardsCount}</TableCell>
          <TableCell align="right">{card.updated.toString().substring(0, 10)}</TableCell>
          <TableCell align="right">{card.user_name}</TableCell>
          <TableCell align="right">{card.path}</TableCell>
        </TableRow>
      ))}
    </>
  );
};

