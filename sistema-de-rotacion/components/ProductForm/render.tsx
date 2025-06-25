'use client';

import { useProductFormLogic } from './logic';
import ProductFormUI from './ui';

export default function ProductForm() {
  const { state, handleChange, handleStartRotation } = useProductFormLogic();
  return (
    <ProductFormUI
      state={state}
      handleChange={handleChange}
      handleStartRotation={handleStartRotation}
    />
  );
}
