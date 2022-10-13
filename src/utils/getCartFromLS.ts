import { CartItemType } from '../@types/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getCarFromLS = () => {
   const data = localStorage.getItem('cart');
   const items = data ? JSON.parse(data) : []
   const totalPrice = calcTotalPrice(items)
   return {
      items: items as CartItemType[],
      totalPrice,
   }
}