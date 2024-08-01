export interface ProductReview {
  aggregate: Aggregate;
  data?: (DataEntity)[] | null;
  pagination: Pagination;
}
export interface Aggregate {
  counts?: (CountsEntity)[] | null;
  rating: number;
  total: number;
}
export interface CountsEntity {
  count: number;
  rating: number;
}
export interface DataEntity {
  rating: number;
  content?: string | null;
  created_at: string;
  user: User;
}
export interface User {
  name: string;
  user_id: string;
  avatar_url?: string | null;
}
export interface Pagination {
  has_more: boolean;
  page: number;
  per_page: number;
  total: number;
}
