import Button from "@mui/material/Button/Button";
import Typography from "@mui/material/Typography/Typography";
import React from "react";

import s from "components/PacksList/PacksListHeader/PackListHeader.module.scss";
import { Loading } from "features/auth/authSlice";
import { Loader } from "components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { selectAuthLoading } from "features/auth/authSelectors";
import { packsThunks } from "features/packs/packsSlice";
import { toast } from "react-toastify";
import { PackModal } from "features/components/PackModal/PackModal";

export const PacksListHeader = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);

  const addCardHandler = (text: string, checked: boolean) => {
    dispatch(packsThunks.createPack({
      cardsPack: {
        name: text,
        private: checked,
      }
    }))
      .unwrap()
      .then(res => {
        dispatch(packsThunks.getPacks({}));
        toast.success("Card created");
      })
      .catch(err => {
        toast.error(err.e.response.data.error);
      });
  };

  return (
    <div className={s.header}>
      {
        loading === Loading.Loading ? <div style={{ height: "42px" }}><Loader /></div> :
          <Typography variant="h4">Packs list</Typography>
      }
      <PackModal callback={addCardHandler} name={"Add"}>
        Add new pack
      </PackModal>
      {/*<Button
        variant="contained"
        color={"warning"}
        sx={{ borderRadius: "2rem" }}
        onClick={addCardHandler}
      >Add new pack</Button>*/}
    </div>
  );
};

