import React from "react";

import s from "./EmptyCard.module.scss";
import { useAppDispatch } from "common/hooks";
import { cardsThunks } from "features/cards/cardsSlice";
import { toast } from "react-toastify";
import { AddToCardBtn } from "features/components/AddToCardBtn/AddToCardBtn";

type Props = {
  id: string
}

const EmptyCard: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();

  const addCardHandler = (question: string, answer: string) => {
    const card = {
      grade: 0,
      shots: 0,
      question,
      answer,
      cardsPack_id: id
    };

    dispatch(cardsThunks.createCard({ card }))
      .unwrap()
      .then(res => {
        toast.success("New card added");
        window.location.reload();
      })
      .catch(err => {
        toast.error(err.e.response.data.error);
      });
  };

  return (
    <div className={s.emptyCard__container}>
      <p className={s.emptyCard__text}>This pack is empty. Click add new card to fill this pack</p>
      <AddToCardBtn onClickCallback={addCardHandler} />
    </div>
  );
};

export default EmptyCard;
