import SearchResults from "./components/header/SearchResults";
import { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCollections } from "./lib/shopify"; // 
import Header1 from "./components/header/Header1";

import Header2 from "./components/header/Header2";
import Header3 from "./components/header/Header3";
import HeaderFinal from "./components/header/HeaderFinal";

import CollectionsList from "./components/main/CollectionsList";
import ImageSlider from "./components/hero/ImageSlider";
import ImageMove from "./components/hero/ImageMove";
import ImageMove0 from "./components/hero/ImageMove0";


import ImageMove2 from "./components/hero/ImageMove2";
import ImageMove3 from "./components/hero/ImageMove3";
import LoginPage from "./pages/LoginPage";
import ScrollToTop from "./components/main/ScrollToTop";
import ProductDetails from "./components/main/ProductDetails";
import CartComponent from "./pages/CartComponent";
import Howare from "./components/main/Howare";
import Callme from "./components/main/Callme";
import { imagess } from "./data"; 
import { CollectionProducts } from "./components/main/CollectionProducts";
import image1 from "./assets/images/image1.png";
import image4 from "./assets/images/image4.jpg";
import image5 from "./assets/images/image5.jpg";


import AsnafMotanwe from "./components/hero/AsnafMotanwe";

import Apalik from "./components/hero/Apalik";
import Espotat from "./components/hero/Espotat";



const Header = () => {
  return (
    <>
      <Header1 />
      <Header2 />
      <Header3 />
    </>
  );
};


const images = [
  { src: image1, alt: "Image 1" },
  { src: image4, alt: "Image 4" },
  { src: image5, alt: "Image 5" },
 
];

function App() {
  const [theme, colorMode] = useMode();
  const [companies, setCompanies] = useState([]);

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
      }
    };

    fetchCompanies();
  }, []);

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartComponent />} />
            <Route path="/howare" element={<Howare />} />
            <Route path="/callme" element={<Callme />} />
            <Route path="/search" element={<SearchResults />} />
            <Route
              path="/"
              element={
                <>
                  <ImageSlider images={images} interval={3000} />
                  <ImageMove0 company={companies} interval={5000} />

                  <ImageMove imagess={imagess} interval={6000} />
                  <ImageMove2 imagess={imagess} interval={6000} />

                  <Espotat collectionHandle="الاسبوتات-بأشكالها-المختلفه" />
                  <AsnafMotanwe collectionHandle="اصناف-متنوعه" />
                  <Apalik collectionHandle=" الاباليك-بأشكالها-المختلفه " />
                  <ImageMove3 company={companies} interval={5000} />
                  <HeaderFinal />
                </>
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




