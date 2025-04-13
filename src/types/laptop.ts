export interface Laptop {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  cpu: string;
  ram: string;
  storage: string;
  display: string;
  gpu: string;
  os: string;
  weight: string;
  battery: string;
  ports: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export interface Review {
  id: string;
  laptopId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
