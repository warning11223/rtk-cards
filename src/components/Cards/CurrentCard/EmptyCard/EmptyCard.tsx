import React from "react";
import Button from "@mui/material/Button/Button";

import s from './EmptyCard.module.scss'

type Props = {

}

const EmptyCard: React.FC<Props> = () => {
  return (
    <div className={s.emptyCard__container}>
      <p className={s.emptyCard__text}>This pack is empty. Click add new card to fill this pack</p>
      <Button
        variant="contained"
        color={"warning"}
        sx={{ borderRadius: "2rem" }}
        onClick={() => {}}
      >Add new card</Button>
    </div>
  );
};

export default EmptyCard;
