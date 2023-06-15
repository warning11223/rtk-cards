import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import s from "./Cards.module.scss";
import arrowLeft from "assets/img/arrow-left.svg";
import { useActions, useAppSelector } from "common/hooks";
import { selectCurrentCard, selectPacks } from "features/packs/packsSelectors";
import { Card } from "features/packs/packsApi";
import { CurrentCard } from "components/Cards/CurrentCard";
import { selectUserId } from "features/auth/authSelectors";
import { toast } from "react-toastify";
import { cardsThunks } from "../../features/cards/cardsSlice";
import { RootState } from "../../app/store";

export const Cards = () => {
  const { getCards } = useActions(cardsThunks);
  const cardsPack = useAppSelector(selectPacks);
  const userId = useAppSelector(selectUserId);
  const { id } = useParams();
  const [card, setCard] = useState<Card[]>([]);

  const [sort, setSort] = useState("0grade");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(4);

  /*const currentCard = useAppSelector((state: RootState) => {
    return selectCurrentCard(state, id)
  })*/

  useEffect(() => {
    const card = cardsPack.filter(item => item._id === id);
    setCard(card);

    getCards({
      cardsPack_id: card[0]?._id,
      sortCards: sort,
      cardQuestion: search,
      page,
      pageCount
    })
      .unwrap()
      .catch(err => {
        toast.error(err.e.response.data.error);
      });
  }, [sort, search, page, pageCount, cardsPack]);

  return (
    <div className={s.cards__wrapper}>
      <div className={s.cards}>
        <Link className={s.cards__link} to={"/packs-list"}>
          <img src={arrowLeft} alt="arrow" />
          Back to Packs List
        </Link>

        <CurrentCard
          card={card}
          myCard={card[0]?.user_id === userId}
          packId={id}
          setPage={setPage}
          setSort={setSort}
          page={page}
          search={search}
          setSearch={setSearch}
          pageCount={pageCount}
          setPageCount={setPageCount}
        />

      </div>
    </div>
  );
};
