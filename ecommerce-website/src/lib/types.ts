
export interface InventoryEntity {
  product_id: string;
  sku: string;
  color: string;
  size: string | number | null;
  list_price: number;
  discount: number | null;
  discount_percentage: number | null;
  sale_price: number;
  sold: number;
  stock: number;
}


export interface Category {
  category_id: string;
  name: string;
  created_at: string;
}

export interface Collection {
  collection_id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
}

export interface Coupon {
  coupon_code: string;
  discount_amount?: number | null;
  discount_percentage?: number | null;
}

export interface ProductInfo {
  product_id: string;
  title: string;
  description?: (string)[] | null;
}

export interface ProductImage {
  product_id: string;
  color: string;
  image_url: string;
}


export interface Cart {
  cart_id: string;
  items?: (ItemsEntity)[] | null;
  summary: Summary;
}

export interface ItemsEntity {
  product: Product;
  unit: Unit;
  total_list_price: number;
  total_sale_price: number;
  quantity: number;
  created_at: string;
}

export interface Unit {
  sku: string;
  list_price: number;
  sale_price: number;
  size?: string | null;
  color: string;
  image_url: string;
}

export interface Summary {
  subtotal: number;
  discount: number;
  discount_code?: null;
  shipping: number;
  total: number;
}

export interface Product {
  product_id: string;
  name: string;
  description?: string;
  category?: string;
  collection?: string;
  created_at?: string;
}


export interface ProductDetail {
  product_id: string;
  name: string;
  description: string;
  category: Category;
  collection: Collection;
  created_at: string;
  colors?: (string)[] | null;
  images?: (ImagesEntity)[] | null;
  info?: (InfoEntity)[] | null;
  inventory?: (InventoryEntity)[] | null;
  priceRange: PriceRange;
  rating: number;
  reviews: number;
  sizes?: (string)[] | null;
  sold: number;
}
export interface Category {
  category_id: string;
  name: string;
  created_at: string;
}
export interface Collection {
  collection_id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
}
export interface ImagesEntity {
  color: string;
  image_url: string;
}
export interface InfoEntity {
  title: string;
  description?: (string)[] | null;
}

export interface PriceRange {
  highest: number;
  lowest: number;
}
