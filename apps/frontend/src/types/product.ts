export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description?: string;
  sizes: string[];
  colors: string[];
}
