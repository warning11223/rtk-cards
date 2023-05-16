import React from "react";
import TableCell from "@mui/material/TableCell";
import StarRating from "components/Cards/CurrentCard/CompletedCard/CardTable/StarRating/StarRating";
import TableRow from "@mui/material/TableRow";
import { CardType } from "features/cards/cardsApi";
import { PackModal } from "features/components/PackModal/PackModal";
import IconButton from "@mui/material/IconButton/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { DeleteModal } from "features/components/DeleteModal/DeleteModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { selectUserId } from "features/auth/authSelectors";
import { cardsThunks } from "features/cards/cardsSlice";
import { toast } from "react-toastify";
import { CardModal } from "features/components/CardModal/CardModal";

type Props = {
  card: CardType
}

export const CardTableRow: React.FC<Props> = ({ card }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const myCard = card.user_id === userId;

  const deleteCardHandler = () => {
    dispatch(cardsThunks.deleteCard(card._id))
      .unwrap()
      .then(res => {
        dispatch(cardsThunks.getCards({
          cardsPack_id: card.cardsPack_id
        }));
        toast.success("Card deleted");
      })
      .catch(err => {
        toast.error(err.e.response.data.error);
      });
  };

  const editCard = (question: string, answer: string) => {
    dispatch(cardsThunks.updateCard({
      card: {
        _id: card._id,
        question,
        answer
      }
    }))
      .unwrap()
      .then(res => {
        dispatch(cardsThunks.getCards({
          cardsPack_id: card.cardsPack_id
        }));
        toast.success("Card edited");
      })
      .catch(err => {
        toast.error(err.e.response.data.error);
      });
  };

  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {card.question}
      </TableCell>
      <TableCell align="right">{card.answer}</TableCell>
      <TableCell align="right">{card.updated.toString().substring(0, 10)}</TableCell>
      <TableCell align="right" sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div>
          {
            myCard &&
            <CardModal callback={editCard} title={"Edit"} answerValue={card.answer} questionValue={card.question}>
              <IconButton size={"small"}>
                <BorderColorIcon />
              </IconButton>
            </CardModal>
          }
          {
            myCard &&
            <DeleteModal callback={deleteCardHandler} name={card.question}>
              <IconButton size={"small"}>
                <DeleteIcon />
              </IconButton>
            </DeleteModal>
          }
        </div>
        <StarRating grade={card.grade} id={card._id} />
      </TableCell>
    </TableRow>
  );
};
