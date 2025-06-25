'use client';

import { Box, Typography } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';

type Props = {
  history: any[][];
};

export default function HistoryPanelUI({ history }: Props) {
  if (!history.length) return null;

  return (
    <Box>
      <Typography variant="h6">Historial de Rotaciones</Typography>
      {history.map((rotacion, i) => (
        <Box key={i} sx={{ my: 2 }}>
          <Typography variant="subtitle2">Rotación #{history.length - i}</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {rotacion.map((item, idx) => (
              <QRCodeSVG key={idx} value={JSON.stringify(item)} size={64} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
