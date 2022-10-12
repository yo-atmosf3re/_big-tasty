import React, { useCallback, useContext, useEffect } from 'react';
import qs from 'qs'
import Sort from '../components/Content/Sort/Sort';
import ProductBlock from '../components/Content/ProductBlock/ProductBlock';
import Skeleton from '../components/Content/ProductBlock/Skeleton';
import Pagination from '../components/Content/Pagination/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setPage, selectFilter } from '../redux/slices/filterSlice';
import { fetchProducts, selectItemsData } from '../redux/slices/productSlice';
import { ProductBlockPropsType } from '../@types/types';
import Categories from '../components/Content/Categories/Categories';

const Home: React.FC = React.memo(() => {
   const dispatch = useDispatch();

   // const isSearch = useRef(false); // ?? это для useEffect, которые отвечают за превязку URL
   // const isMounted = useRef(false); // ** это для useEffect, которые отвечают за превязку URL

   const { categoryId, sort, pageCount, searchValue } = useSelector(selectFilter)
   const { items, status } = useSelector(selectItemsData)



   const changeCategoryHandler = useCallback((id: number) => {
      dispatch(setCategoryId(id))
   }, [setCategoryId])
   const setCurrentPage = useCallback((value: number) => {
      dispatch(setPage(value))
   }, [setPage])

   const getPizzas = async () => {
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const sortBy = sort.sortProperty.replace('-', '');
      const categorySelection = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';
      // @ts-ignore
      dispatch(fetchProducts({ order, sortBy, categorySelection, search, pageCount }))
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
   // ** Либо верхний useEffect, либо нижний
   // useEffect(() => {
   //    if (isMounted.current) {
   //       const params = {
   //          categoryId: categoryId > 0 ? categoryId : null,
   //          sortProperty: sort.sortProperty,
   //          pageCount,
   //       }
   //       const queryString = qs.stringify(params, { skipNulls: true })
   //       navigate(`/?${queryString}`)
   //    }
   //    if (!window.location.search) {
   //       fetchPizzas();
   //    }
   // })

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
      getPizzas();
   }, [categoryId, sort.sortProperty, searchValue, pageCount])



   const pizzas = items.map((obj: ProductBlockPropsType) => (<ProductBlock key={obj.id}  {...obj} />));
   const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

   return (<div className='content'>
      <div className='container'>
         <div className="content__top">
            <Categories value={categoryId} onClickCategory={changeCategoryHandler} />
            <Sort />
         </div>
         <div>
            <h2 className="content__title">Все пиццы</h2>
            {
               status === 'error'
                  ? <div className='content__error-indo'>
                     <h2>Произошла ошибка <span>😕</span></h2>
                     <p>К сожалению, не удалось получить пиццы. <br /> Попробуйте повторить попытку позже!</p>
                  </div>
                  : <div className="content__items">
                     {status === 'loading' ? skeletons : pizzas}
                  </div>
            }

            <Pagination pageCount={pageCount} onChangePagination={setCurrentPage} />
         </div>
      </div>
   </div>);
})

export default Home;