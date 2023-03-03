import { Box, Card } from '@mui/material';
import { CardProps } from '@mui/material/Card';
import { blue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Pokemon, TypeName } from '../models';

interface PokemonCardProps extends CardProps {
  pokemon: Pokemon;
  selected?: boolean;
}

const typeColors = {
  [TypeName.NORMAL]: '#A8A77A',
  [TypeName.FIRE]: '#EE8130',
  [TypeName.WATER]: '#6390F0',
  [TypeName.ELECTRIC]: '#F7D02C',
  [TypeName.GRASS]: '#7AC74C',
  [TypeName.ICE]: '#96D9D6',
  [TypeName.FIGHTING]: '#C22E28',
  [TypeName.POISON]: '#A33EA1',
  [TypeName.GROUND]: '#E2BF65',
  [TypeName.FLYING]: '#A98FF3',
  [TypeName.PSYCHIC]: '#F95587',
  [TypeName.BUG]: '#A6B91A',
  [TypeName.ROCK]: '#B6A136',
  [TypeName.GHOST]: '#735797',
  [TypeName.DRAGON]: '#6F35FC',
  [TypeName.DARK]: '#705746',
  [TypeName.STEEL]: '#B7B7CE',
  [TypeName.FAIRY]: '#D685AD',
};

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, selected, ...props }) => {
  return (
    <Card
      {...props}
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: selected ? `inset 0px 0px 0px 3px ${blue[700]}` : '',
      }}
    >
      <img src={pokemon.sprites.front_default}></img>
      <Typography sx={{ textTransform: 'capitalize' }} variant="h5" component="h4">
        {pokemon.name}
      </Typography>
      <Box sx={{ display: 'flex', alignSelf: 'flex-start', gap: 1, mt: 2 }}>
        {pokemon.types.map(({ type, slot }) => (
          <Typography
            key={slot}
            variant="body1"
            component="p"
            sx={{
              background: typeColors[type.name],
              px: 2,
              py: 1,
              textTransform: 'capitalize',
              borderRadius: 2,
            }}
          >
            {type.name}
          </Typography>
        ))}
      </Box>
    </Card>
  );
};
