import React from "react";
import Button from "@mui/material/Button/Button";
import { CardModal } from "features/components/CardModal/CardModal";

type Props = {
  onClickCallback: (question: string, answer: string, answerCover: string, questionCover: string) => void
}

export const AddToCardBtn: React.FC<Props> = ({onClickCallback}) => {
  return (
    <CardModal callback={(question, answer, answerCover, questionCover) => onClickCallback(question, answer, answerCover, questionCover)} title={"Add"}>
      Add new card
    </CardModal>
  );
};

