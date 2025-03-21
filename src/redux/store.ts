import { configureStore, combineReducers } from "@reduxjs/toolkit";
import bookSlice  from "./features/bookSlice";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { WebStorage } from "redux-persist/lib/types";

// Create a custom storage for redux-persist
function createPersistStorage(): WebStorage {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage('local');
}

const storage = createPersistStorage();

// persist config
const persistConfig = {
  key: "rootPersist",
  storage,
};

// Combine reducers correctly
const rootReducer = combineReducers({
   bookSlice // Ensure that bookReducer is correctly assigned to the "books" key
});

const reduxPersistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: reduxPersistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
