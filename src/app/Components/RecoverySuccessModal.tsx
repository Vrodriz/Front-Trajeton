'use client';

import React, { useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PasswordRecoverySuccessModalProps {
  onClose: () => void;
  onResetPasswordClick: () => void; 
}

const PasswordRecoverySuccessModal: React.FC<PasswordRecoverySuccessModalProps> = ({ onClose, onResetPasswordClick }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-80 max-w-md text-center relative max-h-screen overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
          aria-label="Fechar modal"
          ref={closeButtonRef}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-black text-xl font-bold mb-4">Recuperar Senha</h2>
        <p className="text-gray-700 mb-4">
          Enviamos um link de recuperação para o seu email cadastrado. Por favor, verifique a sua caixa de entrada e a pasta de spam, se necessário.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={onResetPasswordClick}
            className="text-blue-500 hover:underline"
            aria-label="Redefinir senha"
          >
            Redefinir Senha
          </button>
          <button
            onClick={onClose}
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
            aria-label="Entendido"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecoverySuccessModal;
