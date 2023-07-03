import './Styles/main.css';

import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Navbar from './components/Navbar';
import Auth from './components/Auth/Auth';

function App() {

  return (
    <>

      <Navbar />

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>

    </>
  );
}

export default App;
