'use client';

import { useHistoryLogic } from './logic';
import HistoryPanelUI from './ui';

export default function HistoryPanel() {
  const { history } = useHistoryLogic();
  return <HistoryPanelUI history={history} />;
}
