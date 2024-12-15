
import  { useState } from "react";
import {
  Badge,
  Container,
  Stack,
  Typography,
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
  ShoppingCartOutlined,
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
    // backgroundColor: alpha(theme.palette.common.white, 0.25),
    border: "1px solid #777",
  },
  marginRight: theme.spacing(2),
  width: "100%",
  minWidth: "300PX",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color:"#777"
}));


const Header2 = () => {
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
    <Container sx={{ my: 3, display: "flex", justifyContent: "space-between" }}>
    
      <Stack alignItems={"center"}>
        <ShoppingCartOutlined />
        <Typography variant="body2">E-commerce</Typography>
      </Stack>

     
      <Search 
      sx={{display:"flex",
        justifyContent:"space-between",
        borderRadius:"22px"
      }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <InputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
     sx={{ marginLeft: "45px",}}
        />
        <div>
          <List component="nav" aria-label="Device settings"
          sx={{
            p:"0"
          }}>
            <ListItemButton
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickListItem}
            >
              <ListItemText
              className="border"

              sx={{width:100
                ,
                textAlign:"center","&:hover":{cursor:"pointer"}
              }}
                secondary={options[selectedIndex]}
              />
              <ExpandMore sx={{fontSize:"16PX"}}/>
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
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="primary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
        <IconButton>
          <Person2OutlinedIcon />
        </IconButton>
      </Stack>
    </Container>
  );
};

export default Header2;
