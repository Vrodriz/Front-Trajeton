'use client';

import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PasswordResetFormModalProps {
  onClose: () => void;
}

const PasswordResetFormModal: React.FC<PasswordResetFormModalProps> = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, onClose]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log('Senha redefinida com sucesso');
      setSuccess('Senha alterada com sucesso!');
      setError(null);
    } else {
      setError('As senhas não coincidem');
      setSuccess(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-80 max-w-md relative z-50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-black text-xl font-bold mb-2">Redefinir Senha</h2>
        <p className="text-gray-700 mb-4">Redefina sua senha com no mínimo 6 caracteres</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha*</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Digite uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirme sua senha*</label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Repita sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-xs mt-2 transition-opacity fade-in">{error}</p>}
          </div>
          <div className='mb-7 text-left'> 
            <p className="text-gray-500 text-xs mt-1">Crie uma senha segura</p>
            <ul className="text-gray-500 text-xs mt-1 list-disc list-inside">
              <li>Use letras maiúsculas e minúsculas, símbolos e números</li>
              <li>Não use informações pessoais como datas de aniversário</li>
              <li>Não use uma senha igual a anterior</li>
            </ul>
          </div>
          {success && <p className="text-green-500 text-xs mb-4 transition-opacity fade-in">{success}</p>}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
          >
            Redefinir
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetFormModal;
