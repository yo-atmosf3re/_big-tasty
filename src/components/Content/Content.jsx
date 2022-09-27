import React from 'react'
import Categories from "./Categories/Categories";
import PizzaBlocks from './PizzaBlocks/PizzaBlocks';
import Sort from './Sort/Sort';

const Content = () => {
   return (<div className="content">
      <div className="container">
         <div className="content__top">
            <Categories />
            <Sort />
         </div>
         <PizzaBlocks />
      </div>
   </div>);
}

export default Content;