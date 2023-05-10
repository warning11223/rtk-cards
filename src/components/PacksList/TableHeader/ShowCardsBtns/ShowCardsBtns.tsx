import Button from "@mui/material/Button/Button";
import React from "react";

import s from './ShowCardsBtns.module.scss'

export const ShowCardsBtns = () => {
  return (
    <div className={s.showCards}>
      <span>Show packs cards</span>
      <div className={s.showCards__btns}>
        <Button variant="contained" size="large" color={"warning"} sx={{width: '100px'}}>My</Button>
        <Button variant="outlined" size="large" color={"warning"} sx={{width: '100px'}}>All</Button>
      </div>
    </div>
  );
};
