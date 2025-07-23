import { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
import {
  IconButton,
  useTheme,
  Box,
  Typography,
  Stack,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Menu,
  Container,
} from "@mui/material";
import {
  DarkModeOutlined as DarkModeOutlinedIcon,
  LightModeOutlined as LightModeOutlinedIcon,
  ExpandMore,
} from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const options = ["Ar"];

function Header1() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const handleToggle = () => {
    const newMode = theme.palette.mode === "light" ? "dark" : "light";
    localStorage.setItem("mode", newMode);
    colorMode.toggleColorMode();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box style={{direction:"rtl"}} sx={{ bgcolor: "#2B3445", py: "0.1px" }}>
      <Container>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography
            padding={"5px"}
            sx={{
              mr: 2,
              p: "5px px 10px",

              color: "#fff",
              borderRadius: "12px",
              fontSize: "20px",
            }}
          >
            النور للأدوات الكهربائيه
          </Typography>
          <Box flexGrow={1} />
          <IconButton onClick={handleToggle} color="inherit">
            {theme.palette.mode === "light" ? (
              <LightModeOutlinedIcon sx={{ color: "white" }} />
            ) : (
              <DarkModeOutlinedIcon sx={{ color: "white" }} />
            )}
          </IconButton>
          <List component="nav" aria-label="Language selection">
            <ListItemButton
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickListItem}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <ListItemText
                primary={options[selectedIndex]}
                sx={{ color: "white" }}
              />
              <ExpandMore sx={{ fontSize: "20px", color: "white" }} />
            </ListItemButton>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          <a
            href="https://www.facebook.com/profile.php?id=100083448092680&mibextid=JRoKGi"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <FacebookIcon sx={{ fontSize: "20px", mx: 1, color: "#fff" }} />
          </a>
          <a
            href="https://wa.me/01096996792"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <WhatsAppIcon sx={{ fontSize: "20px", mx: 1, color: "#fff" }} />
          </a>{" "}
        </Stack>
      </Container>
    </Box>
  );
}

export default Header1;
