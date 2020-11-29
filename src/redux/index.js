import { createStore } from 'redux'

import persistedReducers from "./reducers"
import { persistStore } from 'redux-persist';

const store = createStore(persistedReducers);
const persistor = persistStore(store)
export { store, persistor }
