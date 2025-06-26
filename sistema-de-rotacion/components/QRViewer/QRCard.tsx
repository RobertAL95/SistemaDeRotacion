'use client';

import { Box, Button, Typography } from '@mui/material';
import QRCode from 'qrcode.react';

type Props = {
  data: any;
  onEdit: () => void;
};

export const QRCard = ({ data, onEdit }: Props) => {
  return (
    <Box border={1} borderRadius={2} p={2} m={1} textAlign="center" className="qr-card">
      <Typography variant="h6">Caja {data.boxNumber}</Typography>
      <QRCode value={JSON.stringify(data)} size={150} />
      <Typography variant="body2" mt={1}>{data.individualDescription || 'Sin descripción'}</Typography>
      <Button size="small" onClick={onEdit}>Editar</Button>
    </Box>
  );
};
