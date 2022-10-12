import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './scss/app.scss'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FullProduct from './pages/FullProduct';
import Cart from './pages/Cart/Cart';
import MainLayout from './pages/MainLayout';

const App = React.memo(() => {


  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='' element={<NotFound />} />
        <Route path='product/:id' element={<FullProduct />} />
        <Route path='cart' element={<Cart />} />
      </Route>
    </Routes>

  );
})

export default App;
