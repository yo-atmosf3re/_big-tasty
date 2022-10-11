import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './scss/app.scss'
import Header from './components/Header/Header'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';
import Cart from './pages/Cart/Cart.jsx';
import MainLayout from './pages/MainLayout';

const App = React.memo(() => {


  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='' element={<NotFound />} />
        <Route path='product/:id' element={<FullPizza />} />
        <Route path='cart' element={<Cart />} />
      </Route>
    </Routes>

  );
})

export default App;
