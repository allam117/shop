import React from 'react'
import { KeyboardArrowUp } from '@mui/icons-material';
import { Fab,useScrollTrigger,Zoom } from '@mui/material';
const ScrollToTop = () => {
  return (
   <Zoom in={useScrollTrigger()}>
    <Fab 
    onClick={()=>{
        window.scrollTo(500,0);
    }}
    variant="extended"
    size="small"
    sx={{position:"fixed",bottom:33,right:33}}
    color="primary"
    arial-label="add">
        <KeyboardArrowUp fontSize="medium"/>

       

    </Fab>

   </Zoom>
  );
};

export default ScrollToTop;