import { packsThunks } from "features/packs/packsSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "app/store";

type Args = {
  text?: string
  dispatch: AppDispatch
  id: string
}

export const updatePackHandler = ({ text, id, dispatch }: Args) => {
  dispatch(packsThunks.updatePack({
    cardsPack: {
      _id: id,
      name: text!,
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
