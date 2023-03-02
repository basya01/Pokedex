import { FormControl, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/Select';
import React from 'react';
import { TypeName } from '../models';

interface TypeFilterSelectProps {
  onChange: (event: SelectChangeEvent<string>) => void;
  items: TypeName[];
  selectValue: string;
}

export interface TypeItem {
  id: number;
  text: string;
}

export const FilterSelect: React.FC<TypeFilterSelectProps> = ({ onChange, items, selectValue }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120, textTransform: 'capitalize' }}>
      <Select
        value={selectValue}
        onChange={onChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value={''}>
          <em>None</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item} value={item} sx={{ textTransform: 'capitalize' }}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
