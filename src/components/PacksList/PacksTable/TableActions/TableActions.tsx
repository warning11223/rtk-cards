import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import Box from "@mui/material/Box/Box";
import IconButton from "@mui/material/IconButton/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packsSlice";
import { toast } from "react-toastify";
import { selectPacks } from "features/packs/packsSelectors";
import { PackModal } from "features/components/PackModal/PackModal";
import { DeleteModal } from "features/components/DeleteModal/DeleteModal";

type Props = {
  id: string
  myCard: boolean
}

export const TableActions: React.FC<Props> = ({ myCard, id }) => {
  const packs = useAppSelector(selectPacks);
  const dispatch = useAppDispatch();
  const currentPack = packs.find(item => item._id === id)


  const deletePackHandler = () => {
    dispatch(packsThunks.deletePack(id))
      .unwrap()
      .then(res => {
        dispatch(packsThunks.getPacks({}));
        toast.success("Pack deleted");
      })
      .catch(err => {
        toast.error(err.e.response.data.error);
      });
  };

  const updatePackHandler = (text: string) => {
    dispatch(packsThunks.updatePack({
      cardsPack: {
        _id: id,
        name: text,
      }
    }))
      .unwrap()
      .then(res => {
        dispatch(packsThunks.getPacks({}));
        toast.success("Pack updated");
      })
      .catch(err => {
        toast.error(err.e.response.data.error);
      });
  };

  return (
    <Box>
      <IconButton size={"small"} disabled={!currentPack?.cardsCount}>
        <SchoolIcon />
      </IconButton>
      {
        myCard &&
        <PackModal callback={updatePackHandler} name={"Edit"} packName={currentPack?.name}>
          <IconButton size={"small"}>
            <BorderColorIcon />
          </IconButton>
        </PackModal>
      }
      {
        myCard &&
        <DeleteModal callback={deletePackHandler}>
          <IconButton size={"small"}>
            <DeleteIcon />
          </IconButton>
        </DeleteModal>
      }
    </Box>
  );
};

