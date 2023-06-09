import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { CardType } from "features/cards/cardsApi";
import IconButton from "@mui/material/IconButton/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { DeleteModal } from "features/components/DeleteModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { useActions, useAppSelector } from "common/hooks";
import { selectAuthLoading, selectUserId } from "features/auth/authSelectors";
import { cardsThunks } from "features/cards/cardsSlice";
import { toast } from "react-toastify";
import { CardModal } from "features/components/CardModal";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import { Loading } from "features/auth/authSlice";
import { StarRating } from "components/Cards/CurrentCard/CompletedCard/CardTable/StarRating";

type Props = {
  card: CardType
}

const gradeStyles = { display: "flex", justifyContent: "flex-end", alignItems: "center" };

export const CardTableRow: React.FC<Props> = ({ card }) => {
  const { getCards, deleteCard, updateCard } = useActions(cardsThunks);
  const userId = useAppSelector(selectUserId);
  const myCard = card.user_id === userId;
  const loading = useAppSelector(selectAuthLoading);

  const deleteCardHandler = () => {
    deleteCard(card._id)
      .unwrap()
      .then(res => {
        getCards({
          cardsPack_id: card.cardsPack_id
        });
        toast.success("Card deleted");
      })
      .catch(err => {
        toast.error(err.e.response.data.error);
      });
  };

  const editCard = (question: string, answer: string, answerImg: string, questionImg: string) => {
    updateCard({
      card: {
        _id: card._id,
        question,
        answer,
        questionImg,
        answerImg
      }
    })
      .unwrap()
      .then(res => {
        getCards({
          cardsPack_id: card.cardsPack_id
        });
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
      <TableCell component="th" scope="row" width={50} height={45}>
        {
          loading === Loading.Loading ?
            <Skeleton animation="wave" /> :
            card.questionImg ? <img src={card.questionImg} alt="questionImg" style={{ height: "36px" }} /> :
              <p>{card.question}</p>
        }
      </TableCell>
      <TableCell align="center" width={150}>
        {
          loading === Loading.Loading ?
            <Skeleton animation="wave" /> :
            card.answerImg ? <img src={card.answerImg} alt="answerImg" style={{ height: "36px" }} /> :
              <p>{card.answer}</p>
        }
      </TableCell>
      <TableCell align="right" width={150}>
        {
          loading === Loading.Loading ?
            <Skeleton animation="wave" /> :
            card.updated.toString().substring(0, 10)
        }
      </TableCell>
      <TableCell align={"right"} width={150}>
        {
          loading === Loading.Loading ?
            <Skeleton animation="wave" /> :
            <div style={myCard ? gradeStyles : {}}>
              <StarRating grade={card.grade} id={card._id} />
              {
                myCard &&
                <CardModal
                  callback={editCard}
                  title={"Edit"}
                  answerValue={card.answer}
                  questionValue={card.question}
                  answerImg={card.answerImg}
                  questionImg={card.questionImg}
                >
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
        }
      </TableCell>
    </TableRow>
  );
};
