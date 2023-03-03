import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pokedex, Pokemon } from '../../models';

interface FetchPokemonsResponce extends Pokedex {
  pokemons: Pokemon[];
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const fetchPokemons = createAsyncThunk<FetchPokemonsResponce, string | undefined>(
  'pokemons/fetchPokemonsResults',
  async (url = `${BASE_URL}/pokemon/?limit=12`) => {
    const { data } = await axios.get<Pokedex>(url);
    const resultsPromises = data.results.map((pokemon) => axios.get<Pokemon>(pokemon.url));
    const pokemonsResponces = await Promise.all(resultsPromises);
    const pokemons = pokemonsResponces.map(({ data }) => data);

    return { ...data, pokemons };
  }
);

export enum Status {
  LOADING,
  ERROR,
  SUCCESS,
}

interface PokemonsState extends Pokedex {
  status: Status;
  pokemons: Pokemon[];
}

const initialState: PokemonsState = {
  count: 0,
  next: '',
  previous: '',
  results: [],
  status: Status.LOADING,
  pokemons: [],
};

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.next = action.payload.next;
        state.count = action.payload.count;
        state.previous = action.payload.previous;
        state.results.push(...action.payload.results);
        state.pokemons.push(...action.payload.pokemons);
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.status = Status.ERROR;
      });
  },
});

export default pokemonsSlice.reducer;
