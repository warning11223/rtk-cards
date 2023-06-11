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
import { Loading } from "features/auth/authSlice";
import { SkeletonLoader } from "../../../../features/components/SkeletonLoader";

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
                  <SkeletonLoader /> :
                  <Link to={`/cards/${card._id}`} className={s.rows__link}>
                    <img src={card.deckCover ? card.deckCover : listIcon} alt="listIcon"
                         style={{ width: "57px", height: "36px" }} />
                    <p className={s.rows__text}>{card.name}</p>
                  </Link>
              }
            </TableCell>
            <TableCell align="right" width={150}>
              {
                loading === Loading.Loading ?
                  <SkeletonLoader /> :
                  card.cardsCount
              }
            </TableCell>
            <TableCell align="right" width={150}>
              {
                loading === Loading.Loading ?
                  <SkeletonLoader /> :
                  card.updated.toString().substring(0, 10)
              }
            </TableCell>
            <TableCell align="right" width={150}>
              {
                loading === Loading.Loading ?
                  <SkeletonLoader /> :
                  card.user_name
              }
            </TableCell>
            <TableCell align="right" height={45} width={150}>
              {
                loading === Loading.Loading ?
                  <SkeletonLoader /> :
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

