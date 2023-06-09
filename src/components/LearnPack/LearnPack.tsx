import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import arrowLeft from "assets/img/arrow-left.svg";

import s from "./LearnPack.module.scss";
import { useActions, useAppSelector } from "common/hooks";
import { selectPacks } from "features/packs/packsSelectors";
import Button from "@mui/material/Button/Button";
import { ShowAnswer } from "components/LearnPack/ShowAnswer";
import { CardType } from "features/cards/cardsApi";
import { cardsThunks } from "features/cards/cardsSlice";
import { selectCards } from "features/cards/cardsSelectors";
import { toast } from "react-toastify";
import { selectAuthLoading } from "features/auth/authSelectors";
import { Loader } from "components/Loader";
import { Loading } from "features/auth/authSlice";
import { getCard } from "common/utils/getCard";

export const LearnPack = () => {
  const { id } = useParams();
  const [first, setFirst] = useState<boolean>(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const { getCards, gradeCard } = useActions(cardsThunks);
  const packs = useAppSelector(selectPacks);
  const cards = useAppSelector(selectCards);
  const loading = useAppSelector(selectAuthLoading);
  
  const currentPack = packs.filter(item => item._id === id);


  const [card, setCard] = useState<CardType>({
    _id: "fake",
    cardsPack_id: "",
    answer: "answer fake",
    question: "question fake",
    grade: 0,
    shots: 0,
    user_id: "",
    created: "",
    updated: "",
    rating: 0,
    type: "",
    questionImg: "",
    more_id: "",
    __v: 0,
    comments: "",
    answerImg: ""
  });

  useEffect(() => {
    if (first) {
      getCards({
        cardsPack_id: id!,
        pageCount: currentPack[0].cardsCount
      });
      setFirst(false);
    }

    if (cards.length > 0) setCard(getCard(cards));
  }, [id, cards, first]);

  const onNext = (grade: string) => {
    setShowAnswer(false);

    if (cards.length > 0) {
      gradeCard({
        grade: +grade,
        card_id: card._id
      })
        .unwrap()
        .then(res => {
          setCard(card => ({ ...card, shots: res.res.updatedGrade.shots }));
          toast.success("Answer taken into account");
        })
        .catch(err => {
          toast.error(err.e.response.data.error);
        });

      setCard(getCard(cards));
    } else {

    }
  };

  if (loading === Loading.Loading) {
    return <Loader />;
  }

  return (
    <div className={s.learn}>
      <Link className={s.learn__link} to={"/packs-list"}>
        <img src={arrowLeft} alt="arrow" />
        Back to Packs List
      </Link>
      <h3 className={s.learn__title}>Learn "{currentPack[0].name}" pack</h3>

      <div className={s.learn__wrapper}>
        <div className={s.learn__container}>
          <div className={s.learn__text}>
            <span style={{ fontWeight: "bold" }}>Question: </span>
            {
              card.questionImg ?
                <img src={card.questionImg} alt="questionImg" style={{ maxHeight: "300px", maxWidth: "300px" }} /> :
                <p>{card.question}</p>
            }
          </div>
          <p className={s.learn__number}>
            <span>Number of answers per question:</span>
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>{card.shots}</span>
          </p>
          {
            !showAnswer &&
            <Button
              variant={"contained"}
              color={"warning"}
              sx={{ marginBottom: "40px" }}
              onClick={() => setShowAnswer(true)}
            >Show answer</Button>
          }

          {
            showAnswer && <ShowAnswer onNext={onNext} card={card} />
          }
        </div>
      </div>

    </div>
  );
};

