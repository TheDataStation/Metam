import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Input from './pages/Input'
import Results from './pages/Results'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Input />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
