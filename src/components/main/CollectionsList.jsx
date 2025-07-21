


import { useState } from "react";
import { Menu, MenuItem, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetCollectionsList } from "../../hooks/useGetCollectionsList";
import Asnaf from "../hero/Asnaf";


// // Fetch collections
export default function CollectionsList() {
  const { collections, isLoading, error } = useGetCollectionsList();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  if (isLoading) {
    return <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}} >Loading...</Box>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box
      sx={{
        marginRight: "auto",
        marginLeft: "auto",
        width: "80%",
      }}
    >
      {/* <Box
        sx={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"flex-end"
        }}
      >
        <Typography>كل المنتاجات</Typography>
        <Box
          sx={{
            justifyContent: "flex-end",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{ fontSize: "1.5rem" }}
          >
            أقسام المنتجات
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            disableAutoFocusItem
          >
            {collections.map((collection) => (
              <MenuItem
                key={collection.handle}
                onClick={() => navigate(collection.handle)}
                sx={{
                  width: 300,
                  textAlign: "center",
                  // fontSize:"18px",
                  fontWeight: "550",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {collection.title}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%", // مهم لتأكيد الامتداد الكامل
          padding: "0 16px", // اختياري: تباعد داخلي بسيط
        }}
      >
        <Typography sx={{ fontSize: "1.3rem", fontWeight: "bold",paddingLeft:"10px" }}>
          كل المنتجات
        </Typography>

        <Box>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{ fontSize: "1.3rem" }}
          >
            أقسام المنتجات
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            disableAutoFocusItem
          >
            {collections.map((collection) => (
              <MenuItem
                key={collection.handle}
                onClick={() => navigate(collection.handle)}
                sx={{
                  width: 280,
                  textAlign: "center",
                  fontWeight: "550",
                  display: "flex",
                  justifyContent: "center",
                  wordBreak:"break-word",
                  
                }}
              >
                {collection.title}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      <Asnaf />
    </Box>
  );
}
