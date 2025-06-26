import { useGlobal } from '@/context/GlobalState';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useQRLogic = () => {
  const { state, dispatch } = useGlobal();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [individualDescriptions, setIndividualDescriptions] = useState<{ [key: number]: string }>({});

  const handleEditClick = (boxIndex: number) => {
    setSelectedBox(boxIndex);
    setModalOpen(true);
  };

  const handleDescriptionChange = (desc: string) => {
    if (selectedBox !== null) {
      setIndividualDescriptions(prev => ({ ...prev, [selectedBox]: desc }));
    }
  };

  const closeModal = () => setModalOpen(false);

  const generateQRData = () => {
    return Array.from({ length: Math.ceil(state.productCount / (state.unitsPerBox || 1)) }, (_, i) => ({
      id: uuidv4(),
      boxNumber: i + 1,
      generalDescription: state.description,
      individualDescription: individualDescriptions[i + 1] || '',
      createdBy: 'usuario_demo'
    }));
  };

  return {
    modalOpen,
    selectedBox,
    handleEditClick,
    handleDescriptionChange,
    closeModal,
    individualDescriptions,
    generateQRData
  };
};
