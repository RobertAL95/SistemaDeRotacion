'use client';

import { Box, Button, Grid, Typography } from '@mui/material';
import { useQRLogic } from './logic';
import { ModalEditQR } from './ModalEditQR';
import { QRCard } from './QRCard';
import { downloadQRAsPDF } from './utils/pdfs';

export const QRViewer = () => {
  const {
    modalOpen,
    selectedBox,
    handleEditClick,
    handleDescriptionChange,
    closeModal,
    individualDescriptions,
    generateQRData
  } = useQRLogic();

  const qrDataList = generateQRData();

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Listado de Cajas y QR</Typography>
      <Grid container spacing={2}>
        {qrDataList.map((qr, index) => (
          <Grid item key={qr.id} xs={12} sm={6} md={4} lg={3}>
            <QRCard data={qr} onEdit={() => handleEditClick(index + 1)} />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={downloadQRAsPDF} sx={{ mt: 4 }}>
        Descargar Todos en PDF
      </Button>
      <ModalEditQR
        open={modalOpen}
        onClose={closeModal}
        onChange={handleDescriptionChange}
        boxNumber={selectedBox}
      />
    </Box>
  );
};
