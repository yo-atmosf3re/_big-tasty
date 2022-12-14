import React, { useCallback, useEffect, useRef } from 'react';
import qs from 'qs'
import { useSelector } from 'react-redux';
import { setCategoryId, setPage } from '../redux/slices/filterSlice';
import { ProductBlockPropsType, useAppDispatch } from '../@types/types';
import { useNavigate } from 'react-router-dom';
import { selectFilter, selectItemsData } from '../redux/slices/selectorsSlices';
import { fetchProducts } from '../redux/slices/asyncActions';
import { ProductBlock, Skeleton, Categories, Sort, Pagination } from '../components';

const Home: React.FC = React.memo(() => {
   const dispatch = useAppDispatch();

   const isMounted = useRef(false);
   const navigate = useNavigate();

   const { categoryId, sort, pageCount, searchValue } = useSelector(selectFilter)
   const { items, status } = useSelector(selectItemsData)

   const changeCategoryHandler = useCallback((id: number) => {
      dispatch(setCategoryId(id))
   }, [])
   const setCurrentPage = useCallback((value: number) => {
      dispatch(setPage(value))
   }, [setPage])

   const getPizzas = async () => {
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const sortBy = sort.sortProperty.replace('-', '');
      const categorySelection = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';
      dispatch(fetchProducts({ order, sortBy, categorySelection, search, pageCount }))
   }

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
   //    if (!window.location.search) dispatch(fetchProducts({} as FetchProductsArgumentsType))
   // }, [categoryId, sort.sortProperty, searchValue, pageCount])
   useEffect(() => {
      getPizzas();
   }, [categoryId, sort.sortProperty, searchValue, pageCount])
   // useEffect(() => {
   //    if (window.location.search) {
   //       const params = qs.parse(window.location.search.substring(1)) as unknown as FetchProductsArgumentsType;
   //       const sort = sortTitle.find((obj) => obj.sortProperty === params.sortBy);
   //       dispatch(setFilters({
   //          searchValue: params.search,
   //          categoryId: Number(params.categorySelection),
   //          pageCount: params.pageCount,
   //          sort: sort || sortTitle[0],
   //       }))
   //    }
   //    isMounted.current = true;
   // }, [])

   const pizzas = items.map((obj: ProductBlockPropsType) => (<ProductBlock key={obj.id}  {...obj} />));
   const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);

   return (<div className='content'>
      <div className='container'>
         <div className="content__top">
            <Categories value={categoryId} onClickCategory={changeCategoryHandler} />
            <Sort sort={sort} />
         </div>
         <div>
            <h2 className="content__title">?????? ??????????</h2>
            {
               status === 'error'
                  ? <div className='content__error-indo'>
                     <h2>?????????????????? ???????????? <span>????</span></h2>
                     <p>?? ??????????????????, ???? ?????????????? ???????????????? ??????????. <br /> ???????????????????? ?????????????????? ?????????????? ??????????!</p>
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