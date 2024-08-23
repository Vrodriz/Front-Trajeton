"use client";

import React, { useState } from 'react';
import ForgotPasswordModal from './Forgot'; 


function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={handleOpenModal}>Esqueci minha senha</button>
      <ForgotPasswordModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}

export default App;
