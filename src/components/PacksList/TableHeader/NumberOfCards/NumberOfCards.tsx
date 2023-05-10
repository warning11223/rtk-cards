import Box from "@mui/material/Box/Box";
import Slider from "@mui/material/Slider/Slider";
import Typography from "@mui/material/Typography/Typography";
import React, { SyntheticEvent } from "react";

import s from "./NumberOfCards.module.scss";

type Props = {
  cardsNumber: number[]
  setCardsNumber: (value: number[]) => void
}

export const NumberOfCards: React.FC<Props> = (props) => {
  const { setCardsNumber, cardsNumber } = props;

  const boxSx = {
    width: "63px",
    height: "36px",
    border: "1px solid rgba(000, 000, 000, 0.3)",
    borderRadius: "3px",
    padding: "3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  const typographySx = {
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "20px",
    textAlign: "center"
  };

  const onChangeHandler = (event: Event | SyntheticEvent<Element, Event>, value: number | number[]) => {
    if (Array.isArray(value)) {
      setCardsNumber(value);
    }
  };

  return (
    <div className={s.numberOfCards}>
      <span>Number of cards</span>
      <Box sx={{ width: 300, display: "flex", alignItems: "center" }}>
        <Box sx={boxSx}>
          <Typography sx={typographySx}>{cardsNumber[0]}</Typography>
        </Box>
        <Slider
          disableSwap
          sx={{ m: "0 20px" }}
          // @ts-ignore
          color={"warning"}
          value={cardsNumber}
          /*onMouseUp={onChangeHandler}*/
          onChangeCommitted={onChangeHandler}
        />
        <Box sx={boxSx}>
          <Typography sx={typographySx}>{cardsNumber[1]}</Typography>
        </Box>
      </Box>
    </div>
  );
};

