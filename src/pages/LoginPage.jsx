import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { FaTimes } from "react-icons/fa";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setIsVisible(false);
    navigate("/");
  };

  return (
    <>
      {isVisible && (
        <Grid
          container
          justifyContent="center"
          marginTop={"40PX"}
          style={{ height: "100vh" }}
        >
          <Grid item xs={12} sm={8} md={4}>
            <Paper
              elevation={3}
              style={{
                padding: "2rem",
                borderRadius: "10px",
                position: "relative",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                align="center"
                gutterBottom
              >
                Login
              </Typography>

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



// // src/pages/LoginPage.jsx

// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   Grid,
//   Alert,
//   CircularProgress,
// } from "@mui/material";

// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import { loginCustomer } from "../api/loginCustomer";

// const LoginPage = () => {
//   const [isVisible, setIsVisible] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleClose = () => {
//     setIsVisible(false);
//     navigate("/");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const result = await loginCustomer(email, password);
//       if (result.customerAccessToken) {
//         localStorage.setItem("accessToken", result.customerAccessToken.accessToken);
//         navigate("/");
//       } else {
//         setError(result.customerUserErrors[0]?.message || "Login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong during login.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {isVisible && (
//         <Grid
//           container
//           justifyContent="center"
//           alignItems="center"
//           style={{ height: "100vh" }}
//         >
//           <Grid item xs={12} sm={8} md={4}>
//             <Paper
//               elevation={3}
//               style={{
//                 padding: "2rem",
//                 borderRadius: "10px",
//                 position: "relative",
//               }}
//             >
//               <Typography
//                 variant="h4"
//                 component="h1"
//                 align="center"
//                 gutterBottom
//               >
//                 Login
//               </Typography>

//               <button
//                 onClick={handleClose}
//                 style={{
//                   position: "absolute",
//                   top: "10px",
//                   right: "10px",
//                   background: "none",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 <FaTimes size={20} />
//               </button>

//               <Box component="form" onSubmit={handleSubmit} noValidate>
//                 <TextField
//                   label="Email"
//                   type="email"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <TextField
//                   label="Password"
//                   type="password"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />

//                 {error && (
//                   <Alert severity="error" style={{ marginTop: "1rem" }}>
//                     {error}
//                   </Alert>
//                 )}

//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                   style={{ marginTop: "1.5rem" }}
//                   disabled={loading}
//                 >
//                   {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
//                 </Button>
//               </Box>
//             </Paper>
//           </Grid>
//         </Grid>
//       )}
//     </>
//   );
// };

// export default LoginPage;
