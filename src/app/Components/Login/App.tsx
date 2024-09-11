"use client";

import React, { useState } from 'react';
import ForgotPasswordModal from '../RecoverPassword/Forgot'; 


function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className='bg-white text-white'>
      <button onClick={handleOpenModal}>Esqueci minha senha</button>
      <ForgotPasswordModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal} onSuccess={function (): void {
          throw new Error('Function not implemented.');
        } }      />
    </div>
  );
}

export default App;
