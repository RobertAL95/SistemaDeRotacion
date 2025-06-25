'use client';

import { useQRLogic } from './logic';
import { QRViewerUI } from './ui';

export default function QRViewer() {
  const logic = useQRLogic();
  return <QRViewerUI {...logic} />;
}
