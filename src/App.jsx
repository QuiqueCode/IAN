import React from 'react';
import { Navbar } from './components/navbar';
import { Dashboard } from './components/dashboard';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { Acciones } from './components/actions';
import { Balance } from './components/balance';
import { Factura } from './components/bill';
import { Proveedor } from './components/suppliers';


function App() {

  return (
    <>
      <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Acciones></Acciones>} />
        {<Route path="/dashboard" element={<Dashboard></Dashboard>} />}
        {<Route path="/balance" element={<Balance></Balance>} />}
        {<Route path="/factura" element={<Factura></Factura>} />}
        {<Route path="/proveedor" element={<Proveedor></Proveedor>} />}
      </Routes>
    </Router>
  



    </>
  );
}

export default App;
