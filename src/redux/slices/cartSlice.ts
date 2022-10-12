import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, CartSliceState, RootState } from '../../@types/types';

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
      addItem(state, action: PayloadAction<CartPathType>) {
         const findItem = state.items.find((obj) => {
            return (
               (obj.id === action.payload.id) &&
               (obj.size === action.payload.size) &&
               (obj.type === action.payload.type))
         });
         findItem ? findItem.count && findItem.count++ : state.items.push({
            ...action.payload, count: 1
         });
         state.totalPrice = state.items.reduce((sum, obj) => {
            if (obj.count) {
               return obj.price * obj.count + sum
            }
         }, 0)
         // const findItem = state.items.find((obj) => obj.id === action.payload.id)
         // if (findItem?.count) {
         //    findItem.count++;
         // } else {
         //    state.items.push({
         //       ...action.payload,
         //       count: 1,
         //    })
         // }
      },
      minusItem(state, action: PayloadAction<string>) {
         const findItem = state.items.find(obj => obj.id === action.payload);
         if (findItem?.count) findItem.count--;
      },
      removeItem(state, action: PayloadAction<string>) {
         // state.items = state.items.filter((obj) => obj.id !== action.payload)
         const findItem = state.items.find(obj => {
            return ((obj.id === action.payload.id) &&
               (obj.size === action.payload.size) &&
               (obj.type === action.payload.type))
         });
         state.totalPrice -= findItem.price * findItem.count;
         state.items = state.items.filter(obj => {
            return ((obj.id !== action.payload.id) ||
               (obj.size !== action.payload.size) ||
               (obj.type !== action.payload.type))
         });
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