import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Card } from "features/packs/packsApi";
import { TableActions } from "components/PacksList/PacksTable/TableActions";
import { useAppSelector } from "common/hooks";
import { selectAuthLoading, selectUserId } from "features/auth/authSelectors";
import { Link } from "react-router-dom";

import s from "./RenderRows.module.scss";
import listIcon from "../../../../assets/img/list-icon.png";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import { Loading } from "features/auth/authSlice";

type Props = {
  cards: Card []
}

export const RenderRows: React.FC<Props> = ({ cards }) => {
  const userId = useAppSelector(selectUserId);
  const loading = useAppSelector(selectAuthLoading);

  return (
    <>
      {
        cards.map(card => (
          <TableRow
            key={card._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row" width={150}>
              {
                loading === Loading.Loading ?
                <Skeleton animation="wave" /> :
                <Link to={`/cards/${card._id}`} className={s.rows__link}>
                  <img src={card.deckCover ? card.deckCover : listIcon} alt="listIcon"
                       style={{ width: "57px", height: "36px" }} />
                  {card.name}
                </Link>
              }
            </TableCell>
            <TableCell align="right" width={50}>
              {
                loading === Loading.Loading ?
                <Skeleton animation="wave" /> :
                card.cardsCount
              }
            </TableCell>
            <TableCell align="right" width={150}>
              {
                loading === Loading.Loading ?
                <Skeleton animation="wave" /> :
                card.updated.toString().substring(0, 10)
              }
            </TableCell>
            <TableCell align="right" width={150}>
              {
                loading === Loading.Loading ?
                <Skeleton animation="wave" /> :
                card.user_name
              }
            </TableCell>
            <TableCell align="right" height={45} width={150}>
              {
                loading === Loading.Loading ?
                <Skeleton animation="wave" /> :
                <TableActions
                  myCard={userId === card.user_id}
                  id={card._id}
                />
              }
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};

