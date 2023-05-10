import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Card } from "features/packs/packsApi";
import { TableActions } from "components/PacksList/PacksTable/TableActions/TableActions";
import { useAppSelector } from "common/hooks";
import { selectUserId } from "features/auth/authSelectors";

type Props = {
  cards: Card []
}

export const RenderRows: React.FC<Props> = ({cards}) => {
  const userId = useAppSelector(selectUserId);

  return (
    <>
      {
        cards.map(card => (
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
            <TableCell align="right">
              <TableActions
                myCard={userId === card.user_id}
                id={card._id}
              />
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};

