import React, { useState } from "react";
import { Card } from "features/packs/packsApi";

import s from "./CurrentCard.module.scss";
import EmptyCard from "components/Cards/CurrentCard/EmptyCard/EmptyCard";
import { CompletedCard } from "components/Cards/CurrentCard/CompletedCard/CompletedCard";
import { useAppSelector } from "common/hooks";
import { selectAuthLoading } from "features/auth/authSelectors";
import { Loading } from "features/auth/authSlice";
import { Loader } from "components/Loader/Loader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton/IconButton";
import { MorePopup } from "features/components/MorePopup/MorePopup";
import { selectPacks } from "features/packs/packsSelectors";

type Props = {
  card: Card[]
  myCard?: boolean
  packId: string | undefined
}

export const CurrentCard: React.FC<Props> = ({ card, myCard, packId }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const loading = useAppSelector(selectAuthLoading);

  return (
    <div>
      {
        loading === Loading.Loading
          ? <h3 className={s.currentCard__loader}><Loader /></h3>
          : <div className={s.currentCard__wrapper}>
            <h3 className={s.currentCard__title}>
              Name Pack: <span style={{ color: "#ff7d0b" }}>{card[0].name}</span>
            </h3>
            {
              myCard &&
              <>
                <div className={s.currentCard__icon} onClick={() => setVisiblePopup(!visiblePopup)}>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </div>
                {
                  visiblePopup && <MorePopup packId={packId} setVisiblePopup={setVisiblePopup} />
                }
              </>
            }
          </div>
      }
      <CompletedCard id={card[0]._id} myCard={myCard} />
    </div>
  );
};

