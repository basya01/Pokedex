import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchPokemons, Status } from '../store/slices/pokemons';

export const useFetchPokemons = () => {
  const pokedex = useAppSelector((state) => state.pokemons);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPokemons());
  }, []);

  return { pokedex, loadMorePokemons: () => dispatch(fetchPokemons(pokedex.next)) };
};
