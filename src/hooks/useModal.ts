import { useState } from 'react';
import { ModalType } from '../types/type';

const useModal = () => {
  const [modalState, setModalState] = useState<{ type: ModalType; id: string | null }>({
    type: null,
    id: null,
  });

  const openModal = (id: string, type: ModalType) => setModalState({ type, id });
  const closeModal = () => setModalState({ type: null, id: null });

  return { openModal, closeModal, modalState };
};

export default useModal;
