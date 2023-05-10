import Button from "@mui/material/Button/Button";
import Typography from "@mui/material/Typography/Typography";
import React from "react";

import s from 'components/PacksList/PacksListHeader/PackListHeader.module.scss'
import { Loading } from "features/auth/authSlice";
import { Loader } from "components/Loader/Loader";
import { useAppSelector } from "common/hooks";
import { selectAuthLoading } from "features/auth/authSelectors";

export const PacksListHeader = () => {
  const loading = useAppSelector(selectAuthLoading);

  return (
    <div className={s.header}>
      {
        loading === Loading.Loading ? <div style={{height: '42px'}}><Loader /></div> : <Typography variant="h4">Packs list</Typography>
      }
      <Button variant="contained" color={"warning"} sx={{borderRadius: '2rem'}}>Add new pack</Button>
    </div>
  );
};

