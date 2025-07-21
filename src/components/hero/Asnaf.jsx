



import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { getProducts } from "../../lib/shopify";
import { useNavigate } from "react-router-dom";
export default function Asnaf() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts({ first: 10 }); // هات أول 10 منتجات
        setProducts(data);
      } catch (error) {
        console.error("❌ خطأ في جلب المنتجات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
 const navigate = useNavigate();
  return (
    <Box padding={3}>
      {loading ? (
        <CircularProgress />
      ) : products.length > 0 ? (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {products.map((product) => (
            <Box
              style={{ direction: "rtl" }}
              onClick={() => {
                navigate(`/products/${product.handle}`);
              }}
              key={product.id}
              sx={{
               
                borderRadius: "8px",
                padding: 2,
                width: "250px",
              }}
            >
              <img
                src={product.images[0]?.url || "/placeholder.jpg"}
                alt={product.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Typography variant="h6" mt={1}>
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description?.substring(0, 80)}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography>لا توجد منتجات</Typography>
      )}
    </Box>
  );
}

