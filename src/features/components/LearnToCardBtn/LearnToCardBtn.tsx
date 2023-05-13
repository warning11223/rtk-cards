import React from "react";
import Button from "@mui/material/Button/Button";

type Props = {
  onClickCallback: () => void
}

export const LearnToCardBtn: React.FC<Props> = ({onClickCallback}) => {
  return (
    <Button
      variant="contained"
      color={"warning"}
      sx={{ borderRadius: "2rem", height: "40px" }}
      onClick={onClickCallback}
    >Learn to pack</Button>
  );
};

