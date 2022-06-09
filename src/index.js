import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Input from './pages/Input'
import Results from './pages/Results'
import FormDataCtxt from './utils/formData';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

reportWebVitals();