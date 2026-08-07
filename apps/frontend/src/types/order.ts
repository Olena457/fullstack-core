export interface OrderItemType {
  id: string;
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  product: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
  };
}

export interface Order {
  id: string;
  status: string;
  createdAt: string;
  totalPrice: number;
  items: OrderItemType[];
}
