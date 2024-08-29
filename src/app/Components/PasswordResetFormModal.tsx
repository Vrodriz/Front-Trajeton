import React, { useState, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PasswordResetFormModalProps {
  onClose: () => void;
}

const PasswordResetFormModal: React.FC<PasswordResetFormModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState<{ email?: string; password?: string; confirmPassword?: string; general?: string }>({});
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const newError: { email?: string; password?: string; confirmPassword?: string; general?: string } = {};

    if (!email) {
      newError.email = 'O e-mail é obrigatório.';
    }
    if (!validatePassword(formData.password)) {
      newError.password = 'A senha deve ter pelo menos 6 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.';
    }
    if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = 'As senhas não coincidem.';
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      try {
        const rawResponse = await fetch('http://localhost:5277/v1/alterar-senha', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, newPassword: formData.password, confirmPassword: formData.confirmPassword })
        });
        const response = await rawResponse.json();
        
        if (response.message) {
          setSuccess(response.message);
          setError({});
        } else {
          setError({ general: 'Falha na redefinição de senha. Tente novamente.' });
        }
      } catch (err) {
        console.error('Erro na redefinição de senha:', err);
        setError({ general: 'Erro inesperado. Tente novamente mais tarde.' });
      }
    }
  }, [formData.password, formData.confirmPassword, email]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail*</label>
            <input
              type="email"
              id="email"
              className={`mt-1 block w-full px-3 py-2 border text-black rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${error.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Digite seu e-mail"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {error.email && <p className="text-red-500 text-xs mt-2">{error.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Nova Senha*</label>
            <input
              type="password"
              id="password"
              className={`mt-1 block w-full px-3 py-2 border text-black rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${error.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Digite a nova senha"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {error.password && <p className="text-red-500 text-xs mt-2">{error.password}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirme a Nova Senha*</label>
            <input
              type="password"
              id="confirmPassword"
              className={`mt-1 block w-full px-3 py-2 border text-black rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${error.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Repita a nova senha"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {error.confirmPassword && <p className="text-red-500 text-xs mt-2">{error.confirmPassword}</p>}
          </div>
          <div className='mb-7 text-left'>
            <p className="text-gray-500 text-xs mt-1">Crie uma senha segura</p>
            <ul className="text-gray-500 text-xs mt-1 list-disc list-inside">
              <li>Use letras maiúsculas e minúsculas, símbolos e números</li>
              <li>Não use informações pessoais como datas de aniversário</li>
              <li>Não use uma senha igual a anterior</li>
            </ul>
          </div>
          {error.general && <p className="text-red-500 text-xs mt-2 text-center">{error.general}</p>}
          {success && <p className="text-green-500 text-xs mb-4">{success}</p>}
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
