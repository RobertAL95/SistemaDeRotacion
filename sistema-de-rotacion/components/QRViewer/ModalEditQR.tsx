'use client';

import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  onChange: (text: string) => void;
  boxNumber: number | null;
};

export const ModalEditQR = ({ open, onClose, onChange, boxNumber }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Descripción individual para Caja {boxNumber}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Descripción específica"
          onChange={(e) => onChange(e.target.value)}
          multiline
          rows={3}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};
