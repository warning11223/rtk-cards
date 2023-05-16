import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import s from "./Cards.module.scss";
import arrowLeft from "assets/img/arrow-left.svg";
import { useAppSelector } from "common/hooks";
import { selectPacks } from "features/packs/packsSelectors";
import { Card } from "features/packs/packsApi";
import { CurrentCard } from "components/Cards/CurrentCard/CurrentCard";
import { LinearProgress } from "@mui/material";
import { selectUserId } from "features/auth/authSelectors";

export const Cards = () => {
  const cardsPack = useAppSelector(selectPacks);
  const userId = useAppSelector(selectUserId);
  const [card, setCard] = useState<Card[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const card = cardsPack.filter(item => item._id === id);
    setCard(card);

  }, []);

  return (
    <div className={s.cards}>
      <Link className={s.cards__link} to={"/packs-list"}>
        <img src={arrowLeft} alt="arrow" />
        Back to Packs List
      </Link>
      {
        card.length ?
          <CurrentCard
            card={card}
            myCard={card[0].user_id === userId}
            packId={id}
          /> : <LinearProgress color={"warning"} />
      }
    </div>
  );
};
