// import { createStore, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./root-reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Persist Config
const persistConfig = {
    key: "root", // Key to store data in localStorage
    storage, // Use localStorage,,
    whitelist: ["invoiceForm"]
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// for testing
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializability check
      }),
  });


// Persistor for persisting the store
export const persistor = persistStore(store);

// for production
// export const store = createStore(rootReducer, applyMiddleware(thunk));

