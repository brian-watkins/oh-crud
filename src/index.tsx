import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { configureDisplay } from './display/factory';
import reportWebVitals from './reportWebVitals';
import { CatalogReader } from './CatalogReader';

const catalogReader: CatalogReader = {
  fetchProducts: () => []
}

ReactDOM.render(
  <React.StrictMode>
    { configureDisplay(catalogReader) }
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
