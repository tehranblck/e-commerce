export interface BasketItem {
  product: number;
  quantity: number;
  product_token: string;
}

interface BasketItemsResponse {
  items: BasketItem[];
}

const response: BasketItemsResponse = {
  items: [
    {
      product: 1,
      quantity: 1,
      product_token: "567535724",
    },
  ],
};
