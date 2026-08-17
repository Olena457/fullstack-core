export interface Review {
  id: number;
  productId?: string | null;
  rating: number;
  userId: string;
  text: string;
  createdAt: string;
  user?: {
    name: string | null;
  };
}
