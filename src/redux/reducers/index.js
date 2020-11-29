import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { todoReducer } from './todoReducer'

const rootReducerConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['todo']
};
const appReducer = combineReducers({
  todo: todoReducer,
});

const rootReducer = (state, actions) => {
  return appReducer(state, actions);
};

const persistedReducers = persistReducer(rootReducerConfig, rootReducer);
export default persistedReducers;

