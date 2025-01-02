import image from "../assets/images/image1.png";
import { sleep } from "../utils/sleep";

const product = {
  id: 4051,
  name: "لمبه-200-وات-شفاف-قلاووظ-صينى-ايفو",
  category: "لمبات عاديه اشكال ومقاسات مختلفه",
  price: 120,
  image,
  description: "لمبه-200-وات-شفاف-قلاووظ-صينى-ايفو",
};

export const listAllProducts = async () => {
  await sleep(1000);

  return Array.from(new Array(5)).map((_, index) => ({
    ...product,
    id: product.id + index,
    price: product.price * (index + 1),
  }));
};

export const listCategoryProducts = async (categoryId) => {
  return []; // all product inside "categoryId"
};

export const getProductById = async (id) => {
  await sleep(5000);
  return product;
};
