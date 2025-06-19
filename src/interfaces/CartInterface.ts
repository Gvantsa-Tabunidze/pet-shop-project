// interfaces/CartInterface.ts
export interface CartItemInterface {
  id: number;
  name: string;
  img: string;
  priceGEL: number;
  priceConverted?: number;
  quantity: number;
  stock: number;
}

export interface CartState {
  items: CartItemInterface[];
  showSuccessMessage: boolean;
}
