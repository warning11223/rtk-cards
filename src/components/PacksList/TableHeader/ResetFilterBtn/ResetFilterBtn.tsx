import React from "react";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import Button from "@mui/material/Button/Button";

import s from './ResetFilterBtn.module.scss'

type Props = {
  resetHandler: () => void
}

export const ResetFilterBtn: React.FC<Props> = ({resetHandler}) => {
  return (
    <div className={s.resetFilter}>
      <Button color={"warning"} onClick={() => resetHandler()}>
        <FilterAltOffIcon color={"warning"} fontSize={'large'} />
      </Button>
    </div>
  );
};
