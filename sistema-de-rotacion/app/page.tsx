'use client';

import ProductForm from '@/components/ProductForm/render';
import QRViewer from '@/components/QRViewer/render';
import HistoryPanel from '@/components/HistoryPanel/render';
import { Container, Typography, Divider } from '@mui/material';

export default function Page() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sistema de Packing y Picking
      </Typography>
      <ProductForm />
      <Divider sx={{ my: 4 }} />
      <QRViewer />
      <Divider sx={{ my: 4 }} />
      <HistoryPanel />
    </Container>
  );
}
