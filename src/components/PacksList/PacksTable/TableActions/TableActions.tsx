import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import Box from "@mui/material/Box/Box";
import IconButton from "@mui/material/IconButton/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "common/hooks";
import { packsThunks } from "features/packs/packsSlice";
import { toast } from "react-toastify";

type Props = {
  id: string
  myCard: boolean
}

export const TableActions: React.FC<Props> = ({ myCard, id }) => {
  const dispatch = useAppDispatch();

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

  const updatePackHandler = () => {
    dispatch(packsThunks.updatePack({
      cardsPack: {
        _id: id,
        name: "UPDATE!!!!"
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
      <IconButton size={"small"}>
        <SchoolIcon />
      </IconButton>
      {
        myCard
        && <IconButton size={"small"} onClick={updatePackHandler}>
          <BorderColorIcon />
        </IconButton>
      }
      {
        myCard
        && <IconButton size={"small"} onClick={deletePackHandler}>
          <DeleteIcon />
        </IconButton>
      }
    </Box>
  );
};

