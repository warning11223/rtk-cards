import React, { useEffect, useState } from "react";

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

type Props = {
  id: string
  myCard?: boolean
  packId: string | undefined
}

export const CompletedCard: React.FC<Props> = ({ id, myCard, packId }) => {
  const { getCards, createCard } = useActions(cardsThunks);
  const navigate = useNavigate();
  const cardsTotalCount = useAppSelector(selectCardsTotalCount);
  const [sort, setSort] = useState("0grade");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(4);
  const cards = useAppSelector(selectCards);

  useEffect(() => {
    getCards({
      cardsPack_id: id,
      sortCards: sort,
      cardQuestion: search,
      page,
      pageCount
    })
      .unwrap()
      .catch(err => {
        toast.error(err.e.response.data.error);
      });
  }, [sort, search, page, pageCount]);

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

  if (!cards.length && !myCard) {
    return <div style={{ fontSize: "40px", fontWeight: "bold" }}>No cards ☹️</div>;
  }

  return (
    <>
      {
        !cards.length
          ? <EmptyCard addCardHandler={addCardHandler} />
          : <div className={s.completed}>
            <div className={s.completed__header}>
              <div className={s.completed__search}>
                <TableSearch search={search} setSearch={setSearch} />
                {
                  myCard
                    ? <AddToCardBtn onClickCallback={addCardHandler} />
                    : <LearnToCardBtn onClickCallback={learnHandler} />
                }
              </div>
              <CardTable setSort={setSort} />
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

