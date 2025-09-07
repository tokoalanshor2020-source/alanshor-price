export type Page = 'dashboard' | 'pos' | 'inventory' | 'reports' | 'customers' | 'settings';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  barcode: string;
}

export interface CartItem extends Product {
  quantity: number;
  discount: number; // as a percentage
}

export interface SalesData {
  name: string;
  sales: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  memberSince: string;
  totalSpent: number;
}

export interface User {
  id: string;
  name: string;
  username: string;
  role: 'Admin' | 'Kasir';
  status: 'Aktif' | 'Tidak Aktif';
}
