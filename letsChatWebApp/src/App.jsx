import React from 'react';
import AppRouter from './routes/AppRouter';
import useSocket from './hooks/useSocket';
import { store } from './redux/store';
import { Provider } from 'react-redux';

function App() {
  useSocket(); // ✅ Custom hook to init socket once

  return (
    <Provider store={store}>  {/* ✅ Redux Provider setup */}
      <AppRouter />
    </Provider>
  );
}

export default App;
