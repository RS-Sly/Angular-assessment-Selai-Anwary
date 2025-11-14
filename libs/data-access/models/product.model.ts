export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isFavorite?: boolean;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}