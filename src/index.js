import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import ProductoRegistro from './components/ProductosRegistro'
import AboutPrincipal from './components/AboutPrincipal';
import { Navbar } from '../src/components/Navbar';


ReactDOM.render(
  <React.StrictMode>
    <ProductoRegistro />
  </React.StrictMode>,
  document.getElementById('root')
);
