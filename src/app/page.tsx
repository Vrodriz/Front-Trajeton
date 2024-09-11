'use client';

import React, { useState } from 'react';
import Login from './Components/Login/Login'; 
import ForgotPasswordModal from './Components/RecoverPassword/Forgot';
import PasswordRecoverySuccessModal from './Components/RecoverPassword/RecoverySuccessModal';
import PasswordResetInfoModal from './Components/RecoverPassword/PasswordResetInfoModal';
import PasswordResetFormModal from './Components/RecoverPassword/PasswordResetFormModal';
import { useRouter } from 'next/navigation';
import Dashboard from './Dashboard/page';    

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
  const router = useRouter(); 

  const openModal = (modalType: ModalType) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(MODAL_TYPES.NONE);

  const handleLoginSuccess = () => {
    router.push('/Dashboard'); 
  };

  return (
    <>
      <Login 
        onForgotPasswordClick={() => openModal(MODAL_TYPES.FORGOT_PASSWORD)} 
        onCreateAccountClick={() => {
          console.log('Criar nova conta');
        }} 
        onLoginSuccess={handleLoginSuccess} 
      />
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
