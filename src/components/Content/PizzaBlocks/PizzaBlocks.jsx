import React from 'react'
import PizzaBlock from './PizzaBlock/PizzaBlock';

const PizzaBlocks = () => {
   return (<div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
         <PizzaBlock title={'Мексиканская'} price='500' />
         <PizzaBlock />
         <PizzaBlock />
         <PizzaBlock />
         <PizzaBlock />
         <PizzaBlock />
         <PizzaBlock />
         <PizzaBlock />
         <PizzaBlock />
      </div>
   </div>);
}

export default PizzaBlocks;