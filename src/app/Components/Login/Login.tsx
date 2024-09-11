'use client';

import React, { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';



interface LoginProps {
  onForgotPasswordClick: () => void;
  onCreateAccountClick: () => void;
  onLoginSuccess: () => void;
}

const validatePassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,32}$/.test(password);
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login: React.FC<LoginProps> = ({ onForgotPasswordClick, onCreateAccountClick, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<{ email?: string, password?: string, general?: string }>({});
  const [message, setMessage] = useState<string>(''); 
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    const newError: { email?: string, password?: string, general?: string } = {};

    if (!validateEmail(formData.email)) {
      newError.email = 'E-mail inválido. Insira um endereço de e-mail no formato correto.';
    }
    if (!validatePassword(formData.password)) {
      newError.password = 'Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais.';
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      setIsLoading(true);

      try {
        const rawResponse = await fetch('http://localhost:5277/v1/login', {
          method: 'POST',
          headers: {  
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Email: formData.email, Password: formData.password })
        });
        const response = await rawResponse.json();
        
        if (response.token) {
          localStorage.setItem('token', response.token);
          setMessage('Login realizado com sucesso');

          router.push('/Dashboard');
        } else {
          setError({ general: 'Falha no login. Verifique suas credenciais e tente novamente.' });
        }
      } catch (err) {
        console.error('Erro no login:', err);
        setError({ general: 'Erro inesperado. Tente novamente mais tarde.' });
      } finally {
        setIsLoading(false);
      }
    }
  }, [formData.email, formData.password, router]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleRegister = useCallback(() => {
    onCreateAccountClick();
  }, [onCreateAccountClick]);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      <div className="flex justify-center items-center lg:w-1/2 lg:hidden">
        <Image src="/LogoMobile.png" alt="Logo Image" width={400} height={200} className="rounded-lg" />
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
                className={`mt-1 block text-black w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${error.email ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                id="password"
                className={`mt-1 block text-black w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${error.password ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
            </div>

            {error.general && <p className="text-red-500 text-sm mt-1 text-center">{error.general}</p>}
            {message && <p className="text-green-500 text-sm mt-1 text-center">{message}</p>}

            <div className="mt-4 text-center">
              <button type="button" onClick={onForgotPasswordClick} className="text-blue-500 hover:underline">
                Esqueci minha senha
              </button>
            </div>
            <button type="submit" className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-blue-900" disabled={isLoading}>
              {isLoading ? 'Carregando...' : 'Entrar'}
            </button>
            <div className="mt-4 text-center">
              <button type="button" onClick={handleRegister} className="text-blue-500 hover:underline">
                Criar uma conta
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center bg-white">
        <Image src="/Logo.jpeg" alt="Logo Image" width={600} height={600} className="rounded-lg" />
      </div>
    </div>
  );
};

export default memo(Login);
