import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../constants';
import Card from '../common/Card';
import { SearchIcon } from '../Icons';
import { Product } from '../../types';
import Modal from '../common/Modal';

const InventoryView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
      name: '',
      barcode: '',
      category: '',
      price: 0,
      stock: 0,
      imageUrl: '',
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
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
    setNewProduct(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' ? Number(value) : value }));
  };

  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.barcode || !newProduct.category || newProduct.price <= 0) {
      alert('Please fill all required fields correctly.');
      return;
    }
    const productToAdd: Product = {
      id: `prod-${Date.now()}`,
      ...newProduct,
      imageUrl: newProduct.imageUrl || `https://picsum.photos/seed/${newProduct.name}/100`,
    };
    setProducts(prevProducts => [productToAdd, ...prevProducts]);
    setIsAddModalOpen(false);
    setNewProduct({ name: '', barcode: '', category: '', price: 0, stock: 0, imageUrl: '' });
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProduct) return;
    const { name, value } = e.target;
    setEditingProduct(prev => prev ? { ...prev, [name]: name === 'price' || name === 'stock' ? Number(value) : value } : null);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-textPrimary">Manajemen Inventaris</h2>
        <button onClick={() => setIsAddModalOpen(true)} className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">
          Tambah Produk Baru
        </button>
      </div>
      
      <Card>
        <div className="flex justify-between mb-4">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <div>
            <button className="bg-gray-200 text-textPrimary font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors mr-2">
              Import
            </button>
            <button className="bg-gray-200 text-textPrimary font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
              Export
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 font-semibold text-textSecondary">Produk</th>
                <th className="p-3 font-semibold text-textSecondary">Barcode</th>
                <th className="p-3 font-semibold text-textSecondary">Kategori</th>
                <th className="p-3 font-semibold text-textSecondary text-right">Harga Jual</th>
                <th className="p-3 font-semibold text-textSecondary text-right">Stok</th>
                <th className="p-3 font-semibold text-textSecondary text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 flex items-center">
                    <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-md object-cover mr-4" />
                    <span className="font-medium text-textPrimary">{product.name}</span>
                  </td>
                  <td className="p-3 text-textSecondary">{product.barcode}</td>
                  <td className="p-3 text-textSecondary">{product.category}</td>
                  <td className="p-3 text-textPrimary font-semibold text-right">{formatCurrency(product.price)}</td>
                  <td className={`p-3 font-bold text-right ${product.stock < 10 ? 'text-red-500' : product.stock < 20 ? 'text-yellow-500' : 'text-textPrimary'}`}>
                    {product.stock}
                  </td>
                  <td className="p-3 text-center">
                    <button onClick={() => handleOpenEditModal(product)} className="text-primary-light hover:underline font-semibold">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Add Product Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Tambah Produk Baru">
        <form onSubmit={handleAddNewProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textSecondary">Nama Produk</label>
            <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textSecondary">Barcode</label>
              <input type="text" name="barcode" value={newProduct.barcode} onChange={handleInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-textSecondary">Kategori</label>
              <input type="text" name="category" value={newProduct.category} onChange={handleInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textSecondary">Harga Jual</label>
              <input type="number" name="price" value={newProduct.price || ''} onChange={handleInputChange} required min="0" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-textSecondary">Stok Awal</label>
              <input type="number" name="stock" value={newProduct.stock || ''} onChange={handleInputChange} required min="0" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-textSecondary">URL Gambar (Opsional)</label>
            <input type="text" name="imageUrl" value={newProduct.imageUrl} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"/>
          </div>
          <div className="pt-4 flex justify-end space-x-2">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="bg-gray-200 text-textPrimary font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
              Batal
            </button>
            <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">
              Simpan Produk
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      {editingProduct && (
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Produk">
          <form onSubmit={handleUpdateProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textSecondary">Nama Produk</label>
              <input type="text" name="name" value={editingProduct.name} onChange={handleEditInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textSecondary">Barcode</label>
                <input type="text" name="barcode" value={editingProduct.barcode} onChange={handleEditInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-textSecondary">Kategori</label>
                <input type="text" name="category" value={editingProduct.category} onChange={handleEditInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"/>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textSecondary">Harga Jual</label>
                <input type="number" name="price" value={editingProduct.price || ''} onChange={handleEditInputChange} required min="0" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-textSecondary">Stok</label>
                <input type="number" name="stock" value={editingProduct.stock || ''} onChange={handleEditInputChange} required min="0" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"/>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-textSecondary">URL Gambar (Opsional)</label>
              <input type="text" name="imageUrl" value={editingProduct.imageUrl} onChange={handleEditInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"/>
            </div>
            <div className="pt-4 flex justify-end space-x-2">
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-gray-200 text-textPrimary font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                Batal
              </button>
              <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default InventoryView;