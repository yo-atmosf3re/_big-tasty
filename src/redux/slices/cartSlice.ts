import { calcTotalPrice } from './../../utils/calcTotalPrice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItemType, CartSliceState, RootState } from '../../@types/types';

type CartPathType = {
   id: string
   size: number
   type: string
}


const initialState: CartSliceState = {
   totalPrice: 0,
   items: []
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem(state, action: PayloadAction<CartItemType>) {
         const findItem = state.items.find((obj) => obj.id === action.payload.id)
         if (findItem?.count) {
            findItem.count++;
         } else {
            state.items.push({
               ...action.payload,
               count: 1,
            })
         }
         state.totalPrice = calcTotalPrice(state.items)
      },
      minusItem(state, action: PayloadAction<string>) {
         const findItem = state.items.find(obj => obj.id === action.payload);
         if (findItem) findItem.count--;
         state.totalPrice = calcTotalPrice(state.items)
      },
      removeItem(state, action: PayloadAction<string>) {
         state.items = state.items.filter((obj) => obj.id !== action.payload)
         state.totalPrice = calcTotalPrice(state.items)
      },
      cleareItems(state) {
         state.items = [];
         state.totalPrice = 0;
      },
   }
})

// ** Редакс-селектор - обычная функция, которая, так же как и анонимная функция в useSelector'e, вытаскивает данные из стейта и передает их в useSelector, и далее экспортируется в нужный селектор;
export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id)

export const { addItem, removeItem, cleareItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;