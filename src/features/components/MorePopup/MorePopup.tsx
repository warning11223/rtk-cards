import React from "react";

import s from 'features/components/MorePopup/MorePopup.module.scss'
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import SchoolIcon from "@mui/icons-material/School";

export const MorePopup = () => {
  return (
    <div className={s.morePopup}>
      <div className={s.morePopup__wrapper}>
        <BorderColorIcon color={"warning"}/>
        <span>Edit</span>
      </div>
      <div className={s.morePopup__wrapper}>
        <DeleteIcon color={"warning"}/>
        <span>Delete</span>
      </div>
      <div className={s.morePopup__wrapper}>
        <SchoolIcon color={"warning"}/>
        <span>Learn</span>
      </div>
    </div>
  );
};

