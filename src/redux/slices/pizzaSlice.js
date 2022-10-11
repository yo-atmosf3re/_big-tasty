import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// ** ThunkAPI - дополнительная утилита к createAsyncThunk, передается в параметры createAsyncThunk. Является объектом, в котором есть функции: dispatch - это нужно, чтобы задиспачить, что-то из другого редьюсера(слайса), например, getState - нужно для того, чтобы вытащить какие-то данные из стэйта до его изменения, extra - для того, чтобы работать с middleware, requestId - нужно для того, чтобы в каком-то случае прервать загрузку запроса или сделать так, чтобы запрос выполнился не доконца (например загрузку файла), и это всё используется вместе с signal, signal - нужен для для того, чтобы сделать, что-то с запросом, например оборвать его (используется вместе AbortController.signal), rejectWithValue(value, meta) и fulfillWithValue(value, meta) - нужно для того, чтобы расширить логику и запросы, если запрос выполнен успешно или нет.

// ** Здесь мы создаем асинхронный экшен, внутри которого делаем запрос, и когда он выполнится возвращаем ответ (data). Этот асинхронный экшен можно использовать внутри обычных слайсов или редьюсеров.
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
   const { order, sortBy, categorySelection, search, pageCount } = params;
   const { data } = await axios.get(`https://633fd93ae44b83bc73c298e6.mockapi.io/items?page=${pageCount}&limit=4&${categorySelection}&sortBy=${sortBy}&order=${order}${search}`);
   return data;
})

const initialState = {
   items: [],
   status: 'loading', // loading | success | error
}

// debugger
const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItem(state, action) {
         state.items = action.payload;
         console.log(action.payload)
      },
      // ** fetchPizzas передаем в экстраРедьюсер, в экстраРедьюсер передается какая-то логика, которая относится не к обычным методам, которые делают какие-то обычные действия, а асинхронные экшены, специфические ключи. То есть, в экстра редьюсере, если запрос fetchPizzas произошёл успешно (fulfilled), то выполняется что-то (тело функции внутри [fetchPizzas.fulfilled]), так же может быть не только fulfilled, но и pending(отправка запроса), а так же rejected(если ошибка)
   },
   extraReducers: {
      [fetchPizzas.pending]: (state) => {
         state.status = 'loading';
         state.items = [];
      },
      [fetchPizzas.fulfilled]: (state, action) => {
         state.items = action.payload;
         state.status = 'success'
      },
      [fetchPizzas.rejected]: (state) => {
         state.status = 'error'
         state.items = [];
      }
   }
})

export const selectItemsData = (state) => state.pizza;

export const { setItem } = pizzaSlice.actions;

export default pizzaSlice.reducer;