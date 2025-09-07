
import React from 'react';
import Card from '../common/Card';

const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-textPrimary">Pengaturan</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left navigation */}
        <div className="md:col-span-1">
          <Card className="p-0">
            <nav className="flex flex-col">
              <a href="#" className="p-4 font-semibold text-primary border-l-4 border-primary bg-blue-50">Informasi Toko</a>
              <a href="#" className="p-4 font-semibold text-textSecondary hover:bg-gray-50 border-l-4 border-transparent">Manajemen User</a>
              <a href="#" className="p-4 font-semibold text-textSecondary hover:bg-gray-50 border-l-4 border-transparent">Pengaturan Struk</a>
              <a href="#" className="p-4 font-semibold text-textSecondary hover:bg-gray-50 border-l-4 border-transparent">Database</a>
              <a href="#" className="p-4 font-semibold text-textSecondary hover:bg-gray-50 border-l-4 border-transparent">Lisensi</a>
            </nav>
          </Card>
        </div>
        
        {/* Right content */}
        <div className="md:col-span-2">
          <Card>
            <h3 className="text-xl font-bold text-textPrimary mb-6">Informasi Toko</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textSecondary">Nama Toko</label>
                <input type="text" defaultValue="AL ANSHOR PRICE" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-textSecondary">Alamat</label>
                <textarea rows={3} defaultValue="Jl. Raya Sejahtera No. 123, Jakarta" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-textSecondary">Nomor Telepon</label>
                <input type="text" defaultValue="0812-3456-7890" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
              </div>
              <div className="pt-4">
                <button type="submit" className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
