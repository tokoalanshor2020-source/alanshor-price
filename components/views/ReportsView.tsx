import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';

const salesReportData = [
  { date: '2024-07-01', transactions: 50, revenue: 12500000, profit: 3000000 },
  { date: '2024-07-02', transactions: 45, revenue: 11000000, profit: 2500000 },
  { date: '2024-07-03', transactions: 60, revenue: 15000000, profit: 4000000 },
  { date: '2024-07-04', transactions: 55, revenue: 13500000, profit: 3500000 },
  { date: '2024-07-05', transactions: 70, revenue: 18000000, profit: 5000000 },
  { date: '2024-07-06', transactions: 80, revenue: 21000000, profit: 6500000 },
  { date: '2024-07-07', transactions: 85, revenue: 22500000, profit: 7000000 },
];

const ReportsView: React.FC = () => {
  const [reportType, setReportType] = useState('Laporan Penjualan Harian');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [displayData, setDisplayData] = useState(salesReportData);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleShowReport = () => {
    if (reportType === 'Laporan Penjualan Harian') {
      const filteredData = salesReportData.filter(item => item.date === selectedDate);
      setDisplayData(filteredData);
    } else {
      // Logic for other report types can be added here
      // For now, we show all data for other types
      setDisplayData(salesReportData);
    }
  };
    
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-textPrimary">Laporan Penjualan & Keuangan</h2>
      
      <div className="flex items-center space-x-4">
        <div>
          <label htmlFor="report-type" className="block text-sm font-medium text-gray-700">Jenis Laporan</label>
          <select 
            id="report-type" 
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-light focus:border-primary-light sm:text-sm rounded-md"
          >
            <option>Laporan Penjualan Harian</option>
            <option>Laporan Laba Rugi</option>
            <option>Laporan Stok</option>
            <option>Laporan Hutang/Piutang</option>
          </select>
        </div>
        <div>
          <label htmlFor="date-range" className="block text-sm font-medium text-gray-700">Rentang Tanggal</label>
          <input 
            type="date" 
            id="date-range" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-light focus:border-primary-light sm:text-sm rounded-md"
          />
        </div>
        <button 
          onClick={handleShowReport}
          className="self-end bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Tampilkan
        </button>
      </div>
      
      <Card className="h-96">
        <h3 className="text-xl font-semibold text-textPrimary mb-4">Analisis Pendapatan vs Laba</h3>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={displayData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => `Rp${Number(value) / 1000000} Jt`} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))}/>
            <Legend />
            <Line type="monotone" dataKey="revenue" name="Pendapatan" stroke="#1E88E5" strokeWidth={2} />
            <Line type="monotone" dataKey="profit" name="Laba" stroke="#4CAF50" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-textPrimary mb-4">Detail Laporan Penjualan</h3>
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Tanggal</th>
              <th className="p-3">Total Transaksi</th>
              <th className="p-3 text-right">Pendapatan</th>
              <th className="p-3 text-right">Laba</th>
            </tr>
          </thead>
          <tbody>
            {displayData.length > 0 ? (
              displayData.map(row => (
                <tr key={row.date} className="border-b">
                  <td className="p-3">{row.date}</td>
                  <td className="p-3">{row.transactions}</td>
                  <td className="p-3 text-right">{formatCurrency(row.revenue)}</td>
                  <td className="p-3 text-right font-semibold text-green-600">{formatCurrency(row.profit)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-textSecondary">
                  Tidak ada data untuk tanggal yang dipilih.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ReportsView;