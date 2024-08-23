'use client';

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PasswordRecoverySuccessModalProps {
  onClose: () => void;
  onResetPasswordClick: () => void; 
}

const PasswordRecoverySuccessModal: React.FC<PasswordRecoverySuccessModalProps> = ({ onClose, onResetPasswordClick }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative flex flex-col items-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <h2 className="text-black text-xl mb-4">Recuperar Senha</h2>
          <p className="text-gray-700 mb-4">
            Enviamos um link de recuperação para o seu email cadastrado. Por favor, verifique a sua caixa de entrada e a pasta de spam, se necessário.
          </p>
          <button
            onClick={onResetPasswordClick}
            className="text-blue-500 hover:underline mb-4"
          >
            Redefinir Senha
          </button>
          <button
            onClick={onClose}
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
          >
            Entendido
          </button>
        </div>
      </div>
    </>
  );
};

export default PasswordRecoverySuccessModal;
