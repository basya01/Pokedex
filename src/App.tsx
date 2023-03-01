import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/material';
import { Alerts, Header } from './components';
import './index.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Container sx={{ my: 6 }} component="main"></Container>
      <Alerts />
    </div>
  );
}

export default App;
