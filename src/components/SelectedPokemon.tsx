import CloseIcon from '@mui/icons-material/Close';
import { Box, Card, CardProps, Typography } from '@mui/material';
import React from 'react';
import { Pokemon } from '../models';
import { makePokemonNumber } from '../utils/makePokemonNumber';
import { StatsTable } from './StatsTable';

interface SelectedPokemonProps extends CardProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export const SelectedPokemon: React.FC<SelectedPokemonProps> = ({ pokemon, onClose, ...props }) => {
  return (
    <Card {...props} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        sx={{
          position: 'absolute',
          zIndex: -1,
          width: '350%',
          height: '350%',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundImage: `url(${pokemon.sprites.front_default})`,
          WebkitFilter: 'blur(100px)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></Box>
      <CloseIcon sx={{ alignSelf: 'flex-end', cursor: 'pointer', fontSize: 26 }} onClick={onClose} />
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
