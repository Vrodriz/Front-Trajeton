'use client';

import React, { useState, memo, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simula um delay de envio
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      onSuccess(); // Chama a função de sucesso ao enviar o e-mail
    } catch (err) {
      setError('Ocorreu um erro ao enviar o e-mail. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }, [onSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-black text-xl font-bold mb-4">Esqueci minha senha</h2>
        <p className="text-black text-sm mb-4">Para recuperar sua senha, digite o e-mail cadastrado</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="forgotEmail" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              id="forgotEmail"
              className={`text-black mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${isSubmitting ? 'bg-gray-100' : 'border-gray-300'}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting || !email}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(ForgotPasswordModal);
