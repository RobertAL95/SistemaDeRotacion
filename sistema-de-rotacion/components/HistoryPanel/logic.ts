import { useGlobal } from '@/context/GlobalState';

export const useHistoryLogic = () => {
  const { state } = useGlobal();
  return { history: state.history };
};
