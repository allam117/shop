


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { getProducts } from "../../lib/shopify";

const SearchResults = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(search).get("q")?.toLowerCase() || "";
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        const allProducts = await getProducts({ query });
        setProducts(allProducts);

        const results = allProducts.filter((product) => {
          const name = product.title?.toLowerCase() || "";
          const desc = product.description?.toLowerCase() || "";
          return name.includes(query) || desc.includes(query);
        });

        setFiltered(results);
      } catch (err) {
        console.error("خطأ أثناء جلب المنتجات:", err);
      }
    };

    fetchAndFilter();
  }, [query]);

  return (
    <Container sx={{ py: 4 }} style={{ direction: "rtl" }}>
      {filtered.length === 0 ? (
        <Typography>لا توجد نتائج مطابقة.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                onClick={() => {
                  navigate(`/products/${product.handle}`);
                }}
                sx={{
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.featuredImage?.url || "/placeholder.jpg"}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2">
                    {product.description?.slice(0, 80)}...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SearchResults;
