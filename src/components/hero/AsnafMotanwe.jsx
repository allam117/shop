





import image18 from "../../assets/images/image18.jpg";
import {
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCollectionProducts } from "@lib/shopify";

export default function AsnafMotanwe() {
  const collectionHandle = "اصناف-متنوعه";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetchCollectionProducts({ collectionHandle });
        setProducts(res);
      } catch (err) {
        console.error("خطأ في جلب المنتجات:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        margin: "40px auto",
        maxWidth: "1170px",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Box
        component="img"
        src={image18}
        alt="صورة الصنف"
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.14)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        sx={{
          borderRadius: "8px",
          width: { xs: "335px", sm: "100%" },
          maxWidth: "100%",
          height: "auto",
          marginBottom: "20px",
          transition: "transform 0.8s ease",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      {loading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : products.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 0.6,
          }}
        >
          {products.map((product) => (
            <Box
              key={product.id}
              onClick={() => navigate(`/products/${product.handle}`)}
              sx={{
                borderRadius: "8px",
                padding: 1,
                cursor: "pointer",
                width: {
                  xs: "155px",
                  sm: "213px",
                },
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: {
                    xs: "155px",
                    sm: "213px",
                  },
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={product.featuredImage?.url || "/placeholder.jpg"}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingTop: "10px",
                  textAlign: "center",
                  color: "#444",
                }}
              >
                {product.description?.substring(0, 80) || "بدون وصف"}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography textAlign="center">لا توجد منتجات</Typography>
      )}
    </Box>
  );
}
