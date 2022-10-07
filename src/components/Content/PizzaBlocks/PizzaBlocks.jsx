import React, { useEffect, useState } from 'react'
import PizzaBlock from './PizzaBlock/PizzaBlock';
import Skeleton from './PizzaBlock/Skeleton';

const PizzaBlocks = ({ items, isLoading, }) => {
   return (<div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
         {
            isLoading
               ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
               : items.map((p, i) => (<PizzaBlock {...p} key={i} />))
         }
      </div>
   </div>);
}

export default PizzaBlocks;