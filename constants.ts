
import { Product, SalesData, Customer } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Susu UHT Coklat 1L', category: 'Minuman', price: 18500, stock: 150, imageUrl: 'https://picsum.photos/seed/milk/100', barcode: '899270110201' },
  { id: '2', name: 'Roti Tawar Gandum', category: 'Roti', price: 15000, stock: 80, imageUrl: 'https://picsum.photos/seed/bread/100', barcode: '899270110202' },
  { id: '3', name: 'Minyak Goreng 2L', category: 'Bahan Pokok', price: 38000, stock: 200, imageUrl: 'https://picsum.photos/seed/oil/100', barcode: '899270110203' },
  { id: '4', name: 'Telur Ayam (per kg)', category: 'Bahan Pokok', price: 25000, stock: 50, imageUrl: 'https://picsum.photos/seed/eggs/100', barcode: '899270110204' },
  { id: '5', name: 'Sabun Mandi Cair', category: 'Perawatan Diri', price: 22000, stock: 120, imageUrl: 'https://picsum.photos/seed/soap/100', barcode: '899270110205' },
  { id: '6', name: 'Shampoo Anti Ketombe', category: 'Perawatan Diri', price: 31000, stock: 95, imageUrl: 'https://picsum.photos/seed/shampoo/100', barcode: '899270110206' },
  { id: '7', name: 'Mie Instan Goreng', category: 'Makanan Instan', price: 3000, stock: 500, imageUrl: 'https://picsum.photos/seed/noodles/100', barcode: '899270110207' },
  { id: '8', name: 'Kopi Bubuk 250g', category: 'Minuman', price: 23500, stock: 70, imageUrl: 'https://picsum.photos/seed/coffee/100', barcode: '899270110208' },
  { id: '9', name: 'Deterjen Bubuk 1kg', category: 'Kebersihan', price: 29000, stock: 110, imageUrl: 'https://picsum.photos/seed/detergent/100', barcode: '899270110209' },
  { id: '10', name: 'Beras Premium 5kg', category: 'Bahan Pokok', price: 68000, stock: 180, imageUrl: 'https://picsum.photos/seed/rice/100', barcode: '899270110210' },
  { id: '11', name: 'Gula Pasir 1kg', category: 'Bahan Pokok', price: 14000, stock: 300, imageUrl: 'https://picsum.photos/seed/sugar/100', barcode: '899270110211' },
  { id: '12', name: 'Teh Celup Kotak', category: 'Minuman', price: 9500, stock: 250, imageUrl: 'https://picsum.photos/seed/tea/100', barcode: '899270110212' },
];


export const SALES_DATA: SalesData[] = [
    { name: 'Senin', sales: 4000000 },
    { name: 'Selasa', sales: 3000000 },
    { name: 'Rabu', sales: 5000000 },
    { name: 'Kamis', sales: 4500000 },
    { name: 'Jumat', sales: 7000000 },
    { name: 'Sabtu', sales: 8500000 },
    { name: 'Minggu', sales: 9000000 },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Budi Santoso', phone: '081234567890', email: 'budi.s@example.com', memberSince: '2023-01-15', totalSpent: 1575000 },
  { id: 'c2', name: 'Citra Lestari', phone: '081345678901', email: 'citra.l@example.com', memberSince: '2023-02-20', totalSpent: 2250000 },
  { id: 'c3', name: 'Adi Nugroho', phone: '081456789012', email: 'adi.n@example.com', memberSince: '2023-03-10', totalSpent: 850000 },
  { id: 'c4', name: 'Dewi Anggraini', phone: '081567890123', email: 'dewi.a@example.com', memberSince: '2023-04-05', totalSpent: 3120000 },
  { id: 'c5', name: 'Eko Prasetyo', phone: '081678901234', email: 'eko.p@example.com', memberSince: '2023-05-18', totalSpent: 980000 },
  { id: 'c6', name: 'Fitriani', phone: '081789012345', email: 'fitriani@example.com', memberSince: '2023-06-22', totalSpent: 1750000 },
  { id: 'c7', name: 'Gatot Subroto', phone: '081890123456', email: 'gatot.s@example.com', memberSince: '2023-07-30', totalSpent: 450000 },
  { id: 'c8', name: 'Hesti Purwanti', phone: '081901234567', email: 'hesti.p@example.com', memberSince: '2023-08-11', totalSpent: 2890000 },
  { id: 'c9', name: 'Indra Gunawan', phone: '082123456789', email: 'indra.g@example.com', memberSince: '2023-09-02', totalSpent: 1100000 },
  { id: 'c10', name: 'Joko Widodo', phone: '082234567890', email: 'joko.w@example.com', memberSince: '2023-10-25', totalSpent: 5300000 },
];
