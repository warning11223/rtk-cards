import React, { useState } from "react";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import { useAppDispatch } from "common/hooks";
import { cardsThunks } from "features/cards/cardsSlice";
import { toast } from "react-toastify";

type Props = {
  grade: number
  id: string
}

const StarRating: React.FC<Props> = ({ grade, id }) => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(grade);
  console.log(grade);
  return (
    <div>
      {
        [...Array(5)].map((item, index) => {
          const ratingValue = index + 1;

          const onGradeCardHandler = () => {
            setRating(index + 1);
            dispatch(cardsThunks.gradeCard({
              grade: rating,
              card_id: id
            }))
              .unwrap()
              .then(() => {
                toast.success("Rating was successful");
              })
              .catch(err => {
                toast.error(err.e.response.data.error);
              });
          };

          return <GradeRoundedIcon
            key={index}
            style={{ cursor: "pointer" }}
            color={`${ratingValue <= grade ? "warning" : "disabled"}`}
            /*onClick={onGradeCardHandler}
            onMouseEnter={() => setHover(index + 1)}
            onMouseLeave={() => setHover(0)}*/
          />;
        })
      }
    </div>
  );
};

export default StarRating;
