import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

import { store, persistor } from './src/reduxToolkit/store';
import RootNavigation from './src/navigation/RootNavigation';
import SplashScreen from './src/pages/authPages/SplashScreen';
import { toastConfig } from './src/Utils/ToastConfig';
import { injectStore } from './src/Utils/axiosInstance'; // ✅ Import this

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      {isSplashVisible ? <SplashScreen /> : <RootNavigation />}
      <Toast config={toastConfig} />
    </>
  );
};

export default function AppWrapper() {
  injectStore(store); // ✅ Inject Redux store into axios instance

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
