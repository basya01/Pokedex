import { Grid } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';
import { Pokemon } from '../models';
import { PokemonCard } from './PokemonCard';

interface PokemonsProps {
  pokemons: Pokemon[];
  onClickPokemon: (pokemon: Pokemon) => void;
  selected?: Pokemon;
}

export const Pokemons: React.FC<PokemonsProps> = ({ pokemons, onClickPokemon, selected }) => {
  return (
    <Grid
      sx={{
        maxWidth: '70%',
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
      }}
      rowGap={2}
      columnSpacing={2}
      container
    >
      {pokemons.map((pokemon) => (
        <Grid item key={pokemon.id} xl={3}>
          <PokemonCard
            pokemon={pokemon}
            selected={pokemon.id === selected?.id}
            onClick={() => onClickPokemon(pokemon)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
