import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
import qs from 'qs'
import Categories from '../components/Content/Categories/Categories';
import Sort from '../components/Content/Sort/Sort';
import PizzaBlock from '../components/Content/PizzaBlock/PizzaBlock';
import Skeleton from '../components/Content/PizzaBlock/Skeleton';
import Pagination from '../components/Content/Pagination/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setPage, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { sortTitle } from '../components/Content/Sort/Sort'
import axios from 'axios';

const Home = React.memo(() => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   // const isSearch = useRef(false);
   // const isMounted = useRef(false);

   const { categoryId, sort, pageCount } = useSelector((state) => state.filter)

   const { searchValue } = useContext(SearchContext);
   const [items, setItems] = useState([]);
   const [isLoading, setIsLoading] = useState(true)


   const changeCategoryHandler = useCallback((i) => {
      dispatch(setCategoryId(i))
   }, [setCategoryId])
   const setCurrentPage = useCallback((v) => {
      dispatch(setPage(v))
   }, [setPage])
   const fetchPizzas = () => {
      setIsLoading(true)
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const sortBy = sort.sortProperty.replace('-', '');
      const categorySelection = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      axios.get(`https://633fd93ae44b83bc73c298e6.mockapi.io/items?page=${pageCount}&limit=4&${categorySelection}&sortBy=${sortBy}&order=${order}${search}`)
         .then(res => {
            setItems(res.data)
            setIsLoading(false)
         })
   }

   // ** Если изменили параметры и был первый рендер - требует доработки
   // useEffect(() => {
   //    if (isMounted.current) {
   //       const queryString = qs.stringify({
   //          sortProperty: sort.sortProperty,
   //          categoryId,
   //          pageCount,
   //       })
   //       navigate(`?${queryString}`)
   //    }
   //    isMounted.current = true;
   // }, [categoryId, sort.sortProperty, pageCount])

   // ** Если был первый рендер, то проверяем URL-параметры и сохраняем в redux - требует доработки
   // useEffect(() => {
   //    debugger
   //    if (window.location.search) {
   //       const params = qs.parse(window.location.search.substring(1));
   //       const sort = sortTitle.find((o) => o.sortProperty === params.sortProperty)
   //       dispatch(setFilters({
   //          ...params,
   //          sort,
   //       })
   //       );
   //       isSearch.current = true;
   //    }
   // }, [])

   // ** Если был первый рендер, то запрашиваем пиццы - требует доработки
   useEffect(() => {
      // window.scrollTo(0, 0)
      // if (!isSearch.current) {
      //    fetchPizzas();
      // }
      // isSearch.current = false;
      fetchPizzas();
   }, [categoryId, sort.sortProperty, searchValue, pageCount])



   const pizzas = items.map((obj) => (<PizzaBlock key={obj.id} {...obj} />));
   const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

   return (<div className='content'>
      <div className='container'>
         <div className="content__top">
            <Categories value={categoryId} onClickCategory={changeCategoryHandler} />
            <Sort />
         </div>
         <div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
               {isLoading ? skeletons : pizzas}
            </div>
            <Pagination pageCount={pageCount} onChangePagination={setCurrentPage} />
         </div>
      </div>
   </div>);
})

export default Home;