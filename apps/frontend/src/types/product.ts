export interface Product {
  id: string;
  sku: string;
  title: string;
  price: number;
  oldPrice?: number;
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
