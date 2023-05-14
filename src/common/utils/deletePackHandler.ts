import { packsThunks } from "features/packs/packsSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "app/store";

type Args = {
  dispatch: AppDispatch
  id: string
}

export const deletePackHandler = ({dispatch, id}: Args) => {
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
