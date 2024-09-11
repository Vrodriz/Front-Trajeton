import React, { useState } from 'react';
import PasswordResetFormModal from '../RecoverPassword/PasswordResetFormModal';

const ExampleComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const email = 'usuario@example.com'; // Defina o e-mail apropriado aqui

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Redefinir Senha</button>
      {isModalOpen && (
        <PasswordResetFormModal
          //email={email}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ExampleComponent;
