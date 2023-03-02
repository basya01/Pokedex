import { Box, Button, CircularProgress, Container } from '@mui/material';
import blue from '@mui/material/colors/blue';
import { useState } from 'react';
import { Alerts, Header, Pokemons, SelectedPokemon } from './components';
import { useFetchPokemons } from './hooks';
import './index.css';
import { Pokemon } from './models';
import { Status } from './store/slices/pokemons';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const { pokedex, loadMorePokemons } = useFetchPokemons();

  const isLoading = pokedex.status === Status.LOADING;

  const loadMoreHandler = () => {
    loadMorePokemons();
  };
  const pokemonHandler = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <div>
      <Header />
      <Container sx={{ my: 4 }} maxWidth="xl" component="main">
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Pokemons
            pokemons={pokedex.pokemons}
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
