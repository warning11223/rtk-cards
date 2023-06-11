import React from "react";
import Skeleton from "@mui/material/Skeleton/Skeleton";

export const SkeletonLoader = () => {
  return (
    <div style={{height: '35px', marginTop: '10%'}}>
      <Skeleton animation="wave"/>
    </div>
  );
};
