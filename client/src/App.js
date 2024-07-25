import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Post from './pages/Post/Post';
import Home from './pages/Home/Home';

function App() {
  return(
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/post" element={<Post/>} />
    </Routes>
  </Router>
  );
}

export default App;
