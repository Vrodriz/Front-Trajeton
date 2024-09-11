'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface ModalContextProps {
  isForgotPasswordModalOpen: boolean;
  isPasswordRecoverySuccessModalOpen: boolean;
  openForgotPasswordModal: () => void;
  closeForgotPasswordModal: () => void;
  openPasswordRecoverySuccessModal: () => void;
  closePasswordRecoverySuccessModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [isPasswordRecoverySuccessModalOpen, setPasswordRecoverySuccessModalOpen] = useState(false);

  const openForgotPasswordModal = useCallback(() => setForgotPasswordModalOpen(true), []);
  const closeForgotPasswordModal = useCallback(() => setForgotPasswordModalOpen(false), []);
  const openPasswordRecoverySuccessModal = useCallback(() => setPasswordRecoverySuccessModalOpen(true), []);
  const closePasswordRecoverySuccessModal = useCallback(() => setPasswordRecoverySuccessModalOpen(false), []);

  return (
    <ModalContext.Provider value={{
      isForgotPasswordModalOpen,
      isPasswordRecoverySuccessModalOpen,
      openForgotPasswordModal,
      closeForgotPasswordModal,
      openPasswordRecoverySuccessModal,
      closePasswordRecoverySuccessModal
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
