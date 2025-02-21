
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

export interface Cart {
    quantity: number;
    product: ProductDTO;
}
