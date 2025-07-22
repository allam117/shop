import ImageSlider from "../components/hero/ImageSlider";
import ImageMove from "../components/hero/ImageMove";
import ImageMove0 from "../components/hero/ImageMove0";
import ImageMove2 from "../components/hero/ImageMove2";
import ImageMove3 from "../components/hero/ImageMove3";
import Espotat from "../components/hero/Espotat";
import AsnafMotanwe from "../components/hero/AsnafMotanwe";
import Apalik from "../components/hero/Apalik";
import HeaderFinal from "../components/header/HeaderFinal";

const HomePage = ({ images, imagess, companies }) => {
  return (
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
  );
};

export default HomePage;
