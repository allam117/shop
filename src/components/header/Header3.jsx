
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  IconButton,
  Typography,
  useTheme,
  Drawer,
} from "@mui/material";
import { useState } from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import WindowIcon from "@mui/icons-material/Window";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Close } from "@mui/icons-material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Link from "./Link";
import useMediaQuery from "@mui/material/useMediaQuery";

// بيانات المنتجات


const Header3 = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = () => {
    navigate("/categories");
  };
  const theme = useTheme();
  

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        padding: 2,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        محتويات الدرج
      </Typography>
    </Box>
  );

  const [activeProducts, setActiveProducts] = useState([]);

  
  const handleButtonClick = (products) => {
    setActiveProducts(products); 
    setAnchorEl(null); 
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box onClick={handleMenuItemClick}>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            width: 200,
            bgcolor: theme.palette.myColor?.main || "primary.main",
            color: theme.palette.text.primary,
            fontSize: 1,
          }}
        >
          <WindowIcon />
          <Typography
            sx={{
              padding: "0",
              textTransform: "capitalize",
              mx: 1,
              fontSize: "24px",
              fontWeight: "bold",
              color: theme.palette.text.primary,
            }}
          >
            المنتجات
          </Typography>
          <Box flexGrow={1} />
          <KeyboardArrowRightOutlinedIcon />
        </Button>
      </Box>

     
      <Box sx={{ marginTop: "20px" }}>
        {activeProducts.length > 0 ? (
          activeProducts.map((product) => (
            <Box key={product.id} sx={{ marginBottom: "10px" }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1">{product.price}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="h6"></Typography>
        )}
      </Box>

      <Link />
   

      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        sx={{ ".MuiPaper-root": { width: "100%" } }}
      >
        {list("right")}
        <Box
          className="border"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            width: 444,
            mx: "auto",
            mt: 1,
            position: "relative",
            p: "0 10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
            
            }}
          >
            الرئيسيه
          </Typography>
          <IconButton
            onClick={toggleDrawer("right", false)}
            sx={{ position: "absolute", top: 0, right: 4 }}
          >
            <Close />
          </IconButton>

          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>الطلبات</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography>المنتجات التي تم شرائها</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography>من نحن</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Drawer>
    </Container>
  );
};

export default Header3;