import { Box, Card } from '@mui/material';
import { CardProps } from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Pokemon } from '../models';
import { makePokemonNumber } from '../utils/makePokemonNumber';
import { StatsTable } from './StatsTable';

interface SelectedPokemonProps extends CardProps {
  pokemon: Pokemon;
}

export const SelectedPokemon: React.FC<SelectedPokemonProps> = ({ pokemon, sx, ...props }) => {
  return (
    <Card {...props} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', ...sx }}>
      <Box sx={{ display: 'flex' }}>
        <img src={pokemon.sprites.front_default} alt="pokemon_sprite" />
        <img src={pokemon.sprites.back_default} alt="pokemon_sprite" />
      </Box>
      <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
        {pokemon.name} {makePokemonNumber(pokemon.id)}
      </Typography>
      <StatsTable pokemon={pokemon} size="small" aria-label="a dense table" sx={{ mt: 4 }} />
    </Card>
  );
};
