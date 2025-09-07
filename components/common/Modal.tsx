
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-md m-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold text-textPrimary">{title}</h3>
          <button onClick={onClose} className="text-textSecondary hover:text-textPrimary">&times;</button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
