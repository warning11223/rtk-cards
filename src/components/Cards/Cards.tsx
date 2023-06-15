import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import s from "./Cards.module.scss";
import arrowLeft from "assets/img/arrow-left.svg";
import { useActions, useAppSelector } from "common/hooks";
import { selectCurrentPack, selectPacks } from "features/packs/packsSelectors";
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

  const [sort, setSort] = useState("0grade");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(4);

  const currentPack = useAppSelector((state: RootState) => {
    return selectCurrentPack(state, id);
  });

  useEffect(() => {

    getCards({
      cardsPack_id: currentPack[0]?._id,
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
          card={currentPack}
          myCard={currentPack[0]?.user_id === userId}
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
