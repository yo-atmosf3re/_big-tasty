import React, { useEffect, useState } from 'react'
import PizzaBlock from './PizzaBlock/PizzaBlock';
import Skeleton from './PizzaBlock/Skeleton';

const PizzaBlocks = () => {
   const [items, setItems] = useState([]);
   useEffect(() => {
      fetch('https://633fd93ae44b83bc73c298e6.mockapi.io/items')
         .then(res => res.json())
         .then(json => {
            setItems(json)
            setIsLoading(false)
         })
      window.scrollTo(0, 0)
   }, [])
   const [isLoading, setIsLoading] = useState(true)
   return (<div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
         {
            isLoading
               ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
               : items.map(p => (<PizzaBlock {...p} key={p.imageUrl} />))
         }
      </div>
   </div>);
}

export default PizzaBlocks;