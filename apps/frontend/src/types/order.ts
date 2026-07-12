export interface OrderItemType {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  status: string;
  createdAt: string;
  totalPrice: number;
  items: OrderItemType[];
}
