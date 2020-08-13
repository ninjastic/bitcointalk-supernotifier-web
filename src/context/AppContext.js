import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';
import configCatClient from '../services/configcat';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [maintenance, setMaintenance] = useState({});

  const getValue = useCallback(async (name) => {
    return configCatClient.getValueAsync(name);
  }, []);

  const getMaintenance = useCallback(async () => {
    return getValue('maintenance').then((value) => setMaintenance(value));
  }, [getValue]);

  useEffect(() => {
    getMaintenance();
  }, [getMaintenance]);

  return (
    <AppContext.Provider value={{ maintenance }}>
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within a AppProvider');
  }

  return context;
};

export { AppContext, AppProvider, useApp };
