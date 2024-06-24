import Game from './components/game';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </Router>
  );
};

export default App;
