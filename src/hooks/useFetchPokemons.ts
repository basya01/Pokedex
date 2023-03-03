import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { addAlert } from '../store/slices/alerts';
import { fetchPokemons, Status } from '../store/slices/pokemons';

export const useFetchPokemons = () => {
  const pokedex = useAppSelector((state) => state.pokemons);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pokedex.status === Status.ERROR) {
      dispatch(addAlert({ text: 'Pokemons are not found', severity: 'error' }));
    }
  }, [pokedex]);
  
  useEffect(() => {
    dispatch(fetchPokemons());
  }, []);

  return { pokedex, loadMorePokemons: () => dispatch(fetchPokemons(pokedex.next)) };
};
