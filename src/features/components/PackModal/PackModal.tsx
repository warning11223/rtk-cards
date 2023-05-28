import * as React from "react";
import { useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/joy/Typography";

import listIcon from "../../../assets/img/list-icon.png";
import { EditImage } from "features/components/PackModal";

type Props = {
  children: React.ReactNode
  callback: (text: string, checked: boolean, deckCover?: string | undefined) => void
  setVisiblePopup?: (visible: boolean) => void
  name: string
  packName?: string | undefined
  deckCover?: string
}

export const PackModal: React.FC<Props> = ({ children, callback, name, packName, deckCover, setVisiblePopup }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [text, setText] = useState(name === "Edit" ? packName : "");
  const [checked, setChecked] = useState(false);
  const [cover, setCover] = useState(deckCover ? deckCover : listIcon);

  const closeHandler = () => {
    setOpen(false);
    setVisiblePopup && setVisiblePopup(false);
  };

  return (
    <React.Fragment>
      {
        name === "Add"
          ? <Button
            variant="outlined"
            color="warning"
            startDecorator={<Add />}
            onClick={() => setOpen(true)}
          >
            {children}
          </Button>
          : <span onClick={() => setOpen(true)}>
              {children}
            </span>
      }

      <Modal open={open} onClose={closeHandler}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
          color={"warning"}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            {name} pack
          </Typography>
          <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
            Fill in the information of the pack.
          </Typography>

          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
              callback(text ? text : "", checked, cover);
              setText("");
              setChecked(false);
              setCover(listIcon);
              setVisiblePopup && setVisiblePopup(false);
            }}
          >
            <Stack spacing={2}>

              <EditImage cover={cover} setCover={setCover} />

              <FormControl>
                <FormLabel>Name Pack</FormLabel>
                <Input
                  value={text}
                  onChange={(e) => setText(e.currentTarget.value)}
                  autoFocus
                  required
                  color={"warning"}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Private pack</FormLabel>
                <Input
                  onChange={(e) => setChecked(e.currentTarget.checked)}
                  type={"checkbox"}
                  color={"warning"}
                />
              </FormControl>
              <Button type="submit" color={"warning"}>{name}</Button>
            </Stack>
          </form>

        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};
