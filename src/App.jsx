import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './scss/app.scss'
import Header from './components/Header/Header'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';


const App = React.memo(() => {
  const [searchValue, setSearchValue] = useState('');


  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <Routes>
        <Route path='/' element={<Home searchValue={searchValue} />} />
        <Route path='*' element={<NotFound />} />
        <Route path='cart' element={<Cart />} />
      </Routes>
    </div>
  );
})

export default App;
