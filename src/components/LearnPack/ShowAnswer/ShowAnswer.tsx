import React, { ChangeEvent, useState } from "react";
import s from "components/LearnPack/LearnPack.module.scss";
import Button from "@mui/material/Button/Button";

export const ShowAnswer = () => {
  const [value, setValue] = useState('');
  console.log(value);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  return (
    <div className={s.learn__answer}>
      <p className={s.learn__answer__text}><span style={{ fontWeight: "bold" }}>Answer: </span>This is how "This"
        works in JavaScript</p>
      <fieldset className={s.learn__answer__fieldset}>
        <legend className={s.learn__answer__legend}>Rate yourself</legend>

        <label className={s.learn__answer__label}>
          <input
            className={s.learn__answer__input}
            type="radio"
            name="language"
            value="1"
            onChange={onChangeHandler}
          />
          Did not know
        </label>
        <br />
        <label className={s.learn__answer__label}>
          <input
            className={s.learn__answer__input}
            type="radio"
            name="language"
            value="2"
            onChange={onChangeHandler}
          />
          Forgot
        </label>
        <br />
        <label className={s.learn__answer__label}>
          <input
            className={s.learn__answer__input}
            type="radio"
            name="language"
            value="3"
            onChange={onChangeHandler}
          />
          A lot of thought
        </label>
        <br />
        <label className={s.learn__answer__label}>
          <input
            className={s.learn__answer__input}
            type="radio"
            name="language"
            value="4"
            onChange={onChangeHandler}
          />
          Сonfused
        </label>
        <br />
        <label className={s.learn__answer__label}>
          <input
            className={s.learn__answer__input}
            type="radio"
            name="language"
            value="5"
            onChange={onChangeHandler}
          />
          Knew the answer
        </label>
        <br />

        <div className={s.learn__answer__wrapper}>
          <Button
            variant={"contained"}
            color={"warning"}
            sx={{ marginBottom: "26px", marginTop: "26px" }}
          >Next</Button>
        </div>
      </fieldset>

    </div>
  );
};

