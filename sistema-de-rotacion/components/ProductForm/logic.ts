import { useGlobal } from '@/context/GlobalState';

export const useProductFormLogic = () => {
  const { state, dispatch } = useGlobal();

  const handleChange = (field: string, value: any) => {
    dispatch({ type: 'SET_FIELD', field: field as any, value });
  };

  const handleStartRotation = () => {
    const total = state.productCount;
    const units = state.unitsPerBox || 1;
    const fecha = state.startDate?.toLocaleDateString() || '';
    let cajas: any[] = [];

    if (state.byBoxes) {
      const cantidadDeCajas = Math.ceil(total / units);
      for (let i = 1; i <= cantidadDeCajas; i++) {
        cajas.push({
          caja: i,
          cantidad: total,
          porCajas: true,
          unidadesPorCaja: units,
          descripcion: state.description,
          fecha,
        });
      }
    } else {
      for (let i = 1; i <= total; i++) {
        cajas.push({
          caja: i,
          cantidad: 1,
          porCajas: false,
          unidadesPorCaja: 1,
          descripcion: state.description,
          fecha,
        });
      }
    }

    dispatch({ type: 'SET_QR_LIST', value: cajas });
    dispatch({ type: 'ADD_HISTORY', value: cajas });
  };

  return { state, handleChange, handleStartRotation };
};
