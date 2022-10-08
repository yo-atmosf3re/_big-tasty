import React, { useEffect, useState } from 'react';
import Categories from '../components/Content/Categories/Categories';
import Sort from '../components/Content/Sort/Sort';
import PizzaBlock from '../components/Content/PizzaBlock/PizzaBlock';
import Skeleton from '../components/Content/PizzaBlock/Skeleton';
import Pagination from '../components/Content/Pagination/Pagination';

const Home = ({ searchValue }) => {
   const [items, setItems] = useState([]);
   const [isLoading, setIsLoading] = useState(true)
   const [categoryId, setCategoryId] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
   const [sortType, setSortType] = useState({
      name: 'популярности', sortProperty: 'rating'
   });

   const changeCategoryHandler = (i) => setCategoryId(i)
   const changeSortTypeHandler = (i) => setSortType(i)

   useEffect(() => {
      setIsLoading(true)
      const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
      const sortBy = sortType.sortProperty.replace('-', '');
      const categorySelection = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      fetch(
         `https://633fd93ae44b83bc73c298e6.mockapi.io/items?page=${currentPage}&limit=4&${categorySelection}&sortBy=${sortBy}&order=${order}${search}`)
         .then(res => res.json())
         .then(json => {
            setItems(json)
            setIsLoading(false)
         })
      window.scrollTo(0, 0)
   }, [categoryId, sortType, searchValue, currentPage])

   const pizzas = items.map((obj) => (<PizzaBlock key={obj.id} {...obj} />));
   const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

   return (<div className='content'>
      <div className='container'>
         <div className="content__top">
            <Categories value={categoryId} onClickCategory={changeCategoryHandler} />
            <Sort value={sortType} onClickSortType={changeSortTypeHandler} />
         </div>
         <div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
               {isLoading ? skeletons : pizzas}
            </div>
            <Pagination onChangePagination={(number) => setCurrentPage(number)} />
         </div>
      </div>
   </div>);
}

export default Home;