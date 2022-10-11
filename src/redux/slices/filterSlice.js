import { createSlice } from '@reduxjs/toolkit'

// todo Начальный стейт, как по классике редакса;
const initialState = {
   searchValue: '',
   categoryId: 0,
   pageCount: 1,
   sort: {
      name: 'популярности', sortProperty: 'rating'
   }
}

// ** Тут создаёшь слайсы, по аналогии с редьюсерами из обычного редакса, только здесь ты пишешь методы в поле reducers, которые похожи на обычные функции, которые изменяют стейт, выглядит это всё гораздо проще, чем обычный редакс. Меньше кода, ничего лишнего писать не нужно, главное описать правильно логику в методах и правильно проимпортировать это всё хозяйство.
export const filterSlice = createSlice({
   // ** Имя слайса, оно нужно для тоbго, чтобы редакс смог корректно обработать и сохранить команду;
   name: 'filters',
   // ** Начальный стейт, который объявлен выше;
   initialState,
   // ** Reducers внутри которого будем описывать методы по изменению стэйта;
   reducers: {
      // ** То, что ниже - это сам метод, он принимает сам изначальный стэйт и какой-то экшен. В экшене будет хранится дополнительная информация, то есть, когда метод будет задиспатчен, например - (dispatch(setCategoryId(5))), то в функцию передастся что-то, что попадёт в экшен, но чтобы использовать то, что приходит в метод, нужно использовать это вот так (action.payload) в самом слайсе, потому что значение будет хранится только в payload.
      setCategoryId(state, action) { state.categoryId = action.payload },
      setSearchValue(state, action) { state.searchValue = action.payload },
      setSort(state, action) { state.sort = action.payload },
      setPage(state, action) { state.pageCount = action.payload },
      setFilters(state, action) {
         state.sort = action.payload.sort;
         state.pageCount = Number(action.payload.currentPage);
         state.categoryId = Number(action.payload.categoryId);
      }
   },
})

export const selectSort = state => state.filter.sort;
export const selectFilter = state => state.filter;

// ** Это для того, чтобы из слайса достать методы и экспортировать их. Все методы хранятся в actions. То есть, тут мы достаем методы из слайса, присваеваем их константе и экспортируем
export const { setCategoryId, setSort, setPage, setFilters, setSearchValue } = filterSlice.actions;

// ** Испорт редьюсера по-умолчанию
export default filterSlice.reducer;