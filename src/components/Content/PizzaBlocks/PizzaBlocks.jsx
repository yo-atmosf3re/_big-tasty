import React from 'react'
import PizzaBlock from './PizzaBlock/PizzaBlock';
import pizzas from '../../../assets/pizzas.json'
console.log(pizzas)

const PizzaBlocks = () => {
   return (<div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
         {pizzas.map(p => (<PizzaBlock {...p} />))}
      </div>
   </div>);
}

export default PizzaBlocks;