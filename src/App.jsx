import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './scss/app.scss'
import Header from './components/Header/Header'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

export const SearchContext = React.createContext('');

const App = React.memo(() => {
  console.log("App rerender")
  const [searchValue, setSearchValue] = useState('');


  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
          <Route path='cart' element={<Cart />} />
        </Routes>
      </SearchContext.Provider>
    </div>
  );
})

export default App;
