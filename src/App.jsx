import Header1 from "./components/header/header1";
import Header2 from "./components/header/Header2";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainComponent from "./components/main/MainComponent";
import Header3 from "./components/header/Header3";
import ImageSlider from "./components/hero/ImageSlider";
import ImageMove from "./components/hero/ImageMove";
import ImageMove2 from "./components/hero/ImageMove2";
import ImageMove3 from "./components/hero/ImageMove3";
import LoginPage from "./pages/LoginPage";

import image1 from "./assets/images/image1.png";
// import image2 from "./assets/images/image2.png";
// import image3 from "./assets/images/image3.png";
import image4 from "./assets/images/image4.jpg";
import image5 from "./assets/images/image5.jpg";
// import image6 from "./assets/images/image6.jpg";
import image7 from "./assets/images/image7.jpg";
import image8 from "./assets/images/image8.jpg";
import image9 from "./assets/images/image9.jpg";
import image10 from "./assets/images/image10.jpg";
import image11 from "./assets/images/image11.jpg";
import image12 from "./assets/images/image12.jpg";
import image13 from "./assets/images/image13.jpg";
import image14 from "./assets/images/image14.jpg";
import image15 from "./assets/images/image15.jpg";
import image16 from "./assets/images/image16.jpg";
import image17 from "./assets/images/image17.jpg";
import ScrollToTop from "./components/main/ScrollToTop";
import ProductDetails from "./components/main/ProductDetails";
import CartComponent from "./pages/CartComponent";

// import image18 from "./assets/images/image18.jpg";
// import image19 from "./assets/images/image19.jpg";
// import image20 from "./assets/images/image20.jpg";

// import image11 from "./assets/images/image11.jpg";

const imagess = [
  // { src: image6, alt: "Image 6" },
  {
    src: image7,
    alt: "Image 7",
    name: "وصف للصورة 7",
    price: "12.00$",
    description: "loremsmdklf,mceldc,med.,/cmelkmd/c,.eldejkd",
  },
  {
    src: image8,
    alt: "Image 8",
    name: "وصف للصورة 8",
    price: "10$",
    description: "loremsmdklf,mceldc,med.hjhrdfclkjfkewdlkfld;",
  },
  {
    src: image9,
    alt: "Image 9",
    name: "وصف للصورة 9",
    price: "12.00$",
    description: "loremsmdklf,mceldc,med.,/cmelkmd/c,.eld",
  },
  {
    src: image10,
    alt: "Image 10",
    name: "وصف للصورة 10",
    price: "10.11$",
    description: "loremsmdklf,mceldc,med.,/cmelkmd/c,.eld",
  },
  {
    src: image11,
    alt: "Image 11",
    name: "وصف للصورة 11",
    price: "77.5$",
    description: "loremsmdklf,mceldc,med.,/cmelkmd/c,.eld",
  },
  {
    src: image12,
    alt: "Image 12",
    name: "وصف للصورة 12",
    price: "62.3$",
    description: "loremsmdklf,mceldc,med.,/cmelkmd/c,.eld",
  },
  {
    src: image13,
    alt: "Image 13",
    name: "وصف للصورة 13",
    price: "19.37$",
    description: "loremsmdklf,mceldc,med.,/cmelkmd/c,.eld",
  },
  {
    src: image14,
    alt: "Image 14",
    name: "وصف للصورة 14",
    price: "60.5$",
    description: "loremsmdklf,mceldc,med.,/cmelkmd/c,.eld",
  },
  {
    src: image15,
    alt: "Image 15",
    name: "وصف للصورة 15",
    price: "66.3$",
    description: "loremsmdklf,mceldc,med.,/cmelkmd/c,.eld",
  },
  {
    src: image16,
    alt: "Image 16",
    name: "وصف للصورة 16",
    price: "12.37$",
    description: "loremsmdklf,mceldc,med.,/cmelkmd/c,.eld",
  },
  {
    src: image17,
    alt: "Image 17",
    name: "وصف للصورة 17",
    price: "56$",
    description: "loremsmdklf,mceldc,med.,/cmelkmd/c,.eld",
  },
  // { src: image18, alt: "Image 18" },
  // { src: image19, alt: "Image 19" },
  // { src: image20, alt: "Image 20" },
];

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

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartComponent/>} />
            <Route
              path="/"
              element={
                <>
                  <ImageSlider images={images} interval={3000} />
                  <ImageMove imagess={imagess} interval={5000} />
                  <ImageMove2 imagess={imagess} interval={5000} />
                  <ImageMove3 imagess={imagess} interval={5000} />
                  {/* <MainComponent imagess={imagess} interval={5000} /> */}
                </>
              }
            />

            <Route path="/categories">
              <Route
                index
                element={
                  <MainComponent
                    imagess={imagess}
                    interval={5000}
                    transitionDuration={800}
                  />
                }
              />
              <Route path=":categoryId" element={<></>} />
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
