'use client';

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PasswordResetFormModal from './PasswordResetFormModal'; 

interface PasswordResetInfoModalProps {
  onClose: () => void;
}

const PasswordResetInfoModal: React.FC<PasswordResetInfoModalProps> = ({ onClose }) => {
  const [isPasswordResetFormModalOpen, setPasswordResetFormModalOpen] = React.useState(false);

  const handleOpenPasswordResetFormModal = () => setPasswordResetFormModalOpen(true);
  const handleClosePasswordResetFormModal = () => setPasswordResetFormModalOpen(false);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-81 relative z-50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 -mt-3 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <h2 className="text-black mt-5 text-xl mb-4">Olá, redefina sua senha de acesso clicando no link abaixo.</h2>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleOpenPasswordResetFormModal();
            }}
            className="text-blue-500 hover:underline mb-4 -p-7"
          >
            https://trajetonbdchabvuyhrvyhv.senha
          </a>
          <p className="text-red-500 mt-4 -mb-2">O link expira em 24 horas.</p>
        </div>
      </div>

      {isPasswordResetFormModalOpen && (
        <PasswordResetFormModal onClose={handleClosePasswordResetFormModal} />
      )}
    </>
  );
};

export default PasswordResetInfoModal;
