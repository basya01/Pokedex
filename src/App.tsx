import { Box, Button, CircularProgress, Container, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { Alerts, FilterSelect, Header, Pokemons, SelectedPokemon } from './components';
import { useFetchPokemons } from './hooks';
import './index.css';
import { Pokemon, TypeName } from './models';
import { Status } from './store/slices/pokemons';

const types = [
  TypeName.NORMAL,
  TypeName.FIRE,
  TypeName.WATER,
  TypeName.ELECTRIC,
  TypeName.GRASS,
  TypeName.ICE,
  TypeName.FIGHTING,
  TypeName.POISON,
  TypeName.GROUND,
  TypeName.FLYING,
  TypeName.PSYCHIC,
  TypeName.BUG,
  TypeName.ROCK,
  TypeName.GHOST,
  TypeName.DRAGON,
  TypeName.DARK,
  TypeName.STEEL,
  TypeName.FAIRY,
];

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [filterName, setFilterName] = useState<string>('');
  const { pokedex, loadMorePokemons } = useFetchPokemons();

  const isLoading = pokedex.status === Status.LOADING;

  const loadMoreHandler = () => {
    loadMorePokemons();
  };

  const pokemonHandler = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const filterHandler = (event: SelectChangeEvent<string>) => {
    setFilterName(event.target.value);
  };

  const filteredPokemons = filterName
    ? pokedex.pokemons.filter((pokemon) => pokemon.types.some(({ type }) => type.name === filterName))
    : pokedex.pokemons;

  return (
    <div>
      <Header />
      <Container sx={{ my: 4 }} maxWidth="xl" component="main">
        <FilterSelect selectValue={filterName} items={types} onChange={filterHandler} />
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Pokemons
            pokemons={filteredPokemons}
            onClickPokemon={pokemonHandler}
            {...(selectedPokemon && { selected: selectedPokemon })}
          />
          {selectedPokemon && (
            <SelectedPokemon
              sx={{ position: 'absolute', right: 0, width: 300, top: '50%', transform: 'translateY(-50%)' }}
              pokemon={selectedPokemon}
            />
          )}
        </Box>
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
          <Button variant="contained" size="large" disabled={isLoading} onClick={loadMoreHandler}>
            Load more
          </Button>
          {isLoading && <CircularProgress sx={{ ml: 2 }} size="35px" />}
        </Box>
      </Container>
      <Alerts />
    </div>
  );
}

export default App;
