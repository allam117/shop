import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Stack,
} from "@mui/material";
import { AddShoppingCartOutlined, Close } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import image1 from "../../assets/images/image9.jpg";
import image2 from "../../assets/images/image17.jpg";
import image from "../../assets/images/image10.jpg";
// import ProductDetails from "./components/main/ProductDetails";

const MainComponent = ({ imagess = [] }) => {
  const imageSize = 278; // Set a fixed size for all images
  const imageGap = 16;
  const verticalMargin = 10;

  if (!imagess || imagess.length === 0) {
    return (
      <Box sx={{ textAlign: "center", margin: "20px" }}>
        <Typography color="error" fontSize="18px">
          لا توجد صور لعرضها.
        </Typography>
      </Box>
    );
  }

  const [open, setOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(4);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          width: "92%",
          maxWidth: "1160px",
          margin: "0 auto",
          overflow: "hidden",
          borderRadius: "3px",
          marginBottom: "10px",
          paddingBottom: "10px",
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          padding={"10px 0px"}
        >
          <Typography
            sx={{
              marginRight: "15px",
              marginBottom: "15px",
              marginTop: "10px",
              color: "black",
              fontSize: "18px",
              marginLeft: "10px",
            }}
          >
            شاهد الكل
          </Typography>

          <Typography
            sx={{
              color: "black",
              fontSize: "25px",
              marginRight: "15px",
              marginBottom: "25px",
              marginTop: "10px",
              fontWeight: "bold",
            }}
          >
            نوع المنتج
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: `${imageGap}px`,
            justifyContent: "flex-start",
          }}
        >
          {imagess.map((image, index) => (
            <Card key={index} sx={{ width: `${imageSize}px`, height: "auto" }}>
              <CardMedia
                component="img"
                image={image.src}
                alt={image.alt || `Image ${index}`}
                sx={{
                  objectFit: "cover",
                  borderRadius: "8px",
                  width: "100%",
                  height: `${imageSize}px`,
                  marginBottom: `${verticalMargin}px`,
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "-8px",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>{image.name || "لا يوجد وصف متاح."}</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginTop: "7px",
                    }}
                  >
                    {image.price || `صورة ${index + 1}`}
                  </Typography>
                </Box>
                <Typography sx={{ wordWrap: "break-word", marginTop: "10px" }}>
                  {image.description || "لا يوجد وصف متاح."}
                </Typography>
              </CardContent>

              <CardActions
                sx={{ marginTop: "-8px", justifyContent: "space-between" }}
              >
                <Button
                  onClick={handleClickOpen}
                  size="large"
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "13px",
                  }}
                >
                  <ShoppingCartIcon fontSize="small" />
                  Add to Cart
                </Button>
                <Rating
                  name="simple-controlled"
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                />
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>

      <Dialog
        sx={{ ".MuiPaper-root": { minWidth: { xs: "80%", md: 700 } } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 0, right: 4 }}
        >
          <Close />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box>
            <img width={300} height={350} src={image} alt="" />
          </Box>
          <Box>
            <Typography marginTop={"10px"} variant="h5">
              {" "}
              lampat
            </Typography>
            <Typography
              my={0.4}
              fontSize={"22px"}
              color={"crimson"}
              variant="h5"
            >
              12.9$
            </Typography>
            <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
              ,fd.v.ced.s;;efl;rfktkrlrllwel rltffccjjjjkslevvvvvvv
              <br />
              vvvvvvvvvvvrdfekmmm
              <br />
              mmmmm mmmmmmmmmmmmmmmmmmmmm
            </Typography>
            <Stack direction={"row"}>
              {[image1, image2, image].map((item) => (
                <img
                  key={item}
                  src={item}
                  alt=""
                  style={{ width: 100, height: 130, margin: 5 }}
                />
              ))}
            </Stack>
            <Button
              sx={{ marginTop: "20px", textTransform: "capitalize" }}
              variant="contained"
            >
              <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
              اضف الي السله
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default MainComponent;
