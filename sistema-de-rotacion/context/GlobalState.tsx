'use client';

import React, { createContext, useContext, useReducer } from 'react';

type StateType = {
  productCount: number;
  byBoxes: boolean;
  unitsPerBox: number;
  startDate: Date | null;
  description: string;
  qrList: any[];
  history: any[][];
};

const initialState: StateType = {
  productCount: 0,
  byBoxes: false,
  unitsPerBox: 0,
  startDate: null,
  description: '',
  qrList: [],
  history: [],
};

type Action =
  | { type: 'SET_FIELD'; field: keyof StateType; value: any }
  | { type: 'SET_QR_LIST'; value: any[] }
  | { type: 'ADD_HISTORY'; value: any[] };

const GlobalContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const reducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_QR_LIST':
      return { ...state, qrList: action.value };
    case 'ADD_HISTORY':
      return { ...state, history: [action.value, ...state.history] };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
