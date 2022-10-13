import { getCarFromLS } from './../../utils/getCartFromLS';
import { calcTotalPrice } from './../../utils/calcTotalPrice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItemType, CartSliceState, RootState } from '../../@types/types';

type CartPathType = {
   id: string
   size: number
   type: string
}

const { totalPrice, items } = getCarFromLS();

const initialState: CartSliceState = {
   totalPrice, items,
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

export const { addItem, removeItem, cleareItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;