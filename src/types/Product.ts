export type Product = {
  id: number | string;
  brand: string;
  name: string;
  price: number;     
  salePrice?: number;
  image?: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
};

export type CartItem = Product & {
  selectedColor: string;
  selectedSize: string;
  quantity: number;
};

export type ProductCardData = {
  id: string | number;
  brand: string;
  name: string;
  price: number;
  salePrice?: number;
  image?: string;
};