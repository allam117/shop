import { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
import {

  useTheme,
  Box,

 
  
} from "@mui/material";




function Header1() {
 


  return (
    <Box
      sx={{
        width: "92%",
        maxWidth: "1160px",
        margin: "0 auto",
        py: "0.1px",
        marginTop: "50px",
        marginBottom: "70px",
        background: "##fcfcfc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
  
      <Box style={{ padding: "20px" }}>
        <h2  style={{fontSize:"32px",marginLeft:"40px"}}>اتصل بنا</h2>
        <a
          href="tel:01012345678"
          style={{
            fontSize: "22px",
            color: "#007bff",
            textDecoration: "none",
          }}
        >
          📞 01096996792
        </a>
      </Box>
    </Box>
  );
}

export default Header1;
