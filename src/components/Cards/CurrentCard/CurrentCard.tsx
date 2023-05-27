import React, { useState } from "react";
import { Card } from "features/packs/packsApi";

import s from "./CurrentCard.module.scss";
import { CompletedCard } from "components/Cards/CurrentCard/CompletedCard/CompletedCard";
import { useAppSelector } from "common/hooks";
import { selectAuthLoading } from "features/auth/authSelectors";
import { Loading } from "features/auth/authSlice";
import { Loader } from "components/Loader/Loader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton/IconButton";
import { MorePopup } from "features/components/MorePopup/MorePopup";
import listIcon from "assets/img/list-icon.png";

type Props = {
  card: Card[]
  myCard?: boolean
  packId: string | undefined
}

export const CurrentCard: React.FC<Props> = ({ card, myCard, packId }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const loading = useAppSelector(selectAuthLoading);
  console.log(visiblePopup);
  return (
    <div>
      {
        loading === Loading.Loading
          ? <h3 className={s.currentCard__loader}><Loader /></h3>
          : <div className={s.currentCard__wrapper}>
            <div className={s.currentCard__container}>
              <h3 className={s.currentCard__title}>
                Name Pack: <span style={{ color: "#ff7d0b", marginRight: '10px' }}>{card[0].name}</span>
              </h3>
              <img
                src={card[0].deckCover ? card[0].deckCover : listIcon}
                alt="listIcon"
                className={s.currentCard__image}
              />
            </div>
            {
              myCard &&
              <>
                <div className={s.currentCard__icon} onClick={() => setVisiblePopup(!visiblePopup)}>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </div>
                {
                  visiblePopup &&
                  <MorePopup
                    packId={packId}
                    setVisiblePopup={setVisiblePopup}
                    name={card[0].name}
                    deckCover={card[0].deckCover}
                  />
                }
              </>
            }
          </div>
      }
      <CompletedCard id={card[0]._id} myCard={myCard} packId={packId} />
    </div>
  );
};

