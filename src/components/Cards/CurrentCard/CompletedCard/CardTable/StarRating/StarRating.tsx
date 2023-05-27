import React from "react";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";

type Props = {
  grade: number
  id: string
}

const StarRating: React.FC<Props> = ({ grade }) => {

  return (
    <div>
      {
        [...Array(5)].map((item, index) => {
          const ratingValue = index + 1;

          return <GradeRoundedIcon
            key={index}
            color={`${ratingValue <= grade ? "warning" : "disabled"}`}
          />;
        })
      }
    </div>
  );
};

export default StarRating;
