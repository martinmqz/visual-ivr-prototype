import { configureStore } from '@reduxjs/toolkit';
import ivrReducer from './ivr'
// import storage from 'redux-persist/lib/storage'
// import { persistReducer, persistStore } from 'redux-persist'
import localStorageMiddleware from './middleware/localStorageMiddleware';

const store = configureStore({
  reducer: {
    ivr: ivrReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
})

export default store
