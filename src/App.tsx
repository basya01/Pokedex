import {
  Box,
  Button,
  CircularProgress,
  Container,
  SelectChangeEvent,
  styled
} from '@mui/material';
import { useState } from 'react';
import { Alerts, FilterSelect, Header, Pokemons, SelectedPokemon } from './components';
import { useAppDispatch, useFetchPokemons } from './hooks';
import './index.css';
import { Pokemon, TypeName } from './models';
import { addAlert } from './store/slices/alerts';
import { Status } from './store/slices/pokemons';

const types = Object.values(TypeName);

const RespSelectedPokemon = styled(SelectedPokemon)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  width: 300,
  top: '50%',
  transform: 'translateY(-50%)',
  [theme.breakpoints.down('md')]: {
    width: 200,
  },
  [theme.breakpoints.down('sm')]: {
    transform: 'none',
    zIndex: 10000,
    height: '100vh',
    width: '100vw',
    top: 0,
    left: 0,
    boxSizing: 'border-box',
  },
}));

const RespBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    position: 'static',
  },
}));

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [filterName, setFilterName] = useState<string>('');
  const [filtPokemons, setFilteredPokemons] = useState<Pokemon[] | null>(null);
  const { pokedex, loadMorePokemons } = useFetchPokemons();
  const dispatch = useAppDispatch();

  const isLoading = pokedex.status === Status.LOADING;

  const loadMoreHandler = () => {
    loadMorePokemons();
  };

  const pokemonHandler = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const filterHandler = (event: SelectChangeEvent<string>) => {
    setFilterName(event.target.value);
    if (!event.target.value) {
      setFilteredPokemons(null);
      return;
    }
    const filtered = pokedex.pokemons.filter((pokemon) =>
      pokemon.types.some(({ type }) => type.name === event.target.value)
    );
    if (!filtered.length) {
      dispatch(addAlert({ text: 'Pokemons with such a type are not found', severity: 'error' }));
    }
    setFilteredPokemons(filtered.length ? filtered : []);
  };

  const closePokemonHandler = () => {
    setSelectedPokemon(null);
  };

  return (
    <div>
      <Header />
      <Container sx={{ my: 4 }} maxWidth="xl" component="main">
        <FilterSelect selectValue={filterName} items={types} onChange={filterHandler} />
        <RespBox>
          <Pokemons
            pokemons={filtPokemons || pokedex.pokemons}
            onClickPokemon={pokemonHandler}
            {...(selectedPokemon && { selected: selectedPokemon })}
          />
          {selectedPokemon && <RespSelectedPokemon onClose={closePokemonHandler} pokemon={selectedPokemon} />}
        </RespBox>
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