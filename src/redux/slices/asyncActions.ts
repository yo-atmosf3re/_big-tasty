import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ItemProductType, FetchProductsArgumentsType } from "../../@types/types";

// ?? Async actions from productSlice and other components

// ** Здесь мы создаем асинхронный экшен, внутри которого делаем запрос, и когда он выполнится возвращаем ответ (data). Этот асинхронный экшен можно использовать внутри обычных слайсов или редьюсеров.

// ?? Про типизацию: В дженериках, после createAsyncThunk, указываем первым параметром то, что вернёт асинхронный экшен (return data, типизация для data), а во второй аргумент указываем конкретную типизацию тех аргументов, с которыми будем работаь в самом асинхроном экшене (типизация для params). Далее, если нужно типизировать извелекаемое data, которое возвращает нам axios, то в дженериках к get-запросу указываем типизацию для { data }, чтобы axios понимал, что нужно получить.
export const fetchProducts = createAsyncThunk<ItemProductType[], FetchProductsArgumentsType>('product/fetchProductsStatus', async (params) => {
   const { order, sortBy, categorySelection, search, pageCount } = params;
   const { data } = await axios.get<ItemProductType[]>(`https://633fd93ae44b83bc73c298e6.mockapi.io/items?page=${pageCount}&limit=4&${categorySelection}&sortBy=${sortBy}&order=${order}${search}`);
   return data;
})