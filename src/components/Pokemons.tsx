import { Box, Grid, styled } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';
import { Pokemon } from '../models';
import { PokemonCard } from './PokemonCard';

interface PokemonsProps {
  pokemons: Pokemon[];
  onClickPokemon: (pokemon: Pokemon) => void;
  selected?: Pokemon;
}

const RespGrid = styled(Grid)(({ theme }) => ({
  height: 'calc(100vh - 310px)',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '10px',
    height: '3px',
  },
  '&::-webkit-scrollbar-track': { background: 'rgba(0, 0, 0, 0.05)', borderRadius: '20px' },
  '&::-webkit-scrollbar-thumb': {
    background: blue[700],
    borderRadius: '20px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
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
