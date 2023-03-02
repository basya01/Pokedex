import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { Alerts, Header, Pokemons } from './components';
import { useAppDispatch, useAppSelector } from './hooks';
import './index.css';
import { fetchPokemons, Status } from './store/slices/pokemons';

function App() {
  const pokedex = useAppSelector((state) => state.pokemons);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPokemons());
  }, []);

  return (
    <div className="App">
      <Header />
      <Container sx={{ my: 4 }} maxWidth="xl" component="main">
        <Pokemons pokemons={pokedex.pokemons} />
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          size="large"
          disabled={pokedex.status === Status.LOADING}
          onClick={() => dispatch(fetchPokemons(pokedex.next))}
        >
          Load more
        </Button>
      </Container>
      <Alerts />
    </div>
  );
}

export default App;
