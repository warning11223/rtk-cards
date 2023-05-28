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
import { ModalSelect } from "features/components/ModalSelect";
import { EditImage } from "features/components/PackModal";

type Props = {
  children: React.ReactNode
  callback: (question: string, answer: string, answerCover: string, questionCover: string) => void
  title: string
  answerValue?: string
  questionValue?: string
  answerImg?: string
  questionImg?: string
}

export const CardModal: React.FC<Props> = (props) => {
  const { questionValue, answerValue, answerImg, callback, title, questionImg, children } = props;

  const [open, setOpen] = React.useState<boolean>(false);
  const [question, setQuestion] = useState(questionValue ? questionValue : "");
  const [answer, setAnswer] = useState(answerValue ? answerValue : "");
  const [chosenValue, setChosenValue] = useState("");
  const [answerCover, setAnswerCover] = useState(answerImg ? answerImg : "");
  const [questionCover, setQuestionCover] = useState(questionImg ? questionImg : "");

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    callback(question, answer, answerCover, questionCover);
    setOpen(false);
  };

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
          <form onSubmit={submitHandler}>
            <Stack spacing={2}>

              <ModalSelect value={chosenValue} setValue={setChosenValue} />
              {
                chosenValue === "text" &&
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
              }
              {
                chosenValue === "text" &&
                <FormControl>
                  <FormLabel>Answer</FormLabel>
                  <Input
                    value={answer}
                    onChange={e => setAnswer(e.currentTarget.value)}
                    color={"warning"}
                    required
                  />
                </FormControl>
              }

              {
                chosenValue === "image" &&
                <EditImage setCover={setAnswerCover} cover={answerCover} name={"answer"} />
              }
              {
                chosenValue === "image" &&
                <EditImage setCover={setQuestionCover} cover={questionCover} name={"question"} />
              }


              <Button type="submit" color={"warning"}>{title} card</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};
