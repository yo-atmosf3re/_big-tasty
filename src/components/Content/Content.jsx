import React, { useState, useEffect } from 'react'
import Categories from "./Categories/Categories";
import PizzaBlocks from './PizzaBlocks/PizzaBlocks';
import Sort from './Sort/Sort';

const Content = () => {
   const [categoryId, setCategoryId] = useState(0);
   const [sortType, setSortType] = useState({
      name: 'популярности', sortProperty: 'rating'
   });
   const changeCategoryHandler = (i) => setCategoryId(i)
   const changeSortTypeHandler = (i) => setSortType(i)
   const [items, setItems] = useState([]);
   useEffect(() => {
      // debugger
      setIsLoading(true)
      fetch(
         `https://633fd93ae44b83bc73c298e6.mockapi.io/items?category=${categoryId}`)
         .then(res => res.json())
         .then(json => {
            setItems(json)
            setIsLoading(false)
         })
      window.scrollTo(0, 0)
   }, [categoryId, sortType])
   const [isLoading, setIsLoading] = useState(true)

   return (<>
      <div className="content__top">
         <Categories value={categoryId} onClickCategory={changeCategoryHandler} />
         <Sort value={sortType} onClickSortType={changeSortTypeHandler} />
      </div>
      <PizzaBlocks isLoading={isLoading} items={items} setIsLoading={setIsLoading} setItems={setItems} />
   </>);
}

export default Content;