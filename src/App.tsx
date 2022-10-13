import React, { Suspense } from 'react';
import Loadable from 'react-loadable';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './scss/app.scss'
import Home from './pages/Home';
import MainLayout from './pages/MainLayout';

// ** Это для рендеринга со стороны браузера - ленивая подгрузка
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'));
const FullProduct = React.lazy(() => import(/* webpackChunkName: "FullProduct" */'./pages/FullProduct'));
// ** Это для SSR
const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */'./pages/Cart/Cart'),
  loading: () => <div>Идёт загрузка...</div>
})

const App = React.memo(() => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='*' element={
          <Suspense fallback={<div>Идёт загрузка...</div>}>
            <NotFound />
          </Suspense>} />
        <Route path='product/:id' element={
          <Suspense fallback={<div>Идёт загрузка...</div>}>
            <FullProduct />
          </Suspense>} />
        <Route path='cart' element={
          <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
            <Cart />
          </Suspense>} />

      </Route>
    </Routes>

  );
})

export default App;
