import { useState } from 'react';
import { useGlobal } from '@/context/GlobalState';

export const useQRLogic = () => {
  const { state, dispatch } = useGlobal();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [individualDescription, setIndividualDescription] = useState('');

  const handleOpenModal = (index: number) => {
    setSelectedIndex(index);
    setIndividualDescription(state.qrList[index]?.individualDescription || '');
  };

  const handleCloseModal = () => {
    setSelectedIndex(null);
    setIndividualDescription('');
  };

  const handleSaveDescription = () => {
    const newQRList = [...state.qrList];
    newQRList[selectedIndex!] = {
      ...newQRList[selectedIndex!],
      individualDescription,
    };
    dispatch({ type: 'SET_QR_LIST', value: newQRList });
    handleCloseModal();
  };

  return {
    qrList: state.qrList,
    selectedIndex,
    individualDescription,
    setIndividualDescription,
    handleOpenModal,
    handleCloseModal,
    handleSaveDescription,
  };
};
