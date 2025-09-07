import React, { useState } from 'react';
import Card from '../common/Card';
import { User } from '../../types';
import { MOCK_USERS } from '../../constants';
import Modal from '../common/Modal';
import { PlusIcon } from '../Icons';

type SettingsTab = 'info' | 'users' | 'receipt' | 'database' | 'license';

const InfoToko: React.FC = () => {
  const [storeInfo, setStoreInfo] = useState({
    name: 'Toko Al Anshor',
    address: 'Jl. Raya Sejahtera No. 123, Jakarta',
    phone: '0812-3456-7890',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save this data to a backend.
    console.log('Saving store info:', storeInfo);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000); // Hide message after 3 seconds
  };
    
  return (
    <Card>
      <h3 className="text-xl font-bold text-textPrimary mb-6">Informasi Toko</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-textSecondary">Nama Toko</label>
          <input 
            type="text" 
            name="name"
            value={storeInfo.name} 
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-textSecondary">Alamat</label>
          <textarea 
            rows={3}
            name="address"
            value={storeInfo.address}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-textSecondary">Nomor Telepon</label>
          <input 
            type="text" 
            name="phone"
            value={storeInfo.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"
          />
        </div>
        <div className="pt-4">
          <button type="submit" className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors">
            Simpan Perubahan
          </button>
          {showSuccess && <p className="text-green-600 text-sm mt-2">Perubahan berhasil disimpan!</p>}
        </div>
      </form>
    </Card>
  );
};

const ManajemenUser: React.FC = () => {
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        username: '',
        password: '',
        role: 'Kasir' as 'Admin' | 'Kasir',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUser(prev => ({...prev, [name]: value }));
    };

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newUser.name || !newUser.username || !newUser.password) {
            alert('Semua field wajib diisi.');
            return;
        }
        const userToAdd: User = {
            id: `user-${Date.now()}`,
            name: newUser.name,
            username: newUser.username,
            role: newUser.role,
            status: 'Aktif',
        };
        setUsers(prev => [userToAdd, ...prev]);
        setIsAddModalOpen(false);
        setNewUser({ name: '', username: '', password: '', role: 'Kasir'});
    };


    return (
    <Card>
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-textPrimary">Manajemen User</h3>
            <button onClick={() => setIsAddModalOpen(true)} className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center">
                <PlusIcon className="w-5 h-5 mr-2" />
                Tambah User Baru
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 font-semibold text-textSecondary">Nama Lengkap</th>
                        <th className="p-3 font-semibold text-textSecondary">Username</th>
                        <th className="p-3 font-semibold text-textSecondary">Peran</th>
                        <th className="p-3 font-semibold text-textSecondary">Status</th>
                        <th className="p-3 font-semibold text-textSecondary text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium text-textPrimary">{user.name}</td>
                            <td className="p-3 text-textSecondary">{user.username}</td>
                            <td className="p-3">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="p-3">
                                <span className={`font-medium ${user.status === 'Aktif' ? 'text-accent' : 'text-red-500'}`}>
                                    {user.status}
                                </span>
                            </td>
                            <td className="p-3 text-center space-x-2">
                                <button className="text-primary-light hover:underline font-semibold">Edit</button>
                                <button className="text-red-500 hover:underline font-semibold">Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Tambah User Baru">
            <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-textSecondary">Nama Lengkap</label>
                    <input type="text" name="name" value={newUser.name} onChange={handleInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-textSecondary">Username</label>
                    <input type="text" name="username" value={newUser.username} onChange={handleInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-textSecondary">Password</label>
                    <input type="password" name="password" value={newUser.password} onChange={handleInputChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-textSecondary">Peran</label>
                    <select name="role" value={newUser.role} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                        <option value="Kasir">Kasir</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <div className="pt-4 flex justify-end space-x-2">
                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="bg-gray-200 text-textPrimary font-bold py-2 px-4 rounded-lg hover:bg-gray-300">Batal</button>
                    <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark">Simpan User</button>
                </div>
            </form>
        </Modal>
    </Card>
    );
};

const Toggle: React.FC<{ label: string; enabled: boolean; onChange: () => void }> = ({ label, enabled, onChange }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-textPrimary">{label}</span>
      <button
        type="button"
        onClick={onChange}
        className={`${
          enabled ? 'bg-primary' : 'bg-gray-200'
        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light`}
      >
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
      </button>
    </div>
);

const PengaturanStruk: React.FC = () => {
    const [settings, setSettings] = useState({
        showLogo: true,
        showAddress: true,
        showPhone: true,
        headerText: 'TERIMA KASIH TELAH BERBELANJA',
        footerText: 'Barang yang sudah dibeli tidak dapat dikembalikan.',
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleChange = (name: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [name]: !prev[name] }));
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Saving receipt settings:", settings);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <Card>
            <h3 className="text-xl font-bold text-textPrimary mb-6">Pengaturan Struk</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Settings Form */}
                <form className="space-y-6" onSubmit={handleSave}>
                    <div className="space-y-4">
                        <Toggle label="Tampilkan Logo Toko" enabled={settings.showLogo} onChange={() => handleToggleChange('showLogo')} />
                        <Toggle label="Tampilkan Alamat" enabled={settings.showAddress} onChange={() => handleToggleChange('showAddress')} />
                        <Toggle label="Tampilkan No. Telepon" enabled={settings.showPhone} onChange={() => handleToggleChange('showPhone')} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-textSecondary">Teks Header Struk</label>
                        <input
                            type="text"
                            name="headerText"
                            value={settings.headerText}
                            onChange={handleSettingChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-textSecondary">Teks Footer Struk (Info/Promo)</label>
                        <textarea
                            rows={3}
                            name="footerText"
                            value={settings.footerText}
                            onChange={handleSettingChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        ></textarea>
                    </div>
                    <div className="pt-4">
                        <button type="submit" className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors">
                            Simpan Pengaturan
                        </button>
                        {showSuccess && <p className="text-green-600 text-sm mt-2">Pengaturan struk berhasil disimpan!</p>}
                    </div>
                </form>

                {/* Receipt Preview */}
                <div>
                    <h4 className="font-semibold text-textPrimary mb-2 text-center">Pratinjau Struk</h4>
                    <div className="bg-gray-50 p-4 border-dashed border-2 border-gray-300 font-mono text-xs max-w-xs mx-auto">
                        <div className="text-center space-y-1">
                            {settings.showLogo && <div className="text-lg font-bold">AL ANSHOR</div>}
                            <p className="font-semibold">Toko Al Anshor</p>
                            {settings.showAddress && <p>Jl. Raya Sejahtera No. 123, Jakarta</p>}
                            {settings.showPhone && <p>0812-3456-7890</p>}
                        </div>
                        <hr className="my-2 border-dashed" />
                        <div>
                            <p>Kasir: Admin</p>
                            <p>Tanggal: {new Date().toLocaleDateString('id-ID')}</p>
                            <p>No: #TX12345</p>
                        </div>
                        <hr className="my-2 border-dashed" />
                        <div className="space-y-1">
                            <div className="flex justify-between"><span>Susu UHT 1L</span><span>18,500</span></div>
                            <div className="ml-2"><span>1 x 18,500</span></div>
                            <div className="flex justify-between"><span>Roti Tawar</span><span>15,000</span></div>
                            <div className="ml-2"><span>1 x 15,000</span></div>
                        </div>
                        <hr className="my-2 border-dashed" />
                        <div className="space-y-1 font-semibold">
                            <div className="flex justify-between"><span>Subtotal</span><span>33,500</span></div>
                            <div className="flex justify-between"><span>Pajak 11%</span><span>3,685</span></div>
                            <div className="flex justify-between"><span>TOTAL</span><span>37,185</span></div>
                        </div>
                        <hr className="my-2 border-dashed" />
                        <div className="text-center space-y-1">
                            <p>{settings.headerText}</p>
                            <p>{settings.footerText}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};


const Database: React.FC = () => (
    <Card>
        <h3 className="text-xl font-bold text-textPrimary mb-6">Database</h3>
        <p className="text-textSecondary mb-4">Kelola database Anda. Lakukan backup secara berkala untuk keamanan.</p>
        <div className="flex space-x-2">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50" disabled>
                Backup Database
            </button>
            <button className="bg-gray-200 text-textPrimary font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50" disabled>
                Restore Database
            </button>
        </div>
    </Card>
);

const Lisensi: React.FC = () => (
    <Card>
        <h3 className="text-xl font-bold text-textPrimary mb-6">Lisensi Perangkat Lunak</h3>
        <div className="space-y-2">
            <p><span className="font-semibold text-textSecondary">Status:</span> <span className="text-green-600 font-bold">Aktif</span></p>
            <p><span className="font-semibold text-textSecondary">Tipe:</span> <span className="font-bold text-primary-dark">Platinum User</span></p>
            <p><span className="font-semibold text-textSecondary">Berlaku hingga:</span> <span className="font-bold">Seumur Hidup</span></p>
        </div>
    </Card>
);


const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('info');
  
  const navItems = [
    { id: 'info', label: 'Informasi Toko' },
    { id: 'users', label: 'Manajemen User' },
    { id: 'receipt', label: 'Pengaturan Struk' },
    { id: 'database', label: 'Database' },
    { id: 'license', label: 'Lisensi' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return <InfoToko />;
      case 'users':
        return <ManajemenUser />;
      case 'receipt':
        return <PengaturanStruk />;
      case 'database':
        return <Database />;
      case 'license':
        return <Lisensi />;
      default:
        return <InfoToko />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-textPrimary">Pengaturan</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Left navigation */}
        <div className="md:col-span-1">
          <Card className="p-0">
            <nav className="flex flex-col">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as SettingsTab)}
                  className={`p-4 font-semibold text-left w-full transition-colors duration-200 ${
                    activeTab === item.id 
                      ? 'text-primary border-l-4 border-primary bg-blue-50' 
                      : 'text-textSecondary hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>
        
        {/* Right content */}
        <div className="md:col-span-2 lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsView;