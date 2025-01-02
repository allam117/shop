
import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";

import  { useState } from "react";

import { FaTimes } from "react-icons/fa";


const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(true); // حالة لتحديد ما إذا كان المكون مرئيًا أم لا
 const navigate = useNavigate();
  const handleClose = () => {
    setIsVisible(false);
    navigate("/"); // إخفاء المكون عند الضغط على الأيقونة
  };

  return (
    <>
      {isVisible && (
    <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <Grid item xs={12} sm={8} md={4}>
         
            <Paper elevation={3} style={{ padding: "2rem", borderRadius: "10px", position: "relative" }}>
  <Typography variant="h4" component="h1" align="center" gutterBottom>
    Login
  </Typography>

  {/* زر الإغلاق */}
  <button
    onClick={handleClose}
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "none",
      border: "none",
      cursor: "pointer",
    }}
  >
    <FaTimes size={20} />
  </button>

  <Box component="form" noValidate autoComplete="off">
    <TextField
      label="Email"
      type="email"
      fullWidth
      margin="normal"
      variant="outlined"
      required
    />
    <TextField
      label="Password"
      type="password"
      fullWidth
      margin="normal"
      variant="outlined"
      required
    />
    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      style={{ marginTop: "1.5rem" }}
    >
      Login
    </Button>
  </Box>
</Paper>


          </Grid>
        </Grid>
      )}
    </>
  );
};

export default LoginPage;
