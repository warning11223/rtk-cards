import React from "react";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import Button from "@mui/material/Button/Button";

import s from './ResetFilterBtn.module.scss'

export const ResetFilterBtn = () => {
  return (
    <div className={s.resetFilter}>
      <Button color={"warning"} >
        <FilterAltOffIcon color={"warning"} fontSize={'large'} />
      </Button>
    </div>
  );
};
