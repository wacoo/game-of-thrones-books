import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Character from './components/Character';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/characters" element={<Character />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
