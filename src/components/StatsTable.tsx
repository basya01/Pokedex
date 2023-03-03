import { Table, TableBody, TableCell, TableHead, TableProps, TableRow } from '@mui/material';
import React from 'react';
import { Pokemon } from '../models/Pokemon';

interface StatsTableProps extends TableProps {
  pokemon: Pokemon;
}

const statTypes = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'SP Attack',
  'special-defense': 'SP Defense',
  speed: 'Speed',
};

export const StatsTable: React.FC<StatsTableProps> = ({ pokemon, ...props }) => {
  const sortedStatsByName = [...pokemon.stats].sort((a, b) => a.stat.name.localeCompare(b.stat.name));

  return (
    <Table {...props}>
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell align="right">Fire</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedStatsByName.map(({ stat, base_stat }) => (
          <TableRow key={stat.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {statTypes[stat.name]}
            </TableCell>
            <TableCell align="right">{base_stat}</TableCell>
          </TableRow>
        ))}
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            Weight
          </TableCell>
          <TableCell align="right">{pokemon.weight}</TableCell>
        </TableRow>
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            Total moves
          </TableCell>
          <TableCell align="right">{pokemon.moves.length}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
