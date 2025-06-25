'use client';

import {
  TextField, Checkbox, Button, FormControlLabel, Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type Props = {
  state: any;
  handleChange: (field: string, value: any) => void;
  handleStartRotation: () => void;
};

export default function ProductFormUI({ state, handleChange, handleStartRotation }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Cantidad de Cajas"
        type="number"
        value={state.productCount}
        onChange={(e) => handleChange('productCount', parseInt(e.target.value))}
      />
      <FormControlLabel
        control={<Checkbox checked={state.byBoxes} onChange={(e) => handleChange('byBoxes', e.target.checked)} />}
        label="¿Cuantos productos por caja?"
      />
      {state.byBoxes && (
        <TextField
          label="Unidades por caja"
          type="number"
          value={state.unitsPerBox}
          onChange={(e) => handleChange('unitsPerBox', parseInt(e.target.value))}
        />
      )}
      <DatePicker
        label="Fecha de rotación"
        value={state.startDate}
        onChange={(newValue) => handleChange('startDate', newValue)}
      />
      <TextField
        label="Descripción"
        multiline
        rows={3}
        value={state.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />
      <Button variant="contained" onClick={handleStartRotation}>
        Empezar Rotación
      </Button>
    </Box>
  );
}
