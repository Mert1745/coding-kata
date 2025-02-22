
export interface ProductDTO {
  id: number;
  name: string;
  prices: PriceDTO[];
}

export interface PriceDTO {
  id: number;
  quantity: number;
  amount: number;
}

export interface Checkout {
    price: number,
    carts: CartDTO[];
}

export interface CartDTO {
    quantity: number;
    product: ProductDTO;
}
