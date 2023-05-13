import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/joy/Typography";
import { useState } from "react";

type Props = {
  children: React.ReactNode
  callback: (question: string, answer: string) => void
  title: string
  answerValue?: string
  questionValue?: string
}

export const CardModal: React.FC<Props> = ({ children, callback, title, questionValue, answerValue }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [question, setQuestion] = useState(questionValue ? questionValue : "");
  const [answer, setAnswer] = useState(answerValue ? answerValue : "");

  return (
    <React.Fragment>
      {
        title === "Add" ?
          <Button
            variant="outlined"
            color="warning"
            startDecorator={<Add />}
            onClick={() => setOpen(true)}
          >
            {children}
          </Button> :
          <span onClick={() => setOpen(true)}>{children}</span>
      }
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          color={"warning"}
          sx={{ maxWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            {title} card
          </Typography>
          <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
            Fill in the information of the card.
          </Typography>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              callback(question, answer);
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Question</FormLabel>
                <Input
                  value={question}
                  onChange={e => setQuestion(e.currentTarget.value)}
                  color={"warning"}
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Answer</FormLabel>
                <Input
                  value={answer}
                  onChange={e => setAnswer(e.currentTarget.value)}
                  color={"warning"}
                  required
                />
              </FormControl>
              <Button type="submit" color={"warning"}>{title} card</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};
