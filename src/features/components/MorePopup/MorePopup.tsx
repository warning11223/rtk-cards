import React from "react";

import s from "features/components/MorePopup/MorePopup.module.scss";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import SchoolIcon from "@mui/icons-material/School";
import { deletePackHandler, updatePackHandler } from "common/utils";
import { useAppDispatch } from "common/hooks";
import { PackModal } from "features/components/PackModal/PackModal";
import { DeleteModal } from "features/components/DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";

type Props = {
  packId: string | undefined
  setVisiblePopup: (visible: boolean) => void
  name: string
  deckCover?: string | undefined
}

export const MorePopup: React.FC<Props> = ({ packId, setVisiblePopup, name, deckCover }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const editHandler = (text: string, checked: boolean, deckCover: string | undefined) => {
    setVisiblePopup(false);
    updatePackHandler({
      id: packId!,
      dispatch,
      text,
      deckCover
    })
  };

  const deleteHandler = () => {
    setVisiblePopup(false);
    new Promise((res, rej) => {
      res(deletePackHandler({
        id: packId!,
        dispatch
      }));
    })
      .then(res => {
        setTimeout(() => {
          navigate("/packs-list");
        }, 50);
      });
  };

  const learnHandler = () => {
    navigate(`/learn/${packId}`);
  };

  return (
    <div className={s.morePopup}>
      <PackModal
        callback={editHandler}
        name={"Edit"}
        packName={name}
        deckCover={deckCover}
        setVisiblePopup={setVisiblePopup}
      >
        <div className={s.morePopup__wrapper} >
          <BorderColorIcon color={"warning"} />
          <span>Edit</span>
        </div>
      </PackModal>

      <DeleteModal callback={deleteHandler} name={name} setVisiblePopup={setVisiblePopup}>
        <div className={s.morePopup__wrapper}>
          <DeleteIcon color={"warning"} />
          <span>Delete</span>
        </div>
      </DeleteModal>

      <div className={s.morePopup__wrapper} onClick={learnHandler}>
        <SchoolIcon color={"warning"} />
        <span>Learn</span>
      </div>
    </div>
  );
};

