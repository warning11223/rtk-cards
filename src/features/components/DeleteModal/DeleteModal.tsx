import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Typography from "@mui/joy/Typography";

type Props = {
  children: React.ReactNode
  callback: () => void
}

export const DeleteModal: React.FC<Props> = ({ children, callback }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const deleteHandler = () => {
    callback();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <span onClick={() => setOpen(true)}>{children}</span>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<WarningRoundedIcon />}
          >
            Confirmation
          </Typography>
          <Divider />
          <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
            Are you sure you want to delete your pack?
          </Typography>
          <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="solid" color="danger" onClick={deleteHandler}>
              Delete pack
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};
