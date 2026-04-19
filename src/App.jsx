import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CameraStudio from './pages/CameraStudio';
import PinterestGallery from './pages/PinterestGallery';
import './styles/Global.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/camera" element={<CameraStudio />} />
        <Route path="/gallery" element={<PinterestGallery />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
