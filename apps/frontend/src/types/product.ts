export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description?: string;
  sizes: string[];
  colors: string[];
  gender: string;
}

export interface CartItem extends Product {
  cartQuantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
