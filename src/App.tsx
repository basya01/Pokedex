import { Box, Button, CircularProgress, Container, SelectChangeEvent, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Alerts, FilterSelect, Header, Pokemons, SelectedPokemon } from './components';
import { useAppDispatch, useFetchPokemons } from './hooks';
import './index.css';
import { Pokemon, TypeName } from './models';
import { addAlert } from './store/slices/alerts';
import { Status } from './store/slices/pokemons';

const StyledSelectedPokemon = styled(SelectedPokemon)(({ theme }) => ({
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

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    position: 'static',
  },
}));

const typesNames = Object.values(TypeName);

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [filterType, setFilterType] = useState<TypeName | ''>('');
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[] | null>(null);
  const { pokedex, loadMorePokemons } = useFetchPokemons();
  const dispatch = useAppDispatch();

  const isLoading = pokedex.status === Status.LOADING;

  useEffect(() => {
    if (!filterType) {
      setFilteredPokemons(null);
      return;
    }
    const filtered = pokedex.pokemons.filter((pokemon) =>
      pokemon.types.some(({ type }) => type.name === filterType)
    );
    console.log(filtered);
    if (!filtered.length) {
      dispatch(addAlert({ text: 'Pokemons with such a type are not found', severity: 'error' }));
    }
    setFilteredPokemons(filtered);
  }, [pokedex.pokemons, filterType]);

  const loadMoreHandler = () => {
    loadMorePokemons();
  };

  const pokemonHandler = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const filterHandler = (event: SelectChangeEvent<TypeName | ''>) => {
    setFilterType(event.target.value as TypeName | '');
  };
  console.log(filteredPokemons);

  const closePokemonHandler = () => {
    setSelectedPokemon(null);
  };

  return (
    <div>
      <Header />
      <Container sx={{ my: 4 }} maxWidth="xl" component="main">
        <FilterSelect selectValue={filterType} items={typesNames} onChange={filterHandler} />
        <StyledBox>
          <Pokemons
            pokemons={filteredPokemons || pokedex.pokemons}
            onClickPokemon={pokemonHandler}
            {...(selectedPokemon && { selected: selectedPokemon })}
          />
          {selectedPokemon && (
            <StyledSelectedPokemon onClose={closePokemonHandler} pokemon={selectedPokemon} />
          )}
        </StyledBox>
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
