import { Grid, styled } from '@mui/material';
import React from 'react';
import { Pokemon } from '../models';
import { PokemonCard } from './PokemonCard';

interface PokemonsProps {
  pokemons: Pokemon[];
  onClickPokemon: (pokemon: Pokemon) => void;
  selected?: Pokemon;
}

const RespGrid = styled(Grid)(({ theme }) => ({
  maxWidth: 1070,
  [theme.breakpoints.down('xl')]: {
    maxWidth: 780,
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: 500,
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 280,
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

export const Pokemons: React.FC<PokemonsProps> = ({ pokemons, onClickPokemon, selected }) => {
  return (
    <RespGrid columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }} rowGap={2} columnSpacing={2} container>
      {pokemons.map((pokemon) => (
        <Grid item key={pokemon.id} xs={1} sm={1} md={1} lg={1} xl={1}>
          <PokemonCard
            pokemon={pokemon}
            selected={pokemon.id === selected?.id}
            onClick={() => onClickPokemon(pokemon)}
          />
        </Grid>
      ))}
    </RespGrid>
  );
};
