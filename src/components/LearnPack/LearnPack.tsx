import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import arrowLeft from "assets/img/arrow-left.svg";

import s from "./LearnPack.module.scss";
import { useAppSelector } from "common/hooks";
import { selectPacks } from "features/packs/packsSelectors";
import Button from "@mui/material/Button/Button";
import { ShowAnswer } from "components/LearnPack/ShowAnswer/ShowAnswer";

export const LearnPack = () => {
  const { id } = useParams();
  const [showAnswer, setShowAnswer] = useState(false);
  const packs = useAppSelector(selectPacks);
  const currentPack = packs.filter(item => item._id === id);
  console.log(currentPack);

  return (
    <div className={s.learn}>
      <Link className={s.learn__link} to={"/packs-list"}>
        <img src={arrowLeft} alt="arrow" />
        Back to Packs List
      </Link>
      <h3 className={s.learn__title}>Learn "{currentPack[0].name}" pack</h3>

      <div className={s.learn__container}>
        <p className={s.learn__text}><span style={{ fontWeight: "bold" }}>Question: </span>How "This" works in
          JavaScript?</p>
        <p className={s.learn__number}>Number of answers per question: <span
          style={{ fontWeight: "bold", fontSize: "16px" }}>000</span></p>
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
          showAnswer && <ShowAnswer />
        }
      </div>

    </div>
  );
};

