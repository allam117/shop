
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Badge,
  Container,
  Stack,
  InputBase,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Menu,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Search as SearchIcon,
  Person2Outlined as Person2OutlinedIcon,
  ShoppingCart as ShoppingCartIcon,
  ExpandMore,
} from "@mui/icons-material";

const options = ["Option 1", "Option 2", "Option 3"];

const Search = styled("div")(({ theme }) => ({
  flexGrow: "0.4",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  border: "1px solid #333",
  "&:hover": {
    border: "1px solid #777",
  },
  marginRight: theme.spacing(1),
  width: "100%",
  minWidth: "20px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    padding: "0px 4px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#777",
}));

const Header2 = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

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

  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <Container sx={{ my: 2, display: "flex", justifyContent: "space-between" }}>
      <Stack alignItems={"center"}></Stack>

      <Search style={{direction:"rtl"}}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "15px",
          width: "635px",
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <InputBase
          placeholder="البحث عن المنتاجات"
          inputProps={{ "aria-label": "search" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          sx={{ marginRight: "45px", flex: 1 }}
        />
        <div>
          <List component="nav" aria-label="Device settings" sx={{ p: "0" }}>
            <ListItemButton
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickListItem}
            >
              <ListItemText
                className="border"
                sx={{
                  width: 100,
                  textAlign: "center",
                  "&:hover": { cursor: "pointer" },
                }}
                secondary={options[selectedIndex]}
              />
              <ExpandMore sx={{ fontSize: "16px" }} />
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
        </div>
      </Search>

      {/* Icons Section */}
      <Stack direction={"row"} alignItems={"center"}>
        <IconButton onClick={navigateToCart} aria-label="cart">
          <StyledBadge badgeContent={4} color="primary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
        <IconButton onClick={navigateToLogin}>
          <Person2OutlinedIcon />
        </IconButton>
      </Stack>
    </Container>
  );
};

export default Header2;
