export interface Product {
  id: string
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  //todo type: Type;
  gender: Category
}

export interface CartProduct {
  id: string;
  title: string;
  quantity: number;
  size: Size;
  price: number;
  slug: string;
  image: string;
}

export interface OrderSummary {
  subtotal: number;
  taxes: number;
  total: number;
  totalItems: number;
}

export interface ProductImage { 
  id: number;
  url: string;
  productId?: string;
}

type Category = 'men' | 'women' | 'kid' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats';