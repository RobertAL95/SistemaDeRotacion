'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import QRCode from 'qrcode.react';

type Props = {
  qrList: any[];
  selectedIndex: number | null;
  individualDescription: string;
  setIndividualDescription: (text: string) => void;
  handleOpenModal: (i: number) => void;
  handleCloseModal: () => void;
  handleSaveDescription: () => void;
};

export const QRViewerUI = ({
  qrList,
  selectedIndex,
  individualDescription,
  setIndividualDescription,
  handleOpenModal,
  handleCloseModal,
  handleSaveDescription,
}: Props) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>QR generados</Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {qrList.map((qr, i) => (
          <Button key={i} onClick={() => handleOpenModal(i)} sx={{ padding: 0 }}>
            <Box border={1} borderRadius={2} padding={1}>
              <Typography variant="caption">Caja {i + 1}</Typography>
              <QRCode value={JSON.stringify(qr)} size={128} />
            </Box>
          </Button>
        ))}
      </Box>

      <Dialog open={selectedIndex !== null} onClose={handleCloseModal}>
        <DialogTitle>Descripción Individual</DialogTitle>
        <DialogContent>
          <TextField
            label="Descripción de la caja"
            value={individualDescription}
            onChange={(e) => setIndividualDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="contained" onClick={handleSaveDescription}>
            Generar descripción individual
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
