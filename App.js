import React, {useEffect, useState, useContext} from 'react';
import {store, persistor} from './src/redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import ToDo from './src/components/todo';



const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ToDo />

      </PersistGate>
    </Provider>
  );
};



export default App;
