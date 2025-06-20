import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LaunchDetails from './pages/LaunchDetails';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launch/:id" element={<LaunchDetails />} />
      </Routes>
    </>
  );
}

export default App;
