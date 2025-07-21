


import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import "./Link.css";

const Link = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const isDesktop = useMediaQuery("(min-width:800px)");
  const isMobile = useMediaQuery("(max-width:799px)");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: "65%", display: "flex", alignItems: "center" }}>
   
      {isDesktop && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2rem",
          }}
        >
          <Button
            onClick={() => navigate("/")}
            sx={{ fontSize: "20px", color: "black", fontWeight: "600" }}
          >
            الرئيسية
          </Button>
          <Button
            onClick={() => navigate("/howare")}
            sx={{ fontSize: "20px", color: "black", fontWeight: "600" }}
          >
            من نحن
          </Button>
          <Button
            onClick={() => navigate("/callme")}
            sx={{ fontSize: "20px", color: "black", fontWeight: "600" }}
          >
            تواصل معنا
          </Button>
          <Button sx={{ fontSize: "20px", color: "black", fontWeight: "600" }}>
            الطلبات
          </Button>
        </Box>
      )}

     
      {isMobile && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end", 
            padding: "0 1rem",
          }}
        >
          <IconButton onClick={handleMenuOpen} color="black">
            <MenuIcon fontSize="large" color="black" />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem
              onClick={() => {
                navigate("/");
                handleMenuClose();
              }}
            >
              الرئيسية
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/howare");
                handleMenuClose();
              }}
            >
              من نحن
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/callme");
                handleMenuClose();
              }}
            >
              تواصل معنا
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>الطلبات</MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default Link;
