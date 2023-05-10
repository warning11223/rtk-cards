import Box from "@mui/material/Box/Box";
import Slider from "@mui/material/Slider/Slider";
import Typography from "@mui/material/Typography/Typography";
import React from "react";

import s from './NumberOfCards.module.scss'

export const NumberOfCards = () => {

  const boxSx = {
    width: '63px',
    height: '36px',
    border: '1px solid rgba(000, 000, 000, 0.3)',
    borderRadius: '3px',
    padding: '3px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  const typographySx = {
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '20px',
    textAlign: 'center'
  }


  return (
    <div className={s.numberOfCards}>
      <span>Number of cards</span>
      <Box sx={{ width: 300, display: 'flex', alignItems: 'center' }}>
        <Box sx={boxSx}>
          <Typography sx={typographySx}>0</Typography>
        </Box>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          valueLabelDisplay="auto"
          disableSwap
          sx={{ m: '0 20px' }}
          // @ts-ignore
          color={'warning'}
        />
        <Box sx={boxSx}>
          <Typography sx={typographySx}>100</Typography>
        </Box>
      </Box>
    </div>
  );
};

