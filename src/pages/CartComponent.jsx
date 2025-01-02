import  { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { FaTrash } from "react-icons/fa"; // استيراد الأيقونة من react-icons

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 15 },
    { id: 3, name: "Product 3", price: 20 },
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={2}>
        {cartItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">${item.price}</Typography>
                <IconButton
                  color="error"
                  onClick={() => removeItem(item.id)}
                  style={{ position: "absolute", top: "10px", right: "10px" }}
                >
                  <FaTrash />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div style={{ marginTop: "20px" }}>
        <Typography variant="h6">Total: ${totalPrice}</Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartComponent;
