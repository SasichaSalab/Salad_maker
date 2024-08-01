// components/ClientProvider.tsx
'use client';

import { Provider } from 'react-redux';
import store, { persistor } from '../store/store';
import { ReactNode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

interface ClientProviderProps {
  children: ReactNode;
}

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>;
};

export default ClientProvider;
