import Typography from "@mui/material/Typography/Typography";
import React from "react";

import s from "components/PacksList/PacksListHeader/PackListHeader.module.scss";
import { Loading } from "features/auth/authSlice";
import { Loader } from "components/Loader/Loader";
import { useAppSelector } from "common/hooks";
import { selectAuthLoading } from "features/auth/authSelectors";
import { packsThunks } from "features/packs/packsSlice";
import { toast } from "react-toastify";
import { PackModal } from "features/components/PackModal";
import { useActions } from "common/hooks/useActions";

export const PacksListHeader = () => {
  const { getPacks } = useActions(packsThunks);
  const loading = useAppSelector(selectAuthLoading);
  const { createPack } = useActions(packsThunks);

  const addCardHandler = (text: string, checked: boolean, deckCover: string | undefined) => {
    createPack({
      cardsPack: {
        name: text,
        private: checked,
        deckCover
      }
    })
      .unwrap()
      .then(res => {
        getPacks({});
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
    </div>
  );
};

