import React from "react";

import s from "./CompletedCard.module.scss";
import { TableSearch } from "components/PacksList/TableHeader/TableSearch";
import { CardTable } from "components/Cards/CurrentCard/CompletedCard/CardTable";
import { TablePagination } from "components/PacksList/TablePagination";
import { useActions, useAppSelector } from "common/hooks";
import { cardsThunks } from "features/cards/cardsSlice";
import { toast } from "react-toastify";
import { selectCards, selectCardsTotalCount } from "features/cards/cardsSelectors";
import { LearnToCardBtn } from "features/components/LearnToCardBtn";
import { AddToCardBtn } from "features/components/AddToCardBtn";
import { useNavigate } from "react-router-dom";
import { CreateRequest } from "features/cards/cardsApi";
import { EmptyCard } from "components/Cards/CurrentCard/EmptyCard";
import { Loading } from "../../../../features/auth/authSlice";

type Props = {
  id: string
  myCard?: boolean
  packId: string | undefined
  loading: string
  search: string
  setSearch: (value: string) => void
  setSort: (value: string) => void
  pageCount: number
  setPageCount: (value: number) => void
  page: number
  setPage: (value: number) => void
}

export const CompletedCard: React.FC<Props> = ({
                                                 id,
                                                 myCard,
                                                 packId,
                                                 loading,
                                                 setSort,
                                                 setSearch,
                                                 search,
                                                 pageCount,
                                                 setPageCount,
                                                 setPage,
                                                 page
                                               }) => {
  const { getCards, createCard } = useActions(cardsThunks);
  const navigate = useNavigate();
  const cardsTotalCount = useAppSelector(selectCardsTotalCount);
  const cards = useAppSelector(selectCards);

  const addCardHandler = (question: string, answer: string, answerImg: string, questionImg: string) => {
    const card: CreateRequest = {
      card: {
        grade: 0,
        shots: 0,
        question,
        answer,
        cardsPack_id: id,
        questionImg,
        answerImg
      }
    };

    createCard({ card: card.card })
      .unwrap()
      .then(res => {
        toast.success("New card added");
        getCards({ cardsPack_id: id });
      })
      .catch(err => {
        toast.error(err.e.response.data.error);
      });
  };

  const learnHandler = () => {
    navigate(`/learn/${packId}`);
  };
  
  
  return (
    <>
      {
        !cards.length && search.length === 0 && myCard && loading !== Loading.Loading
          ? <EmptyCard addCardHandler={addCardHandler} />
          : <div className={s.completed}>
            <div className={s.completed__header}>
              <div className={s.completed__search}>
                <TableSearch search={search} setSearch={setSearch} />
                {myCard && loading !== Loading.Loading && <AddToCardBtn onClickCallback={addCardHandler} />}
                {!!cards.length && loading !== Loading.Loading && !myCard &&
                  <LearnToCardBtn onClickCallback={learnHandler} />}
              </div>
              <CardTable setSort={setSort} cardsLength={cards.length} loading={loading} />
              <TablePagination
                numberOfDisplayed={pageCount}
                setNumberOfDisplayed={setPageCount}
                page={page}
                setPage={setPage}
                totalCount={cardsTotalCount}
              />
            </div>
          </div>
      }
    </>
  );
};

