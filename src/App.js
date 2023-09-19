import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Detailspage from './pages/detailspage';

function App() {
  return (
    <Router>
      <div className="container">
        <div className="App">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Detailspage" element={<Detailspage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
