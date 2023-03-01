import { configureStore } from '@reduxjs/toolkit';
import alerts from './slices/alerts';

export const store = configureStore({
  reducer: {
    alerts,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
