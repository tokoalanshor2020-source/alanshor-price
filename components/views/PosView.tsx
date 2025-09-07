import React, { useState, useMemo } from 'react';
import { Product, CartItem } from '../../types';
import { MOCK_PRODUCTS } from '../../constants';
import { SearchIcon, TrashIcon, PlusIcon, MinusIcon, CashIcon, CreditCardIcon, WalletIcon, CheckCircleIcon } from '../Icons';
import Modal from '../common/Modal';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void }> = ({ product, onAddToCart }) => (
  <div
    onClick={() => onAddToCart(product)}
    className="bg-white border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:shadow-lg hover:border-primary-light transition-all duration-200"
  >
    <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-md mb-2" />
    <p className="text-sm font-semibold text-center text-textPrimary">{product.name}</p>
    <p className="text-sm font-bold text-primary">{formatCurrency(product.price)}</p>
  </div>
);

const CartListItem: React.FC<{ item: CartItem; onUpdateQuantity: (id: string, newQuantity: number) => void; onRemove: (id:string) => void; }> = ({ item, onUpdateQuantity, onRemove }) => (
    <div className="flex items-center py-3 border-b">
        <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
        <div className="flex-grow mx-3">
            <p className="font-semibold text-sm">{item.name}</p>
            <p className="text-xs text-textSecondary">{formatCurrency(item.price)}</p>
        </div>
        <div className="flex items-center space-x-2">
            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><MinusIcon className="w-4 h-4" /></button>
            <span className="w-8 text-center font-semibold">{item.quantity}</span>
            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><PlusIcon className="w-4 h-4" /></button>
        </div>
        <p className="w-24 text-right font-bold text-primary-dark">{formatCurrency(item.price * item.quantity)}</p>
        <button onClick={() => onRemove(item.id)} className="ml-3 text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
    </div>
);


const PosView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'wallet'>('cash');
    const [cashReceived, setCashReceived] = useState(0);

    const filteredProducts = useMemo(() => {
        if (!searchTerm) return MOCK_PRODUCTS;
        return MOCK_PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.barcode.includes(searchTerm)
        );
    }, [searchTerm]);

    const handleAddToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [{ ...product, quantity: 1, discount: 0 }, ...prevCart];
        });
    };
    
    const handleUpdateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            handleRemoveFromCart(id);
            return;
        }
        setCart(prevCart => prevCart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    };

    const handleRemoveFromCart = (id: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };
    
    const subtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);
    const tax = subtotal * 0.11; // PPN 11%
    const total = subtotal + tax;
    const change = cashReceived >= total ? cashReceived - total : 0;

    const handleProcessPayment = () => {
        // Here you would integrate with a payment gateway or record the transaction
        console.log("Processing payment...", { cart, total, paymentMethod, cashReceived });
        setPaymentModalOpen(false);
        setSuccessModalOpen(true);
        setTimeout(() => {
            setSuccessModalOpen(false);
            setCart([]);
            setCashReceived(0);
        }, 2000);
    };

    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
          event.preventDefault();
          const productToAdd = MOCK_PRODUCTS.find(p => p.barcode === searchTerm.trim());
          if (productToAdd) {
              handleAddToCart(productToAdd);
              setSearchTerm('');
          }
      }
    };

  return (
    <div className="flex h-[calc(100vh-104px)] gap-6">
      {/* Product Selection */}
      <div className="w-3/5 flex flex-col bg-surface rounded-xl shadow-md p-4">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Cari produk berdasarkan nama atau scan barcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      </div>

      {/* Cart */}
      <div className="w-2/5 flex flex-col bg-surface rounded-xl shadow-md">
        <div className="p-4 border-b">
          <h3 className="text-xl font-bold text-primary-dark">Keranjang (ID: #TX12345)</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-center text-textSecondary h-full flex items-center justify-center">Keranjang kosong</p>
          ) : (
            cart.map(item => <CartListItem key={item.id} item={item} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemoveFromCart}/>)
          )}
        </div>
        <div className="p-4 bg-gray-50 border-t space-y-2">
            <div className="flex justify-between text-textPrimary"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between text-textPrimary"><span>Pajak (11%)</span><span>{formatCurrency(tax)}</span></div>
            <div className="flex justify-between text-2xl font-bold text-primary-dark"><span>Total</span><span>{formatCurrency(total)}</span></div>
            <button
                onClick={() => setPaymentModalOpen(true)}
                disabled={cart.length === 0}
                className="w-full bg-accent text-white font-bold py-3 rounded-lg mt-2 hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                Bayar
            </button>
        </div>
      </div>
      
      {/* Payment Modal */}
      <Modal isOpen={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)} title="Proses Pembayaran">
        <div className="space-y-4">
            <div className="text-center mb-4">
                <p className="text-textSecondary">Total Tagihan</p>
                <p className="text-4xl font-bold text-primary-dark">{formatCurrency(total)}</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
                <button onClick={() => setPaymentMethod('cash')} className={`p-3 rounded-lg border-2 ${paymentMethod === 'cash' ? 'border-primary bg-primary-light text-white' : 'border-gray-300'}`}> <CashIcon className="w-6 h-6 mx-auto mb-1"/> Tunai </button>
                <button onClick={() => setPaymentMethod('card')} className={`p-3 rounded-lg border-2 ${paymentMethod === 'card' ? 'border-primary bg-primary-light text-white' : 'border-gray-300'}`}> <CreditCardIcon className="w-6 h-6 mx-auto mb-1"/> Kartu </button>
                <button onClick={() => setPaymentMethod('wallet')} className={`p-3 rounded-lg border-2 ${paymentMethod === 'wallet' ? 'border-primary bg-primary-light text-white' : 'border-gray-300'}`}> <WalletIcon className="w-6 h-6 mx-auto mb-1"/> E-Wallet </button>
            </div>
            {paymentMethod === 'cash' && (
                <div className="space-y-2">
                    <label htmlFor="cashReceived" className="font-semibold">Uang Diterima</label>
                    <input type="number" id="cashReceived" value={cashReceived || ''} onChange={(e) => setCashReceived(Number(e.target.value))} className="w-full p-2 border rounded-lg" placeholder="Masukkan jumlah uang"/>
                    <div className="text-lg">Kembalian: <span className="font-bold">{formatCurrency(change)}</span></div>
                </div>
            )}
            <button onClick={handleProcessPayment} className="w-full bg-primary text-white font-bold py-3 rounded-lg mt-4 hover:bg-primary-dark transition-colors">
                Konfirmasi Pembayaran
            </button>
        </div>
      </Modal>

      {/* Success Modal */}
        <Modal isOpen={isSuccessModalOpen} onClose={() => setSuccessModalOpen(false)} title="Transaksi Berhasil">
            <div className="text-center py-8">
                <CheckCircleIcon className="w-24 h-24 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-textPrimary">Pembayaran Berhasil!</h3>
                <p className="text-textSecondary mt-2">Mencetak struk...</p>
            </div>
        </Modal>

    </div>
  );
};

export default PosView;