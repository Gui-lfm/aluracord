import { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  let sharedState = {
    dark: {
      text: "#FFFFFF",
      menuP: "#2A2A3C",
      menuS: "#29333D",
      chat: "#191923",
      textInfos: "#A6CFD5",
      span: "#FF7F50",
      btn: "#006668",
      btnHover: "#003C3D"
    },
    light: {
      text: "#000000",
      menuP: "#EBEBEB",
      menuS: "#FFFFFF",
      chat: "#C2C2C2",
      textInfos: "#8A6A50",
      span: "#D32F2F",
      btn: "#692800",
      btnHover: "#361500"
    }
  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}