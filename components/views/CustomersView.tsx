
import React, { useState } from 'react';
import { MOCK_CUSTOMERS } from '../../constants';
import Card from '../common/Card';
import { SearchIcon, PlusIcon } from '../Icons';
import { Customer } from '../../types';
import Modal from '../common/Modal';

const CustomersView: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
      name: '',
      phone: '',
      email: '',
  });

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNewCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.phone) {
      alert('Nama dan nomor telepon wajib diisi.');
      return;
    }
    const customerToAdd: Customer = {
      id: `cust-${Date.now()}`,
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email,
      memberSince: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      totalSpent: 0,
    };
    setCustomers(prevCustomers => [customerToAdd, ...prevCustomers]);
    setIsAddModalOpen(false);
    setNewCustomer({ name: '', phone: '', email: '' });
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-textPrimary">Manajemen Pelanggan</h2>
        <button onClick={() => setIsAddModalOpen(true)} className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center">
          <PlusIcon className="w-5 h-5 mr-2" />
          Tambah Pelanggan Baru
        </button>
      </div>
      
      <Card>
        <div className="flex justify-between mb-4">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Cari pelanggan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 font-semibold text-textSecondary">Nama Pelanggan</th>
                <th className="p-3 font-semibold text-textSecondary">Kontak</th>
                <th className="p-3 font-semibold text-textSecondary">Member Sejak</th>
                <th className="p-3 font-semibold text-textSecondary text-right">Total Belanja</th>
                <th className="p-3 font-semibold text-textSecondary text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium text-textPrimary">{customer.name}</td>
                  <td className="p-3 text-textSecondary">
                    <div>{customer.phone}</div>
                    <div className="text-xs">{customer.email}</div>
                  </td>
                  <td className="p-3 text-textSecondary">{customer.memberSince}</td>
                  <td className="p-3 text-textPrimary font-semibold text-right">{formatCurrency(customer.totalSpent)}</td>
                  <td className="p-3 text-center">
                    <button className="text-primary-light hover:underline font-semibold">Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Tambah Pelanggan Baru">
        <form onSubmit={handleAddNewCustomer} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textSecondary">Nama Lengkap</label>
            <input type="text" name="name" value={newCustomer.name} onChange={handleInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-textSecondary">Nomor Telepon</label>
            <input type="tel" name="phone" value={newCustomer.phone} onChange={handleInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-textSecondary">Email (Opsional)</label>
            <input type="email" name="email" value={newCustomer.email} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"/>
          </div>
          <div className="pt-4 flex justify-end space-x-2">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="bg-gray-200 text-textPrimary font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
              Batal
            </button>
            <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">
              Simpan Pelanggan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CustomersView;
