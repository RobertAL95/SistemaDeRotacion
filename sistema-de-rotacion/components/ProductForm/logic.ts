import { useGlobal } from '@/context/GlobalState';

export const useProductFormLogic = () => {
  const { state, dispatch } = useGlobal();

  const handleChange = (field: string, value: any) => {
    dispatch({ type: 'SET_FIELD', field: field as any, value });
  };

  const handleStartRotation = () => {
    const cantidadDeCajas = state.productCount;
    const fecha = state.startDate?.toLocaleDateString() || '';
    const descripcion = state.description || '';
    let cajas: any[] = [];

    for (let i = 1; i <= cantidadDeCajas; i++) {
      cajas.push({
        id: crypto.randomUUID(),
        caja: i,
        descripcion,
        fecha,
      });
    }

    dispatch({ type: 'SET_QR_LIST', value: cajas });
    dispatch({ type: 'ADD_HISTORY', value: cajas });
  };

  return { state, handleChange, handleStartRotation };
};
