import React from 'react';
import AppRouter from './routes/AppRouter';
import useSocket from './hooks/useSocket';

function App() {

  useSocket();

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
