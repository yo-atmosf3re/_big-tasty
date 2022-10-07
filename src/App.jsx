import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './scss/app.scss'
import Header from './components/Header/Header'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';


const App = React.memo(() => {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
        <Route path='cart' element={<Cart />} />
      </Routes>
    </div>
  );
})

export default App;
