'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface LoginProps {
  onForgotPasswordClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onForgotPasswordClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,32}$/;
    return regex.test(password);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('E-mail inválido. Insira um endereço de e-mail no formato correto.');
      return;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setError('Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais.');
      return;
    }

    setError('');
    // Lógica para submissão do formulário pode ser adicionada aqui
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      <div className="flex justify-center items-center lg:w-1/2 lg:hidden">
        <Image
          src="/LogoMobile.png"
          alt="Logo Image"
          width={400}
          height={200}
          className="rounded-lg"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-12 xl:px-24">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                id="email"
                className={`mt-1 block text-black w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  emailError ? 'border-red-500' : 'border-gray-300'
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                id="password"
                className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={onForgotPasswordClick}
                className="text-blue-500 hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-blue-900"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center bg-white">
        <Image
          src="/Logo.jpeg"
          alt="Logo Image"
          width={600}
          height={600}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Login;
