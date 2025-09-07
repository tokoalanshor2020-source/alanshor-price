
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SALES_DATA } from '../../constants';
import Card from '../common/Card';

const StatCard: React.FC<{ title: string; value: string; change: string; isPositive: boolean }> = ({ title, value, change, isPositive }) => (
  <Card>
    <h3 className="text-textSecondary text-lg">{title}</h3>
    <p className="text-4xl font-bold text-textPrimary my-2">{value}</p>
    <div className="flex items-center text-sm">
      <span className={`font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{change}</span>
      <span className="text-textSecondary ml-2">vs kemarin</span>
    </div>
  </Card>
);

const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-textPrimary">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Penjualan Hari Ini" value="Rp 12.5M" change="+5.2%" isPositive={true} />
        <StatCard title="Total Transaksi" value="482" change="+12" isPositive={true} />
        <StatCard title="Pelanggan Baru" value="15" change="-2" isPositive={false} />
        <StatCard title="Produk Terlaris" value="Susu UHT" change="Mie Instan" isPositive={true} />
      </div>

      <Card className="h-96">
        <h3 className="text-xl font-semibold text-textPrimary mb-4">Grafik Penjualan Mingguan</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={SALES_DATA} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `Rp${Number(value) / 1000000} Jt`} />
            <Tooltip formatter={(value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(value))} />
            <Legend />
            <Bar dataKey="sales" fill="#1E88E5" name="Penjualan" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-xl font-semibold text-textPrimary mb-4">Stok Kritis</h3>
            <ul>
                <li className="flex justify-between py-2 border-b"><span>Minyak Goreng 2L</span> <span className="font-bold text-red-500">5 Pcs</span></li>
                <li className="flex justify-between py-2 border-b"><span>Telur Ayam (kg)</span> <span className="font-bold text-red-500">2 Kg</span></li>
                <li className="flex justify-between py-2"><span>Roti Tawar</span> <span className="font-bold text-yellow-500">12 Pcs</span></li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-textPrimary mb-4">Aktivitas Terkini</h3>
             <ul>
                <li className="py-2 border-b">Transaksi #00128 oleh Kasir A - <span className="text-textSecondary">2 menit lalu</span></li>
                <li className="py-2 border-b">Produk baru ditambahkan: Teh Botol - <span className="text-textSecondary">1 jam lalu</span></li>
                <li className="py-2">Laporan penjualan harian dibuat - <span className="text-textSecondary">3 jam lalu</span></li>
            </ul>
          </Card>
      </div>

    </div>
  );
};

export default DashboardView;
