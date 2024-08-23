'use client';

import React, { useState } from 'react';
import App from './Components/App'; 
import Login from './Components/Login'; 
import ForgotPasswordModal from './Components/Forgot';
import PasswordRecoverySuccessModal from './Components/RecoverySuccessModal';
import PasswordResetInfoModal from './Components/PasswordResetInfoModal';
import PasswordResetFormModal from './Components/PasswordResetFormModal'; // Importe o novo modal

const Page = () => {
  const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [isPasswordRecoverySuccessModalOpen, setPasswordRecoverySuccessModalOpen] = useState(false);
  const [isPasswordResetInfoModalOpen, setPasswordResetInfoModalOpen] = useState(false);
  const [isPasswordResetFormModalOpen, setPasswordResetFormModalOpen] = useState(false);

  const handleOpenForgotPasswordModal = () => setForgotPasswordModalOpen(true);
  const handleCloseForgotPasswordModal = () => setForgotPasswordModalOpen(false);

  const handleOpenPasswordRecoverySuccessModal = () => setPasswordRecoverySuccessModalOpen(true);
  const handleClosePasswordRecoverySuccessModal = () => setPasswordRecoverySuccessModalOpen(false);

  const handleOpenPasswordResetInfoModal = () => setPasswordResetInfoModalOpen(true);
  const handleClosePasswordResetInfoModal = () => setPasswordResetInfoModalOpen(false);

  const handleOpenPasswordResetFormModal = () => setPasswordResetFormModalOpen(true);
  const handleClosePasswordResetFormModal = () => setPasswordResetFormModalOpen(false);

  return (
    <>
      <Login onForgotPasswordClick={handleOpenForgotPasswordModal} />
      <App />
      <ForgotPasswordModal 
        isOpen={isForgotPasswordModalOpen} 
        onClose={handleCloseForgotPasswordModal} 
        onSuccess={() => {
          handleCloseForgotPasswordModal();
          handleOpenPasswordRecoverySuccessModal();
        }}
      />
      {isPasswordRecoverySuccessModalOpen && (
        <PasswordRecoverySuccessModal
          onClose={() => handleClosePasswordRecoverySuccessModal()}
          onResetPasswordClick={() => {
            handleClosePasswordRecoverySuccessModal();
            handleOpenPasswordResetInfoModal();
          }}
        />
      )}
      {isPasswordResetInfoModalOpen && (
        <PasswordResetInfoModal 
          onClose={() => {
            handleClosePasswordResetInfoModal();
            handleOpenPasswordResetFormModal();
          }} 
        />
      )}
      {isPasswordResetFormModalOpen && (
        <PasswordResetFormModal onClose={handleClosePasswordResetFormModal} />
      )}
    </>
  );
}

export default Page;
