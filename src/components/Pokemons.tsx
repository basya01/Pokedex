import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import { Pokemon } from '../models';
import { PokemonCard } from './PokemonCard';

interface PokemonsProps {
  pokemons: Pokemon[];
}

export const Pokemons: React.FC<PokemonsProps> = ({ pokemons }) => {
  return (
    <Box width="75%">
      <Grid container spacing={2}>
        {pokemons.map((pokemon) => (
          <Grid item key={pokemon.id} xl={3}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
