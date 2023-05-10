import Button from "@mui/material/Button/Button";
import React from "react";

import s from "./ShowCardsBtns.module.scss";
import { useAppSelector } from "common/hooks";
import { selectUserId } from "features/auth/authSelectors";

type Props = {
  showPacks: string
  setShowPacks: (value: string) => void
}

export const ShowCardsBtns: React.FC<Props> = ({ showPacks, setShowPacks }) => {
  const userId = useAppSelector(selectUserId);

  const myBtnHandler = () => {
    if (userId) {
      setShowPacks(userId);
    }
  };

  const allBtnHandler = () => {
    setShowPacks("");
  };

  return (
    <div className={s.showCards}>
      <span>Show packs cards</span>
      <div className={s.showCards__btns}>
        <Button
          variant={`${showPacks ? "contained" : "outlined"}`}
          size="large"
          color={"warning"}
          sx={{ width: "100px" }}
          onClick={myBtnHandler}
        >My</Button>
        <Button
          variant={`${!showPacks ? "contained" : "outlined"}`}
          size="large"
          color={"warning"}
          sx={{ width: "100px" }}
          onClick={allBtnHandler}
        >All</Button>
      </div>
    </div>
  );
};
