import React, { useEffect, useState } from 'react'
import PizzaBlock from './PizzaBlock/PizzaBlock';
import pizzas from '../../../assets/pizzas.json'

const PizzaBlocks = () => {
   const [items, setItems] = useState([]);
   useEffect(() => {
      fetch('https://633fd93ae44b83bc73c298e6.mockapi.io/items')
         .then(res => res.json())
         .then(json => setItems(json))
   }, [items])
   return (<div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
         {items.map(p => (<PizzaBlock {...p} key={p.imageUrl} />))}
      </div>
   </div>);
}

export default PizzaBlocks;