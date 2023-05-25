import React, { ChangeEvent, useRef, useState } from "react";
import s from "components/Profile/Profile.module.scss";
import editAvatar from "assets/img/editAvatar.svg";
import { convertFileToBase64 } from "common/utils";
import avatar from "assets/img/avatar.svg";
import { toast } from "react-toastify";
import { useAppDispatch } from "common/hooks";
import { authThunks } from "features/auth/authSlice";


type Props = {
  profileAvatar: string | undefined
}

export const InputTypeFile: React.FC<Props> = ({profileAvatar}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ava, setAva] = useState(profileAvatar ? profileAvatar : avatar);
  const [isAvaBroken, setIsAvaBroken] = useState(false);
  const dispatch = useAppDispatch();

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click();
  };

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(authThunks.updateMe({ avatar: file64 }))
            .unwrap()
            .then(res => {
              toast.success(`${res.updatedUser.name} avatar was updated`);
              setAva(file64);
            })
            .catch(err => {
              toast.error(err.e.response.data.error);
            });
        });
      } else {
        toast.error("The file is too large");
      }

    }
  };

  const errorHandler = () => {
    setIsAvaBroken(true);
  };

  return (
    <>
      <img
        className={s.profile__avatar}
        src={isAvaBroken ? avatar : ava}
        alt="avatar"
        onError={errorHandler}
      />

      <img
        className={s.profile__editAvatar}
        onClick={selectFileHandler}
        src={editAvatar}
        alt="editAvatar"
      />

      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        accept={"image/*"}
        onChange={uploadHandler}
      />
    </>
  );
};

