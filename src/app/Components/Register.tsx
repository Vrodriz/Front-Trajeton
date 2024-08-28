'use client';

import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<{ email?: string; password?: string; confirmPassword?: string; general?: string }>({});
  const router = useRouter();

  const validatePassword = useCallback(
    (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,32}$/.test(password),
    []
  );

  const validateEmail = useCallback(
    (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    []
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const newError: { email?: string; password?: string; confirmPassword?: string; general?: string } = {};

      if (!validateEmail(email)) newError.email = 'E-mail inválido. Insira um endereço de e-mail no formato correto.';
      if (!validatePassword(password)) newError.password = 'Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais.';
      if (password !== confirmPassword) newError.confirmPassword = 'As senhas não coincidem.';

      if (Object.keys(newError).length === 0) {
        try {
          await axios.post('http://localhost:5277/v1/register', { email, password });
          router.push('/login');
        } catch {
          newError.general = 'Falha no registro. Tente novamente.';
        }
      }

      setError(newError);
    },
    [email, password, confirmPassword, validateEmail, validatePassword, router]
  );

  const inputClass = "mt-1 block text-black w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
  const buttonClass = "mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-blue-900";

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      <div className="flex flex-1 flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-12 xl:px-24">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Criar Conta</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                id="email"
                className={`${inputClass} ${error.email ? 'border-red-500' : 'border-gray-300'}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                id="password"
                className={`${inputClass} ${error.password ? 'border-red-500' : 'border-gray-300'}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
              <input
                type="password"
                id="confirmPassword"
                className={`${inputClass} ${error.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {error.confirmPassword && <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>}
            </div>

            {error.general && <p className="text-red-500 text-sm mt-1 text-center">{error.general}</p>}

            <button type="submit" className={buttonClass}>
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
