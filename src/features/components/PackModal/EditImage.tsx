import React, { ChangeEvent, useRef, useState } from "react";
import s from "features/components/PackModal/PackModal.module.scss";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import editAvatarBtn from "assets/img/editAvatar.svg";
import { convertFileToBase64 } from "common/utils";
import { toast } from "react-toastify";

type Props = {
  setCover: (cover: string) => void
  cover: string
  name?: string
}

export const EditImage: React.FC<Props> = ({ setCover, cover, name }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showImage, setShowImage] = useState(false);
  const [isCoverBroken, setIsCoverBroken] = useState(false);

  console.log(cover);

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setCover(file64);
          setShowImage(true);
        });
      } else {
        toast.error("The file is too large");
      }

    }
  };

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click();
  };

  const errorHandler = () => {
    setIsCoverBroken(true);
    setShowImage(false);
  };

  return (
    <>
      <div className={s.packModal__cover}>
        <FormControl>
          <FormLabel>Select {name ? name : "image"}:</FormLabel>
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            accept={"image/*"}
            onChange={uploadHandler}
          />
        </FormControl>

        <img
          onClick={selectFileHandler}
          src={editAvatarBtn}
          alt="editAvatarBtn"
          className={s.packModal__icon}
        />

      </div>

      {
        cover &&
        <div style={{ margin: "16px auto 0 auto" }}>
          <img
            src={isCoverBroken ? "error" : cover}
            alt="cover"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
            onError={errorHandler}
          />
        </div>
      }

    </>
  );
};

