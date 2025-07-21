


import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  useTheme,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaTrash } from "react-icons/fa";

import {
  getCart,
  createCart,
  getCartCheckoutUrl,
  removeFromCart,
} from "../lib/shopify";

const ShoppingCart = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        let cartId = localStorage.getItem("cartId");
        if (!cartId) {
          const newCart = await createCart();
          cartId = newCart.id;
          localStorage.setItem("cartId", cartId);
        }
        const data = await getCart(cartId);
        console.log("Cart data:", data); 
        setCart(data);
        setCheckoutUrl(await getCartCheckoutUrl(cartId));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleClose = () => navigate("/");
  const handleRemove = async (id) => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;
    const updated = await removeFromCart(cartId, [id]);
    setCart(updated);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper
        sx={{
          width: 500,
          maxHeight: "80vh",
          overflowY: "auto",
          p: 2,
          position: "relative",
          boxShadow: `0 4px 8px ${
            theme.palette.mode == "dark" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.1)"
          }`,
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <FaTimes />
        </IconButton>
        <Typography variant="h5" gutterBottom>
          عربة التسوق
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : !cart?.lines?.length ? (
          <Typography>لا يوجد منتجات</Typography>
        ) : (
          <>
            <List>
              {cart.lines.map((line) => {
                // const unit = parseFloat(line.merchandise.price.amount || "0");
                const unit = parseFloat(line.merchandise?.price?.amount || "0");

                const total = unit * line.quantity;
                return (
                  <ListItem
                    key={line.id}
                    sx={{
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <ListItemText
                      primary={line.merchandise.product.title}
                      secondary={
                        <>
                          <Typography variant="body2">
                            سعر الوحدة: ${unit.toFixed(2)}
                          </Typography>
                          <Typography variant="body2">
                            الكمية: {line.quantity}
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            الإجمالي: ${total.toFixed(2)}
                          </Typography>
                        </>
                      }
                    />
                    <IconButton
                      onClick={() => handleRemove(line.id)}
                      color="error"
                    >
                      <FaTrash />
                    </IconButton>
                  </ListItem>
                );
              })}
            </List>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                المجموع الكلي: $
                {parseFloat(cart.cost?.totalAmount?.amount || "0").toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href={checkoutUrl || "#"}
                target="_blank"
                disabled={!checkoutUrl}
              >
                إتمام الشراء
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ShoppingCart;
