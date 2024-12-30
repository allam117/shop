import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import React from "react";

const Link = () => {
  return (
    <>
      {useMediaQuery("(min-width:1000px)") && (
        <React.Fragment>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "22px" }} variant="body1">
              الرئيسيه
            </Typography>
            <ExpandMore sx={{ fontSize: "16px", ml: 1 }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "22px" }} variant="body1">
          المتجر
            </Typography>
            <ExpandMore sx={{ fontSize: "16px", ml: 1 }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "22px" }} variant="body1">
              من نحن
            </Typography>
            <ExpandMore sx={{ fontSize: "16px", ml: 1 }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "22px" }} variant="body1">
              {" "}
              تواصل معنا
            </Typography>
            <ExpandMore sx={{ fontSize: "16px", ml: 1 }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "22px" }} variant="body1">
              {" "}
             الطلبات
            </Typography>
            <ExpandMore sx={{ fontSize: "16px", ml: 1 }} />
          </Box>
        </React.Fragment>
      )}
    </>
  );
};

export default Link;
