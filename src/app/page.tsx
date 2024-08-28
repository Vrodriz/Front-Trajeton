'use client';

import React, { useState } from 'react';
import App from './Components/App'; 
import Login from './Components/Login'; 
import ForgotPasswordModal from './Components/Forgot';
import PasswordRecoverySuccessModal from './Components/RecoverySuccessModal';
import PasswordResetInfoModal from './Components/PasswordResetInfoModal';
import PasswordResetFormModal from './Components/PasswordResetFormModal';

type ModalType = 
  | 'forgotPassword'
  | 'passwordRecoverySuccess'
  | 'passwordResetInfo'
  | 'passwordResetForm'
  | null;

const MODAL_TYPES = {
  NONE: null as ModalType,
  FORGOT_PASSWORD: 'forgotPassword' as ModalType,
  PASSWORD_RECOVERY_SUCCESS: 'passwordRecoverySuccess' as ModalType,
  PASSWORD_RESET_INFO: 'passwordResetInfo' as ModalType,
  PASSWORD_RESET_FORM: 'passwordResetForm' as ModalType,
};

const Page: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(MODAL_TYPES.NONE);

  const openModal = (modalType: ModalType) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(MODAL_TYPES.NONE);

  return (
    <>
      <Login 
        onForgotPasswordClick={() => openModal(MODAL_TYPES.FORGOT_PASSWORD)} 
        onCreateAccountClick={() => {
          // Implemente a lógica para criar uma conta ou navegue para uma página de registro
          console.log('Criar nova conta');
        }} 
      />
      <App />
      {activeModal === MODAL_TYPES.FORGOT_PASSWORD && (
        <ForgotPasswordModal 
          isOpen 
          onClose={closeModal} 
          onSuccess={() => {
            closeModal();
            openModal(MODAL_TYPES.PASSWORD_RECOVERY_SUCCESS);
          }}
        />
      )}
      {activeModal === MODAL_TYPES.PASSWORD_RECOVERY_SUCCESS && (
        <PasswordRecoverySuccessModal
          onClose={closeModal}
          onResetPasswordClick={() => {
            closeModal();
            openModal(MODAL_TYPES.PASSWORD_RESET_INFO);
          }}
        />
      )}
      {activeModal === MODAL_TYPES.PASSWORD_RESET_INFO && (
        <PasswordResetInfoModal 
          onClose={() => {
            closeModal();
            openModal(MODAL_TYPES.PASSWORD_RESET_FORM);
          }} 
        />
      )}
      {activeModal === MODAL_TYPES.PASSWORD_RESET_FORM && (
        <PasswordResetFormModal onClose={closeModal} />
      )}
    </>
  );
};

export default Page;
