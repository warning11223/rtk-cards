import React from "react";
import Button from "@mui/material/Button/Button";
import { CardModal } from "features/components/CardModal/CardModal";

type Props = {
  onClickCallback: (question: string, answer: string) => void
}

export const AddToCardBtn: React.FC<Props> = ({onClickCallback}) => {
  return (
    <CardModal callback={(question, answer) => onClickCallback(question, answer)} title={"Add"}>
      Add new card
    </CardModal>
  );
};

