import { packsThunks } from "features/packs/packsSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "app/store";

type Args = {
  text?: string
  dispatch: AppDispatch
  id: string
  deckCover?: string
}

export const updatePackHandler = ({ text, id, dispatch, deckCover }: Args) => {
  dispatch(packsThunks.updatePack({
    cardsPack: {
      _id: id,
      name: text!,
      deckCover
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
