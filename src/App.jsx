

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { ColorModeContext, useMode } from "./theme";
import { getCollections } from "./lib/shopify";

// Header
import HeaderCombined from "./components/header/HeaderCombined";
import HeaderFinal from "./components/header/HeaderFinal";

// Pages
import LoginPage from "./pages/LoginPage";
import CartComponent from "./pages/CartComponent";
import HomePage from "./pages/HomePage";

// Main components
import ScrollToTop from "./components/main/ScrollToTop";
import ProductDetails from "./components/main/ProductDetails";
import CollectionsList from "./components/main/CollectionsList";
import CollectionProducts from "./components/main/CollectionProducts";
import Howare from "./components/main/Howare";
import Callme from "./components/main/Callme";

// Search
import SearchResults from "./components/header/SearchResults";

// Static Data & Images
import { imagess } from "./data";
import image1 from "./assets/images/image1.png";
import image4 from "./assets/images/image4.jpg";
import image5 from "./assets/images/image5.jpg";

const images = [
  { src: image1, alt: "Image 1" },
  { src: image4, alt: "Image 4" },
  { src: image5, alt: "Image 5" },
];

function App() {
  const [theme, colorMode] = useMode();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const collections = await getCollections();
        const formattedCompanies = collections.map((collection) => ({
          id: collection.id,
          src: collection.image?.url || "/placeholder.jpg",
          name: collection.title,
          description: collection.description,
          handle: collection.handle,
        }));
        setCompanies(formattedCompanies);
      } catch (error) {
        console.error("❌ خطأ في جلب الشركات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <HeaderCombined />

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartComponent />} />
            <Route path="/howare" element={<Howare />} />
            <Route path="/callme" element={<Callme />} />
            <Route path="/search" element={<SearchResults />} />
            <Route
              path="/"
              element={
                <HomePage
                  images={images}
                  imagess={imagess}
                  companies={companies}
                />
              }
            />
            <Route path="/categories">
              <Route
                index
                element={
                  <CollectionsList interval={5000} transitionDuration={800} />
                }
              />
              <Route path=":categoryId" element={<CollectionProducts />} />
            </Route>
            <Route path="/products">
              <Route index element={<></>} />
              <Route path=":productId" element={<ProductDetails />} />
            </Route>
          </Routes>

          <ScrollToTop />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
