import { configureStore } from '@reduxjs/toolkit';
import alerts from './slices/alerts';
import pokemons from './slices/pokemons';

export const store = configureStore({
  reducer: {
    alerts,
    pokemons,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
