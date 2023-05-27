import React, { ChangeEvent, useState } from "react";
import s from "components/LearnPack/LearnPack.module.scss";
import Button from "@mui/material/Button/Button";
import { CardType } from "features/cards/cardsApi";

const answers = ["Did not know", "Forgot", "Confused", "A lot of thought", "Knew the answer"];

type Props = {
  onNext: (value: string) => void
  card: CardType
}

export const ShowAnswer: React.FC<Props> = ({ onNext, card }) => {
  const [value, setValue] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div className={s.learn__answer}>
      <div className={s.learn__answer__text}>
        <span style={{ fontWeight: "bold" }}>
          Answer:
        </span>
        {
          card.answerImg ?
            <img src={card.answerImg} alt="answerImg" style={{height: '150px', width: '150px'}} /> :
            <p>{card.answer}</p>
        }
      </div>
      <fieldset className={s.learn__answer__fieldset}>
        <legend className={s.learn__answer__legend}>Rate yourself</legend>
        {
          answers.map((name, index) => {
            return (
              <React.Fragment key={name}>
                <label className={s.learn__answer__label}>
                  <input
                    className={s.learn__answer__input}
                    type="radio"
                    name="language"
                    value={index + 1}
                    onChange={onChangeHandler}
                  />
                  {name}
                </label>
                <br />
              </React.Fragment>
            );
          })
        }
        <div className={s.learn__answer__wrapper}>
          <Button
            variant={"contained"}
            color={"warning"}
            sx={{ marginBottom: "26px", marginTop: "26px" }}
            onClick={() => onNext(value)}
          >Next</Button>
        </div>
      </fieldset>

    </div>
  );
};

