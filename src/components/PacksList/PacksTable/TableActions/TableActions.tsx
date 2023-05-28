import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import Box from "@mui/material/Box/Box";
import IconButton from "@mui/material/IconButton/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { selectPacks } from "features/packs/packsSelectors";
import { PackModal } from "features/components/PackModal";
import { DeleteModal } from "features/components/DeleteModal";
import { deletePackHandler, updatePackHandler } from "common/utils";
import { Link } from "react-router-dom";

type Props = {
  id: string
  myCard: boolean
}

export const TableActions: React.FC<Props> = ({ myCard, id }) => {
  const packs = useAppSelector(selectPacks);
  const dispatch = useAppDispatch();
  const currentPack = packs.find(item => item._id === id);

  const updateHandler = (text: string, checked: boolean, deckCover: string | undefined) => {
    updatePackHandler({
      id,
      dispatch,
      text,
      deckCover
    });
  };

  const deleteHandler = () => {
    deletePackHandler({ id, dispatch });
  };

  return (
    <Box>
      <Link to={`/learn/${currentPack?._id}`}>
        <IconButton size={"small"} disabled={!currentPack?.cardsCount}>
          <SchoolIcon />
        </IconButton>
      </Link>
      {
        myCard &&
        <PackModal
          callback={updateHandler}
          name={"Edit"}
          packName={currentPack?.name}
          deckCover={currentPack?.deckCover}
        >
          <IconButton size={"small"}>
            <BorderColorIcon />
          </IconButton>
        </PackModal>
      }
      {
        myCard &&
        <DeleteModal callback={deleteHandler} name={currentPack?.name}>
          <IconButton size={"small"}>
            <DeleteIcon />
          </IconButton>
        </DeleteModal>
      }
    </Box>
  );
};

