import { ItemProductType, Status } from './../../@types/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { FetchProductsArgumentsType, ProductSliceState, RootState } from '../../@types/types';

// ** ThunkAPI - дополнительная утилита к createAsyncThunk, передается в параметры createAsyncThunk. Является объектом, в котором есть функции: dispatch - это нужно, чтобы задиспачить, что-то из другого редьюсера(слайса), например, getState - нужно для того, чтобы вытащить какие-то данные из стэйта до его изменения, extra - для того, чтобы работать с middleware, requestId - нужно для того, чтобы в каком-то случае прервать загрузку запроса или сделать так, чтобы запрос выполнился не доконца (например загрузку файла), и это всё используется вместе с signal, signal - нужен для для того, чтобы сделать, что-то с запросом, например оборвать его (используется вместе AbortController.signal), rejectWithValue(value, meta) и fulfillWithValue(value, meta) - нужно для того, чтобы расширить логику и запросы, если запрос выполнен успешно или нет.

// ** Здесь мы создаем асинхронный экшен, внутри которого делаем запрос, и когда он выполнится возвращаем ответ (data). Этот асинхронный экшен можно использовать внутри обычных слайсов или редьюсеров.
// ?? Про типизацию: В дженериках, после createAsyncThunk, указываем первым параметром то, что вернёт асинхронный экшен (return data, типизация для data), а во второй аргумент указываем конкретную типизацию тех аргументов, с которыми будем работаь в самом асинхроном экшене (типизация для params). Далее, если нужно типизировать извелекаемое data, которое возвращает нам axios, то в дженериках к get-запросу указываем типизацию для { data }, чтобы axios понимал, что нужно получить.
export const fetchProducts = createAsyncThunk<ItemProductType[], FetchProductsArgumentsType>('product/fetchProductsStatus', async (params) => {
   const { order, sortBy, categorySelection, search, pageCount } = params;
   const { data } = await axios.get<ItemProductType[]>(`https://633fd93ae44b83bc73c298e6.mockapi.io/items?page=${pageCount}&limit=4&${categorySelection}&sortBy=${sortBy}&order=${order}${search}`);
   return data;
})

const initialState: ProductSliceState = {
   items: [],
   status: Status.LOADING,
}

// debugger
const productSlice = createSlice({
   name: 'product',
   initialState,
   reducers: {
      // ?? Про типизацию: для того, чтобы типизировать action, нужно экспортировать PayloadAction из RTK, в дженериках к PayloadAction указать тип, который приходит из левой части, в примере ниже это state.items, типизация для этого случая ItemType[], именно её в дженериках и указываем. Теперь action типизирован, и когда мы будем, что-то диспатчить в этот слайс, то в таком случае мы сможем передать только то, что типизировали в сам PayloadAction.
      setItem(state, action: PayloadAction<ItemProductType[]>) {
         state.items = action.payload;
      },
      // ** fetchPizzas передаем в экстраРедьюсер, в экстраРедьюсер передается какая-то логика, которая относится не к обычным методам, которые делают какие-то обычные действия, а асинхронные экшены, специфические ключи. То есть, в экстра редьюсере, если запрос fetchPizzas произошёл успешно (fulfilled), то выполняется что-то (тело функции внутри [fetchPizzas.fulfilled]), так же может быть не только fulfilled, но и pending(отправка запроса), а так же rejected(если ошибка)
   },
   extraReducers: (builder) => {
      builder.addCase(fetchProducts.pending, (state) => {
         state.status = Status.LOADING;
         state.items = [];
      })
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
         state.items = action.payload;
         state.status = Status.SUCCESS
      })
      builder.addCase(fetchProducts.rejected, (state) => {
         state.status = Status.ERROR;
         state.items = [];
      })
   }
})

// ?? Про типизацию: здесь мы просто типизируем ту часть стэйта, которую должны получить, потому что это селектор, поэтому в аргументе указываем типизацию всего стейта, а вот уже функция вернёт нужную нам часть стейта. RootState берётся из store.ts. 
export const selectItemsData = (state: RootState) => state.product;

export const { setItem } = productSlice.actions;

export default productSlice.reducer;