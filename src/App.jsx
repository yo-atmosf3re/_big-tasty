import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './scss/app.scss'
import Header from './components/Header/Header'
import Content from './components/Content/Content';

const App = React.memo(() => {
  return (
    <div>
      <div className="wrapper">
        <Header />
        <Content />
      </div>
    </div>
  );
})

export default App;
